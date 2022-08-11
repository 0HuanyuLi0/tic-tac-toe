
# TIC TAC TOE

This is a Tic-Tac-Toe game coded with **HTML, CSS, Javascript,** and **jQuery**.   

Please visit [https://0huanyuli0.github.io/tic-tac-toe/](https://0huanyuli0.github.io/tic-tac-toe/) to play this game. 🤜🤛

<figure class="half">
  <img src="/image/light%20version.png" width=40%><img src="/image/night%20version.png" width=40%>
</figure>

The game has the following features:

- Responsive layout
- Customized board size
- Changeable players name
- Remember scores and settings by using `LocalStorage`
- Day or Night modes
- Turn on/off AI opponent

---

## How To Use

This game is for two players, Player-X and Player-O. The player who succeeds in placing three* (*or dimensions size*) of their marks in a horizontal, vertical, or diagonal row is the winner. 


The default layout is 3 * 3 board with 'Day' mode. AI opponent off. Default player names are 'Player-X' and 'Player-O'. The first player is 'Player-X'.

- **Start Game**: Player can directly play the game as the page loaded. If player wants to start a new game or change the board dimensions and keep the scores, player can click `Start` button.

- **Clean Scores**: Click `Reset` button to set scores to 0. If you would like to change the board dimension and clean the scores at the same time, please click `Reset` button.

- **Change Name**: Click the name area and change to players' names. If you win the game, a congratulation message will show up with player's name.

- **Switch to Night/Day Mode**: Click the `Light` or `Night` button to switch the color mode.

- **Turn On/Off AI Opponent**: Click the `AI` button to switch modes. If `AI On`, the `AI` button will light up. If `AI Off`, the `AI` button will light off.

---

## Win Condition Generator

The win condition generator is named `tools.genAnswer()` in the code. It needs the global variable `$dimension` to calculate. `$dimension` uses jQuery to get the input from HTML `Dimension: input`

The win conditions include the following 4 conditions:

- One of the entire rows is selected
  ```
  for (let i = 0; i < $dimension; i++) {
            tempArray = [];
            for (let j = 0; j < $dimension; j++) {
                tempArray.push(all[j + i * $dimension])
            }
            answerArray.push(tempArray)
        } // generate all horizontal answers
  ```

- One of the entire column is selected
```
  for (let i = 0; i < $dimension; i++) {
            tempArray = [];
            for (let j = 0; j < $dimension; j++) {
                tempArray.push(all[i + j * $dimension])
            }
            answerArray.push(tempArray)
        } // generate all vertical answers
```

- The entire positive diagonal is selected
```
 tempArray = [];
        for (let i = 0; i < $dimension; i++) {
            tempArray.push(all[(i * $dimension) + i])
        }
        answerArray.push(tempArray)
        // generate postive diagonal
```

- The entire negative diagonal is selected
```
  tempArray = [];
        for (let i = 0; i < $dimension; i++) {
            tempArray.push(all[($dimension - 1) * (i + 1)])
        }
        answerArray.push(tempArray)
        // generate negative diagonal
```
---
 
## AI Opponent Logic
The 'AI' opponent use the following logic to decide the next move:

- Calculate and generate an `attack` array to store all potential `attack` positions

- Calculate and generate an `defencse` array to store all potential `defencse` positions


  - If the `defencse` array length is `1`. It means the player is going to win the game, `AI` will implement `defencse` step 

  - If the `attack` array length is `1`. It means the `AI` is going to win the game, `AI` will implement `attack` step 

- Find the `shortest` path to `attack` or `defencse`

- Merge `attack` and `defencse` arrays to a new array

- Find the highest frequency positions. It means these positions have the ability to `attack` and `defencse` at the same time.

- Randomly choose a position from the above array to guarantee game differentiation

*The player can monitor these calculations in the `console`*

**Update 1** *(on 12 Aug 2022)*:
- To temporary fix the below known bug, change the logic to the following:
  - AI will only place the mark on the `defencse` position at the `defencse` array length is `1`. It means the player is going to win the game.
  - Otherwise, AI will randomly choose the position from the `attack` array

---

## Known Bugs
- In 'AI' opponent mode, 3*3 size board, if player placed 1 corner, then the opposite corner, then another corner, there will be a chance to win.

  - The developer observed the `console` output, and all calculation results are correct according to the existing logic (before update 1 on 12 Aug 2022). The bug occurs at the second step. The optimal step for AI should be at the middle line, but AI placed mark on a corner. The reason is that if AI placed mark at the corner, there will be 2 chances to defencse and 1 chance to attack, which is the maxium chances over all(3 chances). However, if AI placed mark at the middle line, it has 1 defencse chance and 1 attack chance (2 chances in total). Therefore, according to the logic above (before update 1), AI placed mark at the 'correct' position.

  - There is a potential solution for this bug. Predict 2 or more steps and then choose the optimal position. This can be done by call the simulation code multiple times. However, due to time constraints, it has not been completed.

  - There is a temporary solution for this issue, please see the section of 'AI Opponent Logic', update 1 on 12 Aug 2022

  - If you find any other way to solve this problem please advise me, thanks in advance 😁 🫶

<figure class="half">
  <img src="/image/bug.png">
</figure>  

---

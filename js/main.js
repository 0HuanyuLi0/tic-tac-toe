
// https://gist.github.com/textchimp/afcb3ddc676dccd59ccb18cb9391c87a

// const score = {
//     x: parseInt(localStorage.getItem('x')),
//     o: parseInt(localStorage.getItem('o')),
//     tie: parseInt(localStorage.getItem('tie')),
// }

const score = {
    x: parseInt(localStorage.getItem('x') || 0),
    o: parseInt(localStorage.getItem('o') || 0),
    tie: parseInt(localStorage.getItem('tie') || 0),
    $dimension: parseInt(localStorage.getItem('$dimension') || 3),
    isNight: JSON.parse(localStorage.getItem('isNight') || false),
    isComputer: JSON.parse(localStorage.getItem('isComputer') || false),
    playerXName: localStorage.getItem('playerXName') || 'Player-X',
    playerOName: localStorage.getItem('playerOName') || 'Player-O',

}
for (const key in score) {
    localStorage.setItem(key,score[key])
}

let isPlayerX = true;
let isGameOver = false;
let $dimension = score.$dimension;
$('#dimension').val($dimension);
let isComputer = score.isComputer;
let isNight = score.isNight;
let isProcessing = false;
let playerXName = score.playerXName
$('#playerX').val(playerXName)
let playerOName = score.playerOName
$('#playerO').val(playerOName)


const records = {
    x: [],
    o: [],
} // record the steps
// store the players click position


const tools = {

    init:function () {
        isPlayerX = true;
        //player name
        if ($('#playerX').val() !== playerXName) {
            playerXName = $('#playerX').val()
        }
        if ($('#playerO').val() !== playerOName) {
            playerOName = $('#playerO').val()
        }

        localStorage.playerXName = playerXName
        localStorage.playerOName = playerOName

        //dimension
        if (parseInt($('#dimension').val()) !== $dimension) {
            $dimension = parseInt($('#dimension').val());
        }
            localStorage.$dimension = $dimension;

        //scores
        //show the score
        $(`#score-x`).text(localStorage.getItem('x'))
        $(`#score-tie`).text(localStorage.getItem('tie'))
        $(`#score-o`).text(localStorage.getItem('o'))
    },
    
    run: function () {
       
        tools.init()
        //1. get the dimension value and draw table
      
    
        $('#game-container').html('');
        tools.genTable();
        tools.genAnswer()
        tools.changeColor();
        //reset steps recorder
        records.x = [];
        records.o = [];

        //2. add the event handler to the generated table
        // 'this': point to the clicked <div>
        // this.id: cell-4
            
        $('.cell').on('click', function () {
            // console.log(this);
            if (isGameOver || isProcessing) {
                return;
            } // prevent extra click

            tools.putSymbol(this.id);
            
            if (!isPlayerX && isComputer && !isGameOver) {
                isProcessing = true
                setTimeout(function () {
                    tools.putSymbol(tools.opponent())
                    isProcessing = false
                }, 500)
                // tools.putSymbol(tools.opponent());
            }
            // tools.checkResult();
        })

        

    }, //run

    reset: function () {
        
        //reset the scores to 0
        $('.player-score').text('0')
        score.x = 0;
        score.tie = 0
        score.o =0
        localStorage.x = 0
        localStorage.tie = 0
        localStorage.o = 0

        tools.run();
        // for (const key in score) {
        //     score[key] = 0;
        //     localStorage.setItem(key, score[key])
        //     // set the local storage
        // }

    }, //rest

    genTable: function () {
        // generate table in HTML according to the demension input
        const $gameContainer = $('#game-container');

        for (let j = 0; j < $dimension; j++) {
            const $rowDiv = $('<div>').addClass('row').appendTo($gameContainer);
            //generate row <div>s

            for (let i = 0; i < $dimension; i++) {
                $('<div>').addClass('cell').attr('id', `cell-${i + j * $dimension}`).text(' ').appendTo($rowDiv);
            } // generate column <div>s
        }

        if (!isNight) {
            $('.cell').css({
                backgroundColor: '#E7EFC5',
                border: '1px solid black'
            })
        } else {
            $('.cell').css({
                backgroundColor: '#2b2d42',
                border: '1px solid white'
            })
        }

    }, // genTable

    genAnswer: function () {
        // generate answer array according to the demension input
        const len = $dimension * $dimension;
        const answerArray = [];
        let tempArray = [];
        const all = [];
        for (let i = 0; i < len; i++) {
            all.push(i)
        }// all : 0-8

        for (let i = 0; i < $dimension; i++) {
            tempArray = [];
            for (let j = 0; j < $dimension; j++) {
                tempArray.push(all[j + i * $dimension])
            }
            answerArray.push(tempArray)
        } // for row answers

        for (let i = 0; i < $dimension; i++) {
            tempArray = [];
            for (let j = 0; j < $dimension; j++) {
                tempArray.push(all[i + j * $dimension])
            }
            answerArray.push(tempArray)
        } // for colum answers

        tempArray = [];
        for (let i = 0; i < $dimension; i++) {
            tempArray.push(all[(i * $dimension) + i])
        }
        answerArray.push(tempArray)
        // for postive diagonal

        tempArray = [];
        for (let i = 0; i < $dimension; i++) {
            tempArray.push(all[($dimension - 1) * (i + 1)])
        }
        answerArray.push(tempArray)
        // for negative diagonal

        return answerArray;

    }, // genAnswer

    cellFontSize: function () {
        const $size = parseInt($('.cell').css('width')) * 0.8;
        return `${$size}px`
    }, // set font size to the 80% of the <div> width

    refreshFont: function () {
        $('.cell').css({
            fontSize: tools.cellFontSize(),
        })
    }, //refreshFont

    putSymbol: function (position) {
        // put the symbol ('X' or 'O') on the table
        // position: cell-4
     
        const $target = $(`#${position}`);

        if ($target.text() !== ' ') {
            return // prevent double click
        } else if (isPlayerX) {
            $target.text('X').css({
                fontSize: this.cellFontSize(),
                color: 'red'
            })
            //record the steps
            records.x.push(parseInt(position.slice(5)))

            isPlayerX = !isPlayerX
        } else {
            $target.text('O').css({
                fontSize: this.cellFontSize(),
                color: 'green'
            })
            //record the steps
            records.o.push(parseInt(position.slice(5)))
            isPlayerX = !isPlayerX
        }
        tools.checkResult();
       
        // this.checkResult();
    }, //putSymbol

    checkResult: function () {
        // check the answer
        for (let i = 0; i < this.genAnswer().length; i++) {
            const currentAnswer = this.genAnswer()[i];
            if (this.isInAnswer(currentAnswer, records.x)) {
                this.showMessage('x')
                return
            } else if (this.isInAnswer(currentAnswer, records.o)) {
                this.showMessage('o')
                return
            }
        } // if 'x' or 'o' array includes answer array win and return

        if ((records.x.length + records.o.length) === $dimension * $dimension) {
            this.showMessage('tie')
        } // if table is full -> draw

    }, //checkResult

    isInAnswer: function (answerArray, array) {
        // array.length > answerArray.length
        // check if the array includes answer
        // [1,3,4,7] includes [1,4,7]
        // only all included -> true
        for (let i = 0; i < answerArray.length; i++) {
            if (!array.includes(answerArray[i])) {
                return false
            }
        }
        return true
    }, // isInAnswer

    showMessage: function (rlt) {
        //rlt: 'x' | 'o' | 'tie'
        isGameOver = true;
        // turn off the game
        score[rlt] += 1
        localStorage[rlt] = score[rlt]
        $(`#score-${rlt}`).text(localStorage[rlt])


        // update score

        // const text = rlt === 'tie' ? 'TIE' : `Player ${rlt.toUpperCase()} Win!`;
        let text = null;
        if (rlt === 'tie') {
            text = 'TIE'
        } else if(rlt === 'x'){
            text = `${playerXName} WIN!`
        } else{
            text = `${playerOName} WIN!`
        }

        let fontColor = `${rlt === 'x' ? 'red' : rlt === 'o' ? 'green' : 'yellow'}`;
        // TIE: yellow; X win: Red; O win: Green



        $('<div>').text(text).css({
            fontSize: this.cellFontSize(),
            color: fontColor,
            position: 'absolute',
            top: '20%',
            left: '0',
            right: '0',
            margin: 'auto',
            textAlign: 'center',
        }).appendTo($('#game-container')).fadeOut(3000)
        // show message for 3s

        setTimeout(function () {
            $('.cell').text(' ');
            isGameOver = false;
            isPlayerX = true;
            records.x = [];
            records.o = [];
        }, 3000)
        // reset table after 3s

    }, // showMessage

    opponent: function () {
        const tableLength = $dimension * $dimension;
        const all = [];
        for (let i = 0; i < tableLength; i++) {
            all.push(i)
        }// all : 0-8
        // const occupied = records.x.concat(records.o);
        // const unoccupied = this.subArr(all, occupied);

        //=========================== attack ================================
        let attackStep = this.predictNextStep('o')
        attackStep = this.arrRemover(attackStep, records.x)
        attackStep = this.arrDelArr(attackStep, records.o)
        attackStep = this.shortestPath(attackStep)
        if (attackStep.flat(Infinity).length === 1) {
            return `cell-${attackStep}`
        }

        //====================== defencse ===============================
        let defenseStep = this.predictNextStep('x')
        defenseStep = this.arrRemover(defenseStep, records.o)
        defenseStep = this.arrDelArr(defenseStep, records.x)
        defenseStep = this.shortestPath(defenseStep)
        if (defenseStep.flat(Infinity).length === 1) {
            return `cell-${defenseStep}`
        }
        if (defenseStep.flat(Infinity).length > 1) {
            defenseStep = attackStep
        } // to temporary fix the known bug

        let sumArr = defenseStep.flat(Infinity).concat(attackStep.flat(Infinity))

        optItem = this.highestFreqItem(sumArr.flat(Infinity))

        console.log('OPT-A: ', optItem);
        if (optItem === null || optItem.length === 0) {
            this.showMessage('tie')
            // return `cell-${randomChoice}`
        } else if (optItem.length > 1) {
            optItem = this.randomChoice(optItem)
        }

        console.log('Attack: ', attackStep);
        console.log('Defense: ', defenseStep);
        console.log('OPT-F: ', optItem);
        return `cell-${optItem}`

    }, // opponent

    highestFreqItem: function (arr) {
        // find the item that has the highest frequecy in arr Array
        const items = {};
        let counter = 0;
        let output = [];
        for (let i = 0; i < arr.length; i++) {
            if (items[arr[i]] === undefined) {
                items[arr[i]] = 1;
            } else {
                items[arr[i]]++;
            }

            if (items[arr[i]] > counter) {
                counter = items[arr[i]]
            }
        }

        for (const key in items) {
            if (items[key] === counter) {
                output.push(key)
            }
        }
        // console.log(output);
        return output
    }, //highestFreqItem

    shortestPath: function (arr) {
        //find the shortest arr
        let initArray = Array($dimension);
        let tempArray = [];
        let outputArray = [];
        let minLength = 0;
        //create an array with length of '$dimension'
        for (let i = 0; i < arr.length; i++) {
            const currentArr = arr[i];
            if (currentArr.length !== 0) {
                tempArray = currentArr.length <= initArray.length ? currentArr : tempArray;
                initArray = tempArray;
            }
        }
        minLength = tempArray.length;
        // console.log(minLength);

        for (let i = 0; i < arr.length; i++) {
            if (arr[i].length === minLength) {
                outputArray.push(arr[i])
            }

        }

        // console.log(outputArray);
        return outputArray
    }, // shortestPath

    predictNextStep: function (player) {
        const answers = this.genAnswer();
        const playerOccupied = records[player];
        let nextStep = this.arrFilter(answers, playerOccupied)
        // return an array which contains the element that in arrY
        return nextStep;
    }, // predictNextStep

    arrRemover: function (arrX, arrY) {
        //return an array that it does not contain the element that in arrY
        let outputArr = arrX; //iterate to remove the element from new array
        let tempArr = []
        for (let i = 0; i < arrY.length; i++) {
            for (let j = 0; j < outputArr.length; j++) {
                if (!outputArr[j].includes(arrY[i]) && !tempArr.includes(outputArr[j])) {
                    tempArr.push(outputArr[j])
                }
            }
            outputArr = tempArr
            tempArr = []
        }
        // console.log(outputArr);
        return outputArr
    }, // arrRemover

    arrFilter: function (arrX, arrY) {
        // return an array which contains the element that in arrY
        if (arrY.length === 0) {
            return arrX
        }
        let temp = [];
        for (let i = 0; i < arrX.length; i++) {
            for (let j = 0; j < arrY.length; j++) {
                if (arrX[i].includes(arrY[j]) && (!temp.includes(arrX[i]))) {
                    temp.push(arrX[i])
                }
            }
        }
        // console.log(temp);
        return temp
    }, //arrFilter

    arrDelEle: function (arr, ele) {
        const output = []
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== ele) {
                output.push(arr[i])
            }
        }
        return output
    }, //arrDelEle

    arrDelArr: function (arrX, arrY) {
        // return array that arrX-arrY
        //X:[[0,1,2],[0,3,6]] | Y:[0,3] | OT: [[1,2],[6]]
        let temp = []
        for (let i = 0; i < arrX.length; i++) {
            temp.push(this.subArr(arrX[i], arrY))
        }
        // console.log(temp);
        return temp

    }, //arrDelArr

    subArr: function (all, part) {
        // return complementary array
        let sup = all;

        for (let i = 0; i < part.length; i++) {
            sup = this.arrDelEle(sup, part[i])
        }

        return sup
    }, // subArr

    randomChoice: function (arr) {
        return arr[Math.floor(Math.random() * arr.length)]
    }, //randomChoice

    startAI: function () {
        isComputer = !isComputer
        if (!isPlayerX && isComputer) {
            tools.putSymbol(tools.opponent());
        }

        tools.lightUpBtn(this, isComputer)
        localStorage.isComputer = isComputer
    }, //startAI

    lightUpBtn: function (target, condition) {
        const $btn = $(target)
        if (condition) {
            $btn.css({
                backgroundImage: 'url(https://0huanyuli0.github.io/tic-tac-toe/image/bg_nav_rollover.png)',
                backgroundRepeat: 'repeat-x',
            })
        } else {
            $btn.css({
                backgroundImage: 'none',
            })
        }
    }, //lightUpBtn

    changeColor: function () {

        if (!isNight) {
            $('#night-btn').text('Light')
            $('*').css({
                backgroundColor: '#333C83',
            })
            $('.cell').css({
                // border:'1px solid black',
                backgroundColor: '#333C83',
            })

        } else {
            $('#night-btn').text('Night')
            $('*').css({
                backgroundColor: '#2b2d42',
            })
            $('.cell').css({
                // border:'1px solid white',
                backgroundColor: '#2b2d42',
            })

        }

        tools.lightUpBtn('#AI-btn', isComputer)
    }
}

tools.run();
$('#start-btn').on('click', tools.run)
$('#reset-btn').on('click', tools.reset)
$('#AI-btn').on('click', tools.startAI)
$(window).on('resize', tools.refreshFont) // dynamic change the font size
$('#night-btn').on('click', function () {
    isNight = !isNight
    tools.changeColor();
    localStorage.isNight = isNight
})

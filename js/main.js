
// https://gist.github.com/textchimp/afcb3ddc676dccd59ccb18cb9391c87a
const score = {
    x: parseInt(localStorage.getItem('x')),
    o: parseInt(localStorage.getItem('o')),
    tie: parseInt(localStorage.getItem('tie')),
}

let isPlayerX = true;
let isGameOver = false;
let $dimension = null;
let isComputer = true;


const records = {
    x: [],
    o: [],
} // record the steps
// store the players click position

const tools = {

    init: function () {
        //1. get the dimension value and draw table
        $dimension = parseInt($('#dimension').val());
        $('#game-container').html('');
        tools.genTable();

        //2. add the event handler to the generated table
        // 'this': point to the clicked <div>
        // this.id: cell-4

        $('.cell').on('click', function () {
            // console.log(this);
            if (isGameOver) {
                return;
            } // prevent extra click
            // tools.putSymbol(tools.opponent());
            tools.putSymbol(this.id);
            if (!isPlayerX && isComputer) {
                tools.putSymbol(tools.opponent());
            }
            tools.checkResult();
        })



        //3. change the button from 'start' to 'reset'
        $('#reset-btn').text('Reset')

        //4. show the score
        for (const key in score) {
            // console.log(score[key]);
            if (isNaN(score[key])) {
                score[key] = 0;
            }
            $(`#score-${key}`).text(score[key])
        }

    }, //init

    reset: function () {
        tools.init();
        //reset the scores to 0
        $('.player-score').text('0')
        for (const key in score) {
            score[key] = 0;
            localStorage.setItem(key, score[key])
            // set the local storage
        }

        //reset steps recorder
        records.x = [];
        records.o = [];

        isPlayerX = true;
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
        // console.log(all);

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
        // for negtive diagonal

        return answerArray;

    }, // genAnswer

    cellFontSize: function () {
        const $size = parseInt($('.cell').css('width')) * 0.8;
        return `${$size}px`
    }, // set font size to the 80% of the <div> width

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

        const text = rlt === 'tie' ? 'TIE' : `Player ${rlt.toUpperCase()} Win!`;
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
        const centerPosition = Math.floor(tableLength / 2);
        const all = [];
        for (let i = 0; i < tableLength; i++) {
            all.push(i)
        }// all : 0-8
        const occupied = records.x.concat(records.o);

        const unoccupied = this.subArr(all, occupied);

        const randomChoice = this.randomChoice(unoccupied);

        if (unoccupied.includes(centerPosition)) {
            return `cell-${centerPosition}`
        } // take the center cell to maximum win chance


        //====================== defencse ===============================
        let defenseStep = this.predictNextStep('x')
        defenseStep = this.arrRemover(defenseStep, records.o)
        defenseStep = this.arrDelArr(defenseStep, records.x)
        defenseStep = this.shortestPath(defenseStep)
        if (defenseStep.flat(Infinity).length === 1) {
            return `cell-${defenseStep}`
        }
        
        //=========================== attack ================================
        // console.log(records.o);
        if (records.o.length === 0) {
            return `cell-${defenseStep}`
        }
        let attackStep = this.predictNextStep('o')
        attackStep = this.arrRemover(attackStep, records.x)
        attackStep = this.arrDelArr(attackStep, records.o)
        attackStep = this.shortestPath(attackStep)
        if (attackStep.flat(Infinity).length === 1) {
            return `cell-${attackStep}`
        }

        let sumArr = defenseStep.concat(attackStep)
        optItem = this.highestFreqItem(sumArr.flat(Infinity))
        if (optItem === null) {
            this.showMessage('tie')
            // return `cell-${randomChoice}`
        }
        
        console.log('A: ',attackStep);
        console.log('D: ', defenseStep);
        console.log('OP: ', optItem);
        return `cell-${optItem}`


    }, // opponent

    highestFreqItem: function (arr) {
        // find the item that has the highest frequecy in arr Array
        const items = {};
        let counter = 0;
        let output = null;
        for (let i = 0; i < arr.length; i++) {
            if (items[arr[i]] === undefined) {
                items[arr[i]] = 1;
            } else {
                items[arr[i]]++;
            }

            if (items[arr[i]] > counter) {
                output = arr[i]
                counter = items[arr[i]]
            }
        }

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

        // console.log('SUP: ',sup);
        return sup
    }, // subArr

    randomChoice:function (arr) {
        return arr[Math.floor(Math.random() * arr.length)]
    }, //randomChoice


}

tools.init();
$('#reset-btn').on('click', tools.reset)


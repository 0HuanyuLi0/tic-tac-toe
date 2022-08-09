
// https://gist.github.com/textchimp/afcb3ddc676dccd59ccb18cb9391c87a
const scors = {
    x: 1,
    o: 2,
    tie: 3,
}

let isPlayerX = true;
let isGameOver = false;
let dimension = null;

const tools = {

    init: function () {
        // console.log(this);
        dimension = $('#dimension').val();
        $('#game-container').html('');
        tools.genTable();

        $('.player-score').text('0')


        // console.log(dimension);
        for (const key in scors) {
            scors[key] = 0;
        }
        isPlayerX = true;
        $('#reset-btn').text('Reset')
    }, //init

    genTable: function () {
        const $gameContainer = $('#game-container');

        for (let j = 0; j < dimension; j++) {
            const $rowDiv = $('<div>').addClass('row').appendTo($gameContainer);

            for (let i = 0; i < dimension; i++) {
                $('<div>').addClass('cell').attr('id',`cell-${i+j*dimension}`).text(' ').appendTo($rowDiv);
            } // genRow
        }

        $('.cell').on('click', handler)
    }, // genTable

    genAnswer: function () {
        const len = dimension * dimension;
        const answerArray = [];
        let tempArray = [];
        const all = [];
        for (let i = 0; i < len; i++) {
            all.push(i)
        }// all : 0-8
        // console.log(all);

        for (let i = 0; i < dimension; i++) {
            tempArray = [];
            for (let j = 0; j < dimension; j++) {
                tempArray.push(all[j + i * dimension])
            }
            answerArray.push(tempArray)
        } // row answers

        for (let i = 0; i < dimension; i++) {
            tempArray = [];
            for (let j = 0; j < dimension; j++) {
                tempArray.push(all[i + j * dimension])
            }
            answerArray.push(tempArray)
        } // for colum answers

        tempArray = [];
        for (let i = 0; i < dimension; i++) {
            tempArray.push(all[(i * dimension) + i])
        }
        answerArray.push(tempArray)
        // for postive diagonal

        tempArray = [];
        for (let i = 0; i < dimension; i++) {
            tempArray.push(all[(dimension - 1) * (i + 1)])
        }
        answerArray.push(tempArray)
        // for negtive diagonal

        return answerArray;

    }, // genAnswer

    putSymbol: function (position) {
        if (isGameOver) {
            return;
        }
        const target = $(`#${position}`);
        if (target.text() !== ' ') {
            return
        } else if (isPlayerX) {
            target.text('X').css({
                fontSize: `${120/dimension*3}px`,
                color:'red'
            })
            isPlayerX = !isPlayerX
        } else {
            target.text('O').css({
                fontSize: `${120/dimension*3}px`,
                color:'green'
            })
            isPlayerX = !isPlayerX
        }
        // console.log(position);
        this.checkResult(position.slice(-1));
    }, //putSymbol

    checkResult: function () {
        const cells = $('.cell').text()

        let x = [];
        let o = [];

        for (let i = 0; i < cells.length; i++) {
            if (cells[i] === 'X') {
                x.push(i)
            } else if (cells[i] === 'O') {
                o.push(i)
            }
        }

        for (let i = 0; i < this.genAnswer().length; i++) {
            const currentAnswer = this.genAnswer()[i];
            if (this.isInAnswer(currentAnswer, x)) {
                this.getWin('x')
                return
            } else if (this.isInAnswer(currentAnswer, o)) {
                this.getWin('o')
                return
            }
        }

        if ((x.length+o.length) === dimension*dimension) {
            this.getTie()
        }

    }, //checkResult

    isInAnswer: function (answerArray, array) {
        let output = true;

        for (let i = 0; i < answerArray.length; i++) {
            if (array.indexOf(answerArray[i]) === -1) {
                output = false;
                break;
            }
        }
        return output
    }, // isInAnswer

    getWin: function (winner) {
      
        scors[winner] += 1
        $(`#player-${winner}`).text(scors[winner])
        isPlayerX = true;
        isGameOver = true;
       

        $('<div>').text(`Player ${winner.toUpperCase()} Win!`).css({
            fontSize: 'clamp(30px,20vw,120px)',
            color: `${winner==='x'?'red':'green'}`,
            position: 'absolute',
            top: '20%',
            left: '0',
            right: '0',
            margin: 'auto',
            textAlign: 'center',
        }).appendTo($('#game-container')).fadeOut(3000)


        setTimeout(function () {
            $('.cell').text(' ');
            isGameOver = false;
        }, 3000)

    }, // getWin


    getTie: function () {
        isGameOver = true;
        scors.tie += 1
        $('#tie').text(scors.tie)
        isPlayerX = true;

        $('<div>').text(`Tie!`).css({
            fontSize: 'clamp(30px,20vw,120px)',
            color: 'yellow',
            position: 'absolute',
            top: '20%',
            left: '0',
            right: '0',
            margin: 'auto',
            textAlign: 'center',
        }).appendTo($('#game-container')).fadeOut(3000)

        setTimeout(function () {
            $('.cell').text(' ');
            isGameOver = false;
        }, 3000)
    }, // getTie

}



const handler = function () {

    console.log(this.id);
    tools.putSymbol(this.id);

} // handler


$('#reset-btn').on('click', tools.init)
// $('.cell').on('click', handler)


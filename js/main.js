

const scors = {
    x: 1,
    o: 2,
    tie: 3,
}

let isPlayerX = true;
let isGameOver = false;

const tools = {

    init: function () {
        $('.cell').text(' ')
        $('.player-score').text('0')
        for (const key in scors) {
            scors[key] = 0;
        }
        isPlayerX = true;
        $('#reset-btn').text('Reset')
    }, //init

    winArray: [
        '012',
        '345',
        '678',
        '036',
        '147',
        '258',
        '048',
        '246',
    ], // winArray

    putSymbol: function (position) {
        if (isGameOver) {
            return;
        }
        const target = $(`#${position}`);
        if (target.text() !== ' ') {
            return
        } else if (isPlayerX) {
            target.text('X')
            isPlayerX = !isPlayerX
        } else {
            target.text('O')
            isPlayerX = !isPlayerX
        }
        // console.log(position);
        this.checkResult(position.slice(-1));
    }, //putSymbol

    checkResult: function (position) {
        const cells = $('.cell').text()

        let x = '';
        let o = '';

        for (let i = 0; i < cells.length; i++) {
            if (cells[i] === 'X') {
                x += i
            } else if (cells[i] === 'O') {
                o += i
            }
        }



        for (let i = 0; i < this.winArray.length; i++) {
            const currentAnswer = this.winArray[i];
            if (this.isInAnswer(currentAnswer, x)) {
                this.getWin('x')
                return
            } else if (this.isInAnswer(currentAnswer, o)) {
                this.getWin('o')
                return
            }
        }

        if (x.length === 5) {
            this.getTie()
        }

    }, //checkResult

    getWin: function (winner) {

        scors[winner] += 1
        $(`#player-${winner}`).text(scors[winner])
        isPlayerX = true;
        isGameOver = true;

        $('<div>').text(`Player ${winner} Win!`).css({
            fontSize: 'clamp(30px,20vw,120px)',
            color: 'red',
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

    isInAnswer: function (answerString, str) {
        //answerString-short
        let output = true;

        for (let i = 0; i < answerString.length; i++) {
            if (str.indexOf(answerString[i]) === -1) {
                output = false;
                break;
            }
        }
        return output
    }, // isInAnswer

    getTie: function () {
        isGameOver = true;
        scors.tie += 1
        $('#tie').text(scors.tie)
        isPlayerX = true;

        $('<div>').text(`Tie!`).css({
            fontSize: 'clamp(30px,20vw,120px)',
            color: 'red',
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


    tools.putSymbol(this.id);

} // handler


$('.cell').on('click', handler)
$('#reset-btn').on('click', tools.init)


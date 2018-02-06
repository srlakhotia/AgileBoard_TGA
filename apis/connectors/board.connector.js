const BoardModel = require('../models/board.model');

class Board {
    constructor() {
        this.findBoards = () => {
            const boardColln = BoardModel.find({}, (err, data) => {
                if(err) {
                    return err;
                }
                console.log('data;:: ', data)
                return data;
            });
            return boardColln;
        };

        this.addBoard = (input) => {
            const newBoard = new BoardModel({title: input.title});
            const boardColln = newBoard.save((err, data) => {
                if(err) {
                    return err;
                }
                return newBoard;
            });

            return newBoard;
        }
    }
}

module.exports = {
    Board
}
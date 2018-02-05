const BoardModel = require('../models/board.model');

class Board {
    constructor() {
        this.findBoards = () => {
            const boardColln = BoardModel.find({}, (err, data) => {
                if(err) {
                    return err;
                }
                return data;
            });
            return boardColln;
        };

        this.addBoard = (input) => {
            const boardData = BoardModel.insertMany([{title: input.title}], (err, data) => {
                if(err) {
                    return err;
                }
                return data;
            });

            return boardData;
        }
    }
}

module.exports = {
    Board
}
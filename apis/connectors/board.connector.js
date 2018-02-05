const BoardModel = require('../models/board.model');

class Board {
    constructor() {
        this.findBoards = () => {
            const boardColln = BoardModel.find({}, (err, data) => {
                return data;
            });
            return boardColln;
        };
    }
}

module.exports = {
    Board
}
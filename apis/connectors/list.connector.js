const ListModel = require('../models/list.model');

class List {
    constructor() {
        this.findLists = (boardId) => {
            const listColln = ListModel.find({boardId}, (err, data) => {
                return data;
            });
            return listColln;
        };
    }
}

module.exports = {
    List
}
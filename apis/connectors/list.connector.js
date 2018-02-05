const ListModel = require('../models/list.model');
const mongoose = require('mongoose');
class List {
    constructor() {
        this.findLists = (boardId) => {
            const id = mongoose.Types.ObjectId(boardId);
            const listColln = ListModel.find({"parentId": id}, (err, data) => {
                return data;
            });
            return listColln;
        };
    }
}

module.exports = {
    List
}
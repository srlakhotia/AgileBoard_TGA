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

        this.addList = (title, parentId) => {
            const id = mongoose.Types.ObjectId(parentId);
            const listData = ListModel.insertMany([{title: title, parentId: id, cards: []}], (err, data) => {
                if(err) {
                    return err;
                }
                return data;
            });

            return listData;
        }
    }
}

module.exports = {
    List
}
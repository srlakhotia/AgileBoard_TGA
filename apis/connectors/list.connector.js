const ListModel = require('../models/list.model');
const mongoose = require('mongoose');
class List {
    constructor() {
        this.findLists = (boardId) => {
            const id = mongoose.Types.ObjectId(boardId);
            const listColln = ListModel.find({"parentId": id}, (err, data) => {
                if(err) {
                    return err;
                }
                return data;
            });
            return listColln;
        };

        this.findListById = (listId) => {
            const id = mongoose.Types.ObjectId(listId);
            const listColln = ListModel.findById(id, (err, data) => {
                if(err) {
                    return err;
                }
                return data;
            });
            return listColln;
        };

        this.addCardToList = (input) => {
            const id = mongoose.Types.ObjectId(input.listId);
            const listData = ListModel.findOneAndUpdate({"_id": id}, {$push: {cards: {
                title: input.title
            }}}, (err, data) => {
                if(err) {
                    return err;
                }
                return data;
            });

            return listData;
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
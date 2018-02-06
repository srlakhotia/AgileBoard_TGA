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
            const query =  ListModel.findOneAndUpdate({"_id": id}, {$push: {cards: {
                                title: input.title
                            }}}, {new: true});

            return query.exec();
        };

        this.addList = (title, parentId) => {
            const id = mongoose.Types.ObjectId(parentId);
            const newList = new ListModel({
                title: title,
                parentId: id,
                cards: []
            });
            const listData = newList.save([{title: title, parentId: id, cards: []}], (err, data) => {
                if(err) {
                    return err;
                }
                return newList;
            });

            return newList;
        }
    }
}

module.exports = {
    List
}
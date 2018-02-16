const ListModel = require('../models/list.model');
const mongoose = require('mongoose');

class List {
    constructor() {
        this.moveCard = (input) => {
            const prevListId = mongoose.Types.ObjectId(input.prevListId);
            const newListId = mongoose.Types.ObjectId(input.newListId);
            const cardId = mongoose.Types.ObjectId(input.cardId);

            let query, cardObj, parentId;

            const listItems = ListModel
                                .findById(prevListId)
                                .then(data => {
                                    parentId = data.parentId;
                                    cardObj = data.cards.filter((card) => {
                                        return card._id.toString() == cardId.toString();
                                    })[0];

                                    return ListModel.findByIdAndUpdate(
                                        prevListId, {
                                            $pull: {
                                                cards: {
                                                    "_id": cardId
                                                }
                                            }
                                        }, {new: true});
                                })
                                .then(data => {
                                    return ListModel.findByIdAndUpdate(
                                        newListId,{
                                            $push: {
                                                cards: cardObj
                                            }
                                        },
                                        {new: true});
                                })
                                .then(res=> {
                                    return ListModel.find();
                                });
            return listItems;
        }

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
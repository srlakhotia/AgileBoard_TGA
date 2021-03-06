const BoardConnector =  require('../connectors/board.connector');
const ListConnector =  require('../connectors/list.connector');

const resolveFunctions = {
    Query: {
        boards(_, {}, ctx) {
            const board = new BoardConnector.Board();
            return board.findBoards();
        },

        lists(_, {boardId}, ctx) {
            const lists = new ListConnector.List();
            return lists.findLists(boardId);
        }
    },
    Mutation: {
        addBoard(_, {input}, ctx) {
            const board = new BoardConnector.Board();
            return board.addBoard(input);
        },

        addList(_, {input}, ctx) {
            const list = new ListConnector.List();
            return list.addList(input.title, input.parentId);
        },

        addCard(_, {input}, ctx) {
            const list = new ListConnector.List();
            return list.addCardToList(input);
        },

        moveCard(_, {input}, ctx) {
            const list = new ListConnector.List();
            return list.moveCard(input);
        },

        removeBoard(_, {input}, ctx) {
            const board = new BoardConnector.Board();
            return board.removeBoard(input);
        },

        removeList(_, {input}, ctx) {
            const list = new ListConnector.List();
            return list.removeList(input);
        },

        removeCard(_, {input}, ctx) {
            const list = new ListConnector.List();
            return list.removeCard(input);
        }

    }
};

module.exports = resolveFunctions;
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
    }
};

module.exports = resolveFunctions;
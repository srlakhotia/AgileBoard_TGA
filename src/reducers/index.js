import {
    ADD_LIST,
    GET_LISTS,
    ADD_CARD,
    MOVE_CARD,

    ADD_BOARD,
    GET_ALL_BOARD
} from '../actionTypes';

export default (prevState, action) => {
    switch (action.type) {
        case ADD_BOARD: {
            prevState.boardCollection.push(action.payload.result.data.addBoard);
            let newCollection = prevState;
            
            return Object.assign({}, prevState, {
                boardCollection: newCollection
            });
        }

        case GET_ALL_BOARD: {
            return Object.assign({}, prevState, {
                boardCollection: action.payload.result.data.boards
            });
        }

        case GET_LISTS: {
            return Object.assign({}, prevState, {
                listCollection: action.payload.result.data.lists
            });
        }

        case ADD_LIST: {
            prevState.listCollection.push(action.payload.result.data.addList);
            let newCollection = prevState.listCollection;
            
            return Object.assign({}, prevState, {
                listCollection: newCollection
            });
        }

        case ADD_CARD: {
            let newCollection = prevState.listCollection.filter((list) => {
                if(list._id == action.payload.listId) {
                    list.cards = action.payload.result.data.addCard.cards
                }
                return true;
            });

            return Object.assign({}, prevState, {
                listCollection: newCollection
            });
        }

        case MOVE_CARD: {
            console.log('move card');
            return prevState;
        }

        default: {
            return prevState;
        }
    }
}
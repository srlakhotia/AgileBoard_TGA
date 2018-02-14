import {ADD_BOARD, ADD_LIST, GET_ALL_BOARD} from '../actionTypes';

export default (prevState, action) => {
    switch (action.type) {
        case ADD_BOARD: {
            console.log('adding board')
            return prevState;
        }
        case ADD_LIST: {
            console.log('adding list');
            return prevState;
        }
        case GET_ALL_BOARD: {
            return Object.assign({}, prevState, {
                boardCollection: action.payload.result.data.boards
            });
        }
        default: {
            console.log('default reducer operation');
            return prevState;
        }
    }
}
import {
    ADD_BOARD,
    ADD_LIST,
    GET_ALL_BOARD
} from '../actionTypes';

import 'isomorphic-fetch';
import api, {GraphQLCall} from 'graphql-call';

function onAddBoard(newBoard) {
    const action = {
        type: ADD_BOARD,
        payload: {
            newBoard
        },
        error: false
    };

    return action;
}

function onAddList(newList) {
    const action = {
        type: ADD_LIST,
        payload: {
            newList
        },
        error: false
    }



    return action;
}

function getAllBoards() {
    let action = {};

    let client = api({url: 'http://localhost:3000/graphql'});

    return dispatch => {
        client.query({
            boards: {
                result: `
                _id
                title
                `
            }
        }).then(result => {
            action = {
                type: GET_ALL_BOARD,
                payload: {result},
                error: false
            };
            dispatch(action);
        }).catch(err => {
            console.error('err:: ', err);
        });
    }
}

export {
    onAddBoard,
    onAddList,
    getAllBoards
}
import {
    ADD_BOARD,
    GET_ALL_BOARD
} from '../actionTypes';
import 'isomorphic-fetch';
import api, {GraphQLCall} from 'graphql-call';

const client = api({url: 'http://localhost:3000/graphql'});

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

function getAllBoards() {
    let action = {};


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
    getAllBoards
}
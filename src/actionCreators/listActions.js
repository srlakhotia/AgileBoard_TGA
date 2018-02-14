import 'isomorphic-fetch';
import api, {GraphQLCall} from 'graphql-call';
import {
    ADD_LIST,
    GET_LISTS
} from '../actionTypes';

const client = api({url: 'http://localhost:3000/graphql'});

function getLists(boardId) {

    let action = {};
    return dispatch => client.query({
        lists: {
           variables: {boardId: boardId},
           result: `
           _id
            title
            parentId
            cards {
                _id
                title
            }
           `
        }
    }).then(result => {
        action =  {
            type: GET_LISTS,
            payload: {result},
            error: false
        };
        dispatch(action)
    }).catch(err => {
        console.error('err:: ', err);
    });

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

export {
    onAddList,
    getLists
}
import 'isomorphic-fetch';
import api, {GraphQLCall} from 'graphql-call';
import {
    ADD_LIST,
    GET_LISTS,
    ADD_CARD,
    MOVE_CARD
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
        dispatch(action);
    }).catch(err => {
        console.error('err:: ', err);
    });

}

function onAddList(newList, boardId) {
    let action = {};

    return dispatch => client.mutation({
        addList: {
            variables: {
                title: title,
                parentId: boardId
            },
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
        action = {
            type: ADD_LIST,
            payload: {result},
            error: false
        }

        dispatch(action);
    });
}

function onAddCard(cardTitle, listId) {
    let action = {};

    return dispatch => client.mutation({
        addCard: {
            variables: {
                title: cardTitle,
                listId: listId
            },
            result: `
                cards {
                    title
                    _id
                }
            `
        }
        }).then(result => {
            action =  {
                type: ADD_CARD,
                payload: {result},
                error: false
            };
            dispatch(action);
        }).catch(err => {
            console.error('err:: ', err);
        });
}

function onMoveCard(prevListId, newListId, cardId) {
    let action = {};

    return dispatch => client.mutation({
        moveCard: {
            variables: {
                prevListId: prevListId,
                newListId: newListId,
                cardId: cardId
            },
            result: `
                _id
            `
        }
    }).then(result => {
        action = {
            type: MOVE_CARD,
            payload: {result},
            error: false
        }
    });
}

export {
    onAddList,
    getLists,
    onAddCard,
    onMoveCard
}
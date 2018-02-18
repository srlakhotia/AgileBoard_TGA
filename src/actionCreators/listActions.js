import 'isomorphic-fetch';
import api, {GraphQLCall} from 'graphql-call';
import {
    ADD_LIST,
    GET_LISTS,
    ADD_CARD,
    MOVE_CARD,
    REMOVE_LIST
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

function onAddList(newListTitle, boardId) {
    let action = {};

    return dispatch => client.mutation({
        addList: {
            variables: {
                title: newListTitle,
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
            payload: {
                result
            },
            error: false
        }

        dispatch(action);
    }).catch(err => {
        console.error('error:: ', err)
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
                payload: {
                    result: result,
                    listId: listId
                },
                error: false
            };
            dispatch(action);
        }).catch(err => {
            console.error('err:: ', err);
        });
}

function onRemoveList(listId, parentId) {
    let action = {};

    return dispatch => client.mutation({
        removeList: {
            variables: {
                listId: listId,
                parentId: parentId
            },
            result: `
                _id
                title
                parentId
                cards {
                    title
                    _id
                }
            `
        }
    }).then(result => {
        action = {
            type: REMOVE_LIST,
            payload: {
                result: result
            },
            error: false
        }
        dispatch(action);
    }).catch(err => {
        console.error('error:: ', err)
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
                title
                parentId
                cards {
                    title
                    _id
                }
            `
        }
    }).then(result => {
        action = {
            type: MOVE_CARD,
            payload: {
                result: result,
                prevListId: prevListId,
                newListId: newListId
            },
            error: false
        }
        dispatch(action);
    }).catch(err => {
        console.error('error:: ', err)
    });
}

export {
    onAddList,
    getLists,
    onAddCard,
    onMoveCard,
    onRemoveList
}
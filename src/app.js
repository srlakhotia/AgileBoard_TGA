import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {BrowserRouter as Router} from 'react-router-dom';
import AppHeaderBar from './containers/app.header.jsx';
import BoardContainer from './containers/board-container.jsx';
import Board from './containers/board.jsx';

import { connect } from 'react-redux';
import * as Actions from './actionCreators';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <MuiThemeProvider>
                    <React.Fragment>
                        <AppHeaderBar />
                        <Route exact path="/"
                            render={(props) =>
                            <BoardContainer {...props}
                                getAllBoards={this.props.getAllBoards}
                                onAddBoard={this.props.onAddBoard}
                                onRemoveBoard={this.props.onRemoveBoard}

                                boardList={this.props.boardCollection} 
                            />} >
                        </Route>
                        <Route exact path="/board/:boardId"
                            render={(props) =>
                                <Board {...props}
                                    getAllLists={this.props.getAllLists}
                                    onAddList={this.props.onAddList}
                                    onAddCard={this.props.onAddCard}
                                    onMoveCard={this.props.onMoveCard}
                                    onRemoveList={this.props.onRemoveList}

                                    lists={this.props.listCollection}
                                />} >
                        </Route>     
                    </React.Fragment>
                </MuiThemeProvider>
            </Router>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        boardCollection: state.boardCollection,
        listCollection: state.listCollection
    }
};

const mapDispachToProps = (dispatch, ownProps) => {
    return {
        onAddBoard: (boardTitle) => {
            dispatch(Actions.onAddBoard(boardTitle));
        },
        onAddList: (listTitle, boardId) => {
            dispatch(Actions.onAddList(listTitle, boardId));
        },
        getAllBoards: () => {
            dispatch(Actions.getAllBoards());
        },
        getAllLists: (boardId) => {
            dispatch(Actions.getLists(boardId));
        },
        onAddCard: (cardTitle, listId) => {
            dispatch(Actions.onAddCard(cardTitle, listId));
        },
        onMoveCard: (prevListId, newListId, cardId) => {
            dispatch(Actions.onMoveCard(prevListId, newListId, cardId));
        },
        onRemoveBoard: (boardId) => {
            dispatch(Actions.onRemoveBoard(boardId));
        },
        onRemoveList: (listId, parentId) => {
            dispatch(Actions.onRemoveList(listId, parentId));
        }
    }
};

export default connect(mapStateToProps, mapDispachToProps)(App);
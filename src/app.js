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
                                boardList={this.props.boardCollection} 
                            />} >
                        </Route>
                        <Route exact path="/board/:boardId"
                            render={(props) =>
                                <Board {...props}
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
        onBoardAdd: (boardTitle) => {
            dispatch(Actions.onAddBoard(boardTitle));
        },
        onListAdd: (listTitle) => {
            dispatch(Actions.onAddList(listTitle));
        },
        getAllBoards: () => {
            dispatch(Actions.getAllBoards());
        }
    }
};

export default connect(mapStateToProps, mapDispachToProps)(App);
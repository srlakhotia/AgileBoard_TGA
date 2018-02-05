import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import BoardContainer from './board-container.jsx';
import Board from './board.jsx';

export default class AppContent extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div>
                <div>
                    <Route exact path="/" render={(props) => <BoardContainer {...props} />} ></Route>
                    <Route exact path="/board/:boardId" render={(props) => <Board {...props} />} ></Route>
                </div>
            </div>
        )
    }
}
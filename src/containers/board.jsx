import React, {Component} from 'react';

export default class Board extends Component {
    constructor(props) {
        super(props);
        console.log('BoardID:: ', this.props.match.params.boardId)
    }

    render() {
        return (
            <div>in BOARD ID: {this.props.match.params.boardId}</div>
        )
    }
}
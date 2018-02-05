import React, {Component} from 'react';
import AddItem from '../components/addItem.jsx';
import BoardCard from '../components/board-card.jsx';

export default class BoardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boardList: [{
                id: 123,
                title: "BOARD ONE"
            }, {
                id: 654,
                title: "BOARD TWO"
            }],
            context: "board"
        }
    }

    render() {
        let boardMap = this.state.boardList.map((board) => {
            const boardPath = `/board/${board.id}`;
            return (<li key={board.id}>
                <BoardCard boardDetails={board}></BoardCard>
            </li>);
        });
        return (
            <div>
                <ul>
                    {boardMap}
                </ul>
                <AddItem context={this.state.context}></AddItem>
            </div>
        )
    }
}

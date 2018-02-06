import React, {Component} from 'react';
import AddItem from '../components/addItem.jsx';
import BoardCard from '../components/board-card.jsx';
import 'isomorphic-fetch';
import api, {GraphQLCall} from 'graphql-call';

export default class BoardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boardList: [],
            context: "board"
        }

        this.updateWhenAdded = (newBoard) => {
            let boardlist = this.state.boardList;
            boardlist.push(newBoard);
            this.setState({
                boardList: boardlist
            });
        };
    }
    
    componentDidMount() {
        let client = api({url: 'http://localhost:3000/graphql'});

        client.query({
            boards: {
                result: `
                _id
                title
                `
            }
        }).then(result => {
            let boards = result.data.boards || [];
            this.setState({
                boardList: boards
            });
        }).catch(err => {
            console.error('err:: ', err);
        });
    }

    render() {
        let boardMap = this.state.boardList.map((board) => {
            const boardPath = `/board/${board._id}`;
            return (<li key={board._id}>
                <BoardCard boardDetails={board}></BoardCard>
            </li>);
        });
        return (
            <div>
                <ul>
                    {boardMap}
                </ul>
                <AddItem context={this.state.context} updateState={(evt) => this.updateWhenAdded(evt)}></AddItem>
            </div>
        )
    }
}

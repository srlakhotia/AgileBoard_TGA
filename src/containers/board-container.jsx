import React, {Component} from 'react';
import AddItem from '../components/addItem.jsx';
import BoardCard from '../components/board-card.jsx';

export default class BoardContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            context: "board"
        }

        this.styles = {
            boardItem: {
                listStyleType: "none",
                display: 'inline-block',
                width: '20%',
                margin: '3%',
                padding: '1%',
                backgroundColor: '#e0f7f2',
                boxShadow: '0px 0px 4px 0px #5d6f6b',
                borderRadius: '4px'
            }
        }
    }
    
    componentDidMount() {
        this.props.getAllBoards();
    }
    
    render() {
        let boardMap = this.props.boardList.map((board) => {
            return (<li key={board._id} style={this.styles.boardItem}>
                <BoardCard boardDetails={board}></BoardCard>
            </li>);
        });
        return (
            <div>
                <ul>
                    {boardMap}
                </ul>
                <div className="fab">
                    <AddItem
                        context={this.state.context}
                        onAddBoard={this.props.onAddBoard}
                    ></AddItem>
                </div>
            </div>
        )
    }
}

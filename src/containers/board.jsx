import React, {Component} from 'react';
import AddItem from '../components/addItem.jsx';
import ListCard from '../components/list-card.jsx';
import {GridList, GridTile} from 'material-ui/GridList';

export default class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            context: 'list'
        }

        this.styles = {
            listContainer: {
                display: 'inline-block',
                width: '20%',
                margin: '3%',
                padding: '1%',
                backgroundColor: '#e0f7f2',
                boxShadow: '0px 0px 4px 0px #5d6f6b',
                borderRadius: '4px',
                position: 'relative',
                verticalAlign: 'top'
            }
        };
    }

    componentDidMount() {
        this.props.getAllLists(this.props.match.params.boardId);
    }

    render() {
        let listMap = this.props.lists.map((list, idx) => {
            return (<li style={this.styles.listContainer} key={idx}>
                    <ListCard
                        listDetails={list}
                        allLists={this.props.lists}

                        onAddCard={this.props.onAddCard}
                        onMoveCard={this.props.onMoveCard}
                        onRemoveList={this.props.onRemoveList}
                    ></ListCard>
                </li>);
        });
        return (
            <div>
                <ul>
                    {listMap}
                </ul>
                <div className="fab">
                    <AddItem
                        context={this.state.context}
                        parentId={this.props.match.params.boardId}

                        onAddList={this.props.onAddList}
                    ></AddItem>
                </div>
            </div>
        )
    }
}
import React, {Component} from 'react';
import 'isomorphic-fetch';
import api, {GraphQLCall} from 'graphql-call';
import AddItem from '../components/addItem.jsx';
import ListCard from '../components/list-card.jsx';
import {GridList, GridTile} from 'material-ui/GridList';

export default class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: [],
            context: 'list'
        }

        this.addNewList = (newList) => {
            let lists = this.state.lists;

            lists.push(newList);
            this.setState(lists);
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
                position: 'relative'
            }
        };
    }

    componentDidMount() {
        const client = api({url: 'http://localhost:3000/graphql'});

        client.query({
            lists: {
               variables: {boardId: this.props.match.params.boardId},
               result: `
               _id
                title
                parentId
                cards {
                    title
                }
               `
            }
        }).then(result => {
            let lists = result.data.lists || [];
            this.setState({
                lists: lists
            });
        }).catch(err => {
            console.error('err:: ', err);
        });
    }

    render() {
        let listMap = this.state.lists.map((list, idx) => {
            return (<li style={this.styles.listContainer} key={idx}>
                    <ListCard listDetails={list}></ListCard>
                </li>);
        });
        return (
            <div>
                <ul>
                    {listMap}
                </ul>
                <div className="fab">
                    <AddItem context={this.state.context} updateState={(evt) => this.addNewList(evt)} parentId={this.props.match.params.boardId}></AddItem>
                </div>
            </div>
        )
    }
}
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
            return (<GridTile key={idx}>
                    <ListCard listDetails={list}></ListCard>
                </GridTile>);
        });
        return (
            <div>
                <GridList cols={4.4}>
                    {listMap}
                </GridList>
                <AddItem context={this.state.context} parentId={this.props.match.params.boardId}></AddItem>
            </div>
        )
    }
}
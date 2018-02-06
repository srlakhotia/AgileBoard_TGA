import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {Link}  from 'react-router-dom';
import AddItem from './addItem.jsx';

export default class ListCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            context: 'card',
            cards: this.props.listDetails.cards
        }

        this.updateOnAdd = (newCardSet) => {
            let cardList = newCardSet;

            this.setState({
                cards: cardList
            });
        };
    }

    render() {
        const cardMap = this.state.cards.map((card, idx) => {
            return (<CardText key={idx}>{card.title}</CardText>);
        });
        return (<React.Fragment>
            <Card>
                <CardTitle
                    title={this.props.listDetails.title}>
                </CardTitle>
                {cardMap}
                <CardActions>
                    <AddItem label="Add Card" updateState={(evt) => this.updateOnAdd(evt)} context={this.state.context} parentId={this.props.listDetails._id}></AddItem>
                    <RaisedButton label="Delete List" />
                </CardActions>
            </Card>  
        </React.Fragment>)
    }
};
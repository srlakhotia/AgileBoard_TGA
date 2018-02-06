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

        this.styles = {
            listContainer: {},
            cardTitle: {},
            cardContainer: {},
            cardItem: {
                listStyleType: 'none',
                margin: '7px 0',
                padding: '5px',
                background: '#fff',
                display: 'block',
                boxShadow: '0px 0px 3px #222',
                borderRadius: '4px',
                verticalAlign: 'top'
            },
            fabSmall: {
                position: 'absolute',
                right: '8px',
                bottom: '8px'
            }
        }
    }

    render() {
        const cardMap = this.state.cards.map((card, idx) => {
            return (<li style={this.styles.cardItem} key={idx}>
                {card.title}
            </li>);
        });
        return (<React.Fragment>
            <div style={this.styles.listContainer}>
                <div style={this.styles.cardTitle}>
                    <h3>{this.props.listDetails.title}</h3>
                </div>
                <ul style={this.styles.cardContainer}>{cardMap}</ul>
            </div>

            <div>
                <div style={this.styles.fabSmall}>
                    <AddItem label="Add Card" updateState={(evt) => this.updateOnAdd(evt)} context={this.state.context} parentId={this.props.listDetails._id}></AddItem>
                </div>
                <RaisedButton label="Delete List" />
            </div>
        </React.Fragment>)
    }
};
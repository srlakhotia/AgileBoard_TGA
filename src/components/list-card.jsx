import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import {Link}  from 'react-router-dom';
import AddItem from './addItem.jsx';
import Dialog from 'material-ui/Dialog';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import 'isomorphic-fetch';
import api, {GraphQLCall} from 'graphql-call';

export default class ListCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            context: 'card',
            cards: this.props.listDetails.cards,
            dialogOpen: false,
            dialogValue: this.props.listDetails._id,
            movingCardId: ''
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
                borderRadius: '4px'
            },
            fabSmall: {
                position: 'absolute',
                right: '8px',
                bottom: '8px'
            },
            cardTitle: {
                verticalAlign: '-webkit-baseline-middle'
            },
            moveButton: {
                float: 'right'
            }
        };

        this.moveCardtoNewList = (oldList, newList) => {
            if(oldList !== newList) {
                let client = api({url: 'http://localhost:3000/graphql'});

                client.mutation({
                    moveCard: {
                        variables: {
                            prevListId: oldList,
                            newListId: newList,
                            cardId: this.state.movingCardId
                        },
                        result: `
                            _id
                        `
                    }
                }).then(result => {
                    this.props.reloadLists();
                });
            }
        }

        this.moveCardDialogLabel = '';
        this.closeDialog = (ev, isSubmit) => {
            if(isSubmit) {
                ev.preventDefault();
                this.moveCardtoNewList(this.props.listDetails._id, this.state.dialogValue);
                this.setState({
                    dialogOpen: false,
                    movingCardId: ''
                });
            } else {
                this.setState({
                    dialogOpen: false,
                    movingCardId: ''
                });
            }
        };

        this.openDialog = (card) => {
            this.moveCardDialogLabel = `Move "${card.title}" card to another list?`;
            this.setState({
                dialogOpen: true,
                movingCardId: card._id
            });
        };
        
        this.getAllMenuItems = () => {
            const allLists = this.props.allLists;
            const menuMap = allLists.map((list, idx) => {
                return(<MenuItem key={idx} value={list._id} primaryText={list.title}></MenuItem>);
            });
            return menuMap;
        };

        this.handleListChange = (ev, idx, val) => {
            this.setState({dialogValue: val});
        }
    }

    render() {
        const cardMap = this.state.cards.map((card, idx) => {
            return (<li style={this.styles.cardItem} key={idx}>
                <span style={this.styles.cardTitle}>{card.title}</span>
                <span style={this.styles.moveButton}>
                    <RaisedButton secondary={true} label="Move" onClick={(ev) => this.openDialog(card)} />
                </span>
                <div className="clearfix"></div>
            </li>);
        });

        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={(ev) => this.closeDialog(ev)}
            />,
            <RaisedButton
              label="Move"
              primary={true}
              onClick={(ev) => this.closeDialog(ev, true) }
            />,
          ];
        return (<React.Fragment>
            <div style={this.styles.listContainer}>
                <div style={this.styles.cardTitle}>
                    <h3>{this.props.listDetails.title}</h3>
                </div>
                <ul style={this.styles.cardContainer}>{cardMap}</ul>
            </div>

            <div>
                <div style={this.styles.fabSmall}>
                    <AddItem
                        label="Add Card"
                        updateState={(evt) => this.updateOnAdd(evt)}
                        context={this.state.context}
                        parentId={this.props.listDetails._id}
                    ></AddItem>
                </div>
                <RaisedButton label="Delete List" />
            </div>
            <Dialog
                    title={this.moveCardDialogLabel}
                    actions={actions}
                    modal={false}
                    open={this.state.dialogOpen}
                    onRequestClose={this.handleClose}
                >
                <SelectField
                    floatingLabelText="Choose List"
                    value={this.state.dialogValue}
                    onChange={(ev, idx, val) => this.handleListChange(ev, idx, val)}
                >
                    {this.getAllMenuItems()}
                </SelectField>
            </Dialog>
        </React.Fragment>)
    }
};
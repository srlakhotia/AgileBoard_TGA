import React, {Component} from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import 'isomorphic-fetch';
import api, {GraphQLCall} from 'graphql-call';

export default class AddItem extends Component {
    constructor(props) {
        super(props);
        const errorMessage = "You must enter title";
        this.state = {
            open: false,
            requiredError: '',
            isMini: this.props.context === 'card'
        }


        this.openDialog = (ctx) => {
            this.setState({open: true});
        };
        
        this.closeDialog = (ev, isSubmit) => {
            if(isSubmit) {
                ev.preventDefault();
                let title = document.getElementById('new_title').value;
                if(title.trim() !== '') {
                    this.setState({open: false});
                    this.addItem(title);
                } else {
                    this.setState({requiredError: errorMessage})
                }
            } else {
                this.setState({open: false});
            }

        };

        this.addItem = (title, parentId) => {
            let client = api({url: 'http://localhost:3000/graphql'});

            switch(this.props.context) {
                case 'board': {
                    client.mutation({
                        addBoard: {
                            variables: {title: title},
                            result: `
                                _id
                                title
                            `
                        }
                    }).then(result => {
                        let newData;
                        if(!result.error) {
                            newData = {
                                title: result.data.addBoard.title,
                                _id: result.data.addBoard._id
                            }
                            this.props.updateState(newData);
                        }
                    });
                    break;
                }
                case 'list': {
                    client.mutation({
                        addList: {
                            variables: {
                                title: title,
                                parentId: this.props.parentId
                            },
                            result: '_id'
                        }
                    }).then(result => {
                        if(!result.error) {
                            console.log('List successfully added');
                        }
                    });
                    break;
                }
                case 'card': {
                    client.mutation({
                        addCard: {
                            variables: {
                                title: title,
                                listId: this.props.parentId
                            },
                            result: `
                                cards {
                                    title
                                    _id
                                }
                            `
                        }
                    }).then(result => {
                        let newData;
                        if(!result.error) {
                            console.log('result:: ', result.data.addCard.cards)
                            newData = result.data.addCard.cards;
                            this.props.updateState(newData);
                        }
                    });
                    break;
                }
                default: {
                    break;
                }
            }
        }
    }

    render() {
        const addLabel = `Add new ${this.props.context}`;
        const placeholder = `Enter title for new ${this.props.context} here.`

        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.closeDialog}
            />,
            <RaisedButton
              label="Add"
              primary={true}
              onClick={(ev) => {this.closeDialog(ev, true);}}
            />,
          ];
        return(
            <React.Fragment>
                <FloatingActionButton mini={this.state.isMini} onClick={(evt) => { this.openDialog(this.props.context)}}>
                    <ContentAdd />
                </FloatingActionButton>
                <Dialog
                    title={addLabel}
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                <TextField
                    floatingLabelText={placeholder}
                    fullWidth={true}
                    id="new_title"
                    errorText={this.state.requiredError}
                />
                </Dialog>
            </React.Fragment>
        )
    }
}
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
            const client = api({url: 'http://'+window.location.hostname+':3000/graphql'});

            switch(this.props.context) {
                case 'board': {
                    this.props.onAddBoard(title);
                    break;
                }
                case 'list': {
                    this.props.onAddList(title, this.props.parentId);
                    break;
                }
                case 'card': {
                    this.props.onAddCard(title, this.props.parentId);
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
              type="submit"
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
                    autoFocus={true}
                />
                </Dialog>
            </React.Fragment>
        )
    }
}
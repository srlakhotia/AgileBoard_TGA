import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {Link}  from 'react-router-dom';

export default class BoardCard extends Component {
    constructor(props) {
        super(props);
        this.styles = {
            boardContainer: {},
            boardTitle: {
                marginBottom: '20px'
            },
            actionBar: {},
            firstButton: {
                marginRight: '5px'
            }
        }
    }

    render() {
        const boardLink = `/board/${this.props.boardDetails._id}`;
        return (<React.Fragment>
            <div style={this.styles.boardContainer}>
                <div style={this.styles.boardTitle}>
                    <h3>{this.props.boardDetails.title}</h3>
                </div>
                <div style={this.styles.actionBar}>
                    <Link to={boardLink}>
                        <RaisedButton label="View" primary={true} style={this.styles.firstButton}/>
                    </Link>
                    <RaisedButton label="Delete" />
                </div>
            </div>

        </React.Fragment>)
    }
};
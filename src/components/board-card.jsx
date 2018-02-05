import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {Link}  from 'react-router-dom';

export default class BoardCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const boardLink = `/board/${this.props.boardDetails.id}`;
        return (<React.Fragment>
            <Card>
                <CardTitle
                    title={this.props.boardDetails.title}>
                </CardTitle>
                <CardActions>
                    <Link to={boardLink}>
                        <RaisedButton label="View" primary={true}/>
                    </Link>
                    <RaisedButton label="Delete" />
                </CardActions>
            </Card>  
        </React.Fragment>)
    }
};
import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {Link}  from 'react-router-dom';

export default class ListCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<React.Fragment>
            <Card>
                <CardTitle
                    subtitle={this.props.listDetails.title}>
                </CardTitle>
                <CardActions>
                    <RaisedButton label="Add Card" primary={true}/>
                    <RaisedButton label="Delete List" />
                </CardActions>
            </Card>  
        </React.Fragment>)
    }
};
import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';

export default class AppHeaderBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appHeader: "Dashboard"
        }
    }

    render() {
        return(
            <React.Fragment>
                <AppBar title={this.state.appHeader}></AppBar>                      
            </React.Fragment>
        )
    }
};
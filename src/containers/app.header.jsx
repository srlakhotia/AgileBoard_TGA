import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import AppContent from './app.content.jsx';


export default class AppHeaderBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appHeader: "Dashboard",
            area: "dashboard"
        }
    }

    render() {
        return(
            <React.Fragment>
                <AppBar title={this.state.appHeader}></AppBar> 
                <AppContent appArea={this.state.area} />           
            </React.Fragment>
        )
    }
};
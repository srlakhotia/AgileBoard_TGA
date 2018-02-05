import React from 'react';
import ReactDOM from 'react-dom';
import AppHeaderBar from './containers/app.header.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {BrowserRouter as Router} from 'react-router-dom';

const App = () => {
    return (
        <MuiThemeProvider>
            <Router>
                <AppHeaderBar />
            </Router>
        </MuiThemeProvider>
    );
};

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
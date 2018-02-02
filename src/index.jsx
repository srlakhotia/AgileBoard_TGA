import DefaultLayout from './layout';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

class HelloMessage extends React.Component {
  render() {
    return (
      <Provider>
        <DefaultLayout title={this.props.title}>
          
        </DefaultLayout>
      </Provider>
    );
  }
}

module.exports = HelloMessage;
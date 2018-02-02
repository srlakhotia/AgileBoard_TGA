var React = require('react');

class DefaultLayout extends React.Component {
  render() {
    return (
        <html lang="en">
          <head>
            <title>{this.props.title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </head>
          <body>
            {this.props.children}
          </body>
        </html>
    );
  }
}

module.exports = DefaultLayout;
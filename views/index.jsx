var React = require('react');
var DefaultLayout = require('./default-layout');

class indexPage extends React.Component {
    render() {
        return (
            <DefaultLayout>
                <div id="root"></div>
            </DefaultLayout>
        );
    }
}

module.exports = indexPage;
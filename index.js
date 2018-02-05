const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config.js');
const mongoConnection = require('./mongoConnection');
const { makeExecutableSchema } = require('graphql-tools');
const {apolloExpress, graphiqlExpress} = require('apollo-server');
const schema = require('./apis/schema');
const resolvers = require('./apis/resolvers');
const connectors = require('./apis/connectors');


let app = express();
app.listen(config.APP_SERVER_PORT_NO, () => console.log('App listening on port:',config.APP_SERVER_PORT_NO ));

app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

require("./routes")(app, config);
mongoConnection();

const executableSchema = makeExecutableSchema({
    typeDefs: schema,
    resolvers: resolvers
});

app.use('/graphql', bodyParser.json(), apolloExpress({
    schema: executableSchema,
    context: {
        constructor: connectors
    }
}));

app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}));

module.exports = app;
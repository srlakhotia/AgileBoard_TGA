const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {apolloExpress, graphiqlExpress} = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');
const { seed } = require('./seed');
const schema = require('./schema');
const resolvers = require('./resolvers');
const connectors = require('./connectors');

const PORT = 8080;
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/RaceToDone', (err) => {
    if(err) {
        return err;
    }
    console.log('Successfully conntected to Mongo');
    return true;
});

seed();


const executableSchema = makeExecutableSchema({
    typeDefs: schema,
    resolvers: resolvers
})

app.use('/graphql', bodyParser.json(), apolloExpress({
    schema: executableSchema,
    context: {
        constructor: connectors
    }
}));

app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}));

app.set('views', __dirname + '/src');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
app.get('/', require('./src/routes').index);

app.listen(PORT, () => {
    console.log(`GraphQL Server is now running on http://localhost:${PORT}/graphql`)
});
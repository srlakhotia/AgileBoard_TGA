const typeDefs = `
    type Board {
        title: String
        _id: ID
    }

    type Cards {
        title: String
    }

    type Lists {
        _id: ID
        title: String
        parentId: ID,
        cards: [Cards]
    }

    type Query {
        boards: [Board]
        lists(boardId: ID!): [Lists]
    }

    input BoardInput {
        title: String
    }

    type Mutation {
        addBoard(title: String): [Board]
    }
    
    schema {
        query: Query
        mutation: Mutation
    }
`;

module.exports = [typeDefs];
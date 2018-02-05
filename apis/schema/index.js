const typeDefs = `
    type Board {
        title: String
        _id: ID
    }

    type Cards {
        title: String
        id: ID
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

    input ListInput {
        title: String
        parentId: String!
    }

    type Mutation {
        addBoard(title: String): Board
        addList(input: ListInput): Lists
    }
    
    schema {
        query: Query
        mutation: Mutation
    }
`;

module.exports = [typeDefs];
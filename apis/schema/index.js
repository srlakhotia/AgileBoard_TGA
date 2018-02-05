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

    input CardInput {
        title: String!
        listId: String!
    }

    input BoardInput {
        title: String!
    }

    type Mutation {
        addBoard(input: BoardInput): Board
        addList(input: ListInput): Lists
        addCard(input: CardInput): Cards
    }
    
    schema {
        query: Query
        mutation: Mutation
    }
`;

module.exports = [typeDefs];
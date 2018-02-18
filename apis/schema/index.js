const typeDefs = `
    type Board {
        title: String
        _id: ID
    }

    type Cards {
        title: String
        _id: ID
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
    
    input MoveCardInput {
        prevListId: String!
        newListId: String!
        cardId: String!
    }

    input RemoveBoardInput {
        boardId: ID!
    }

    type Mutation {
        addBoard(input: BoardInput): Board
        addList(input: ListInput): Lists
        addCard(input: CardInput): Lists
        moveCard(input: MoveCardInput): [Lists]
        removeBoard(input: RemoveBoardInput): [Board]
    }
    
    schema {
        query: Query
        mutation: Mutation
    }
`;

module.exports = [typeDefs];
const typeDefs = `
    type Board {
        title: String
    }

    type Cards {
        title: String
    }

    type Lists {
        title: String
        parentId: ID,
        cards: [Cards]
    }

    type Query {
        boards: [Board]
        lists(boardId: ID): Lists
    }
    
    schema {
        query: Query
    }
`;

module.exports = [typeDefs];
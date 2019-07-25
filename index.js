const { ApolloServer, gql } = require('apollo-server');

const catsData = [
    {
        id: 1,
        name: 'meow 😺',
        color: 'black'
    },
    {
        id: 2,
        name: 'moew 😻',
        color: 'yellow'
    },
    {
        id: 3,
        name: 'dog 😿',
        color: 'white'
    },
    {
        id: 4,
        name: 'cat 1 🙀',
        color: 'black'
    },
    {
        id: 5,
        name: 'cat 😽',
        color: 'black & white'
    }
];

const typeDefs = gql`
    type Query {
        "Query for awesome cats"
        cat(id: Int!): Cat
        cats(color: String): [Cat]
    }
    type Mutation {
        updateCatColor(id: Int!, newColor: String!): Cat
    }
    type Cat {
        id: Int
        name: String
        color: String
    }
`;

const getCat = (_, { id }) => catsData.find(catData => catData.id === id);
const getCats = (_, { color }) =>
    catsData.filter(catData => catData.color === color);
const updateCatColor = (_, { id, newColor }) =>
  catsData
    .filter(catData => catData.id === id)
    .map(catData => ({
      ...catData,
      color: newColor
    }))[0];

const resolvers = {
    Query: {
        cat: getCat,
        cats: getCats
    },
    Mutation: {
        updateCatColor
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});

const express = require('express');
const { assertValidExecutionArguments } = require('graphql/execution/execute');
//const { ApolloServer } = require('apollo-server-express');
const path = require('path');

// const { typeDefs, resolvers } = require('./schemas');
// const { authMiddleware } = require('./utils/auth');
// const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.post('/home',async (req, res) => {
 let result = await axios.get("http://whateverapiurlis${process.env.MarvelToken}?${req.body.superHeroName}")

 res.json(result)
} )


// const startServer = async () => {
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     context: authMiddleware,
//   });
//   await server.start();
//   server.applyMiddleware({ app });
//   console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
// };

// startServer();



// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// db.once('open', () => {
//   app.listen(PORT, () => {
//     console.log(`API server running on port ${PORT}!`);
//   });
// });

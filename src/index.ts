import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

import { typeDefs } from './schema';
import { resolvers } from './resolver';

const PORT = 5501;
const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers
});

(async () => {
    await server.start();

    app.use(
        cors(),
        bodyParser.json(),
        expressMiddleware(server),
    );
    
    app.listen(PORT, () => {
        console.log(`🚀 Server ready at https://localhost:${PORT}/graphql`);
    });
})();
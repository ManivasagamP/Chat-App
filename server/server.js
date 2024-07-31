const { createServer } = require('http');
const express = require('express');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { useServer } = require('graphql-ws/lib/use/ws');
const { WebSocketServer } = require('ws');
const cors = require('cors');
const { PubSub } = require('graphql-subscriptions');
const bodyParser = require('body-parser');

const pubsub = new PubSub();

const typeDefs = `
type Message {
    id: ID!
    userId: String!
    user: String!
    content: String!
}

type Query {
    messages: [Message!]
}

type Mutation {
    postMessage(userId: String!, user: String!, content: String!): ID!
} 

type Subscription {
    messages: [Message!]
}
`;

const messages = [];

const resolvers = {
    Query: {
        messages: () => messages,
    },
    Mutation: {
        postMessage: (parent, args) => {
            const id = messages.length;
            messages.push({
                id,
                userId: args.userId,
                user: args.user,
                content: args.content,
            });
            pubsub.publish('MESSAGES', { messages });
            return id;
        },
    },
    Subscription: {
        messages: {
            subscribe: () => pubsub.asyncIterator(['MESSAGES']),
        },
    },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
app.use(cors());
app.use(bodyParser.json());

const httpServer = createServer(app);

const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
});

useServer({ schema }, wsServer);

const apolloServer = new ApolloServer({ schema });
await apolloServer.start();

app.use('/graphql', expressMiddleware(apolloServer));

httpServer.listen(4000, () => {
    console.log(`Server is running on http://localhost:4000/graphql`);
});
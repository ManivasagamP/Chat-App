const { createYoga } = require('graphql-yoga');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { PubSub } = require('graphql-subscriptions');
const { createServer } = require('http');

const messages = [];

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

const subscribers = [];
const onMessagesUpdates = (fn) => subscribers.push(fn);

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
            subscribers.forEach((fn) => fn());
            return id;
        },
    },
    Subscription: {
        messages: {
            subscribe: (parent, args, { pubsub }) => {
                const channel = Math.random().toString(36).slice(2, 15);
                onMessagesUpdates(() => pubsub.publish(channel, { messages }));
                setTimeout(() => pubsub.publish(channel, { messages }), 0);
                return pubsub.asyncIterator(channel);
            },
        },
    },
};

const pubsub = new PubSub();
const schema = makeExecutableSchema({ typeDefs, resolvers });

const yoga = createYoga({
    schema,
    context: { pubsub },
});

const server = createServer(yoga);

server.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});
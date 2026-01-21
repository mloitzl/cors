import { createServer } from "node:http";
import { createYoga, createSchema } from "graphql-yoga";

// Simple in-memory data for demonstration
const baseTime = new Date();
const messages = [
  {
    id: "1",
    text: "Hello from CORS-enabled backend!",
    timestamp: new Date(baseTime.getTime() - 3600000).toISOString(),
  },
  {
    id: "2",
    text: "CORS allows cross-origin requests",
    timestamp: baseTime.toISOString(),
  },
];

// GraphQL Schema
const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Message {
      id: ID!
      text: String!
      timestamp: String!
    }

    type Query {
      messages: [Message!]!
      message(id: ID!): Message
    }

    type Mutation {
      addMessage(text: String!): Message!
    }
  `,
  resolvers: {
    Query: {
      messages: () => messages,
      message: (_, { id }) => messages.find((m) => m.id === id),
    },
    Mutation: {
      addMessage: (_, { text }) => {
        const newMessage = {
          id: String(messages.length + 1),
          text,
          timestamp: new Date().toISOString(),
        };
        messages.push(newMessage);
        return newMessage;
      },
    },
  },
});

// Create Yoga instance with CORS configuration
const yoga = createYoga({
  schema,
  // CORS configuration - this is the key part for CORS demonstration
  cors: {
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://organic-eureka-pj79qv76jv6c7pj5-5173.app.github.dev",
    ], // Allow frontend origins
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
  },
  // Enable GraphiQL for easy testing
  graphiql: {
    title: "CORS Showcase API",
  },
});

// Create HTTP server
const server = createServer(yoga);

const PORT = 4000;

server.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  console.log(`📝 GraphiQL available at http://localhost:${PORT}/graphql`);
  console.log(``);
  console.log(`🔒 CORS Configuration:`);
  console.log(
    `   - Allowed origins: http://localhost:5173, http://localhost:3000`,
  );
  console.log(`   - Credentials: enabled`);
  console.log(`   - Methods: GET, POST, OPTIONS`);
});

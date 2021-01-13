import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server'
import { createContext } from '../src/context'
import ListTemplateResolver from '../src/resolvers/ListTemplateResolver'
import TodoTemplateResolver from '../src/resolvers/TodoTemplateResolver'
import TodoListResolver from '../src/resolvers/TodoListResolver'
import { customAuthChecker } from '../src/auth'
import UserResolver from '../src/resolvers/UserResolver'
import TodoResolver from '../src/resolvers/TodoResolver'
const PORT = process.env.PORT || 4000

const startServer = async () => {
  const schema = await buildSchema({
    resolvers: [ListTemplateResolver, TodoTemplateResolver, TodoListResolver, UserResolver, TodoResolver],
    authChecker: customAuthChecker
  })

  new ApolloServer({ schema, context: createContext, introspection: true }).listen({ port: PORT }).then(() => {
    console.log('server is running on ' + PORT)
  })
}

startServer()

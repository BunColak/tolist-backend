import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server'
import { createContext } from './context'
import ListTemplateResolver from './resolvers/ListTemplateResolver'
import TodoTemplateResolver from './resolvers/TodoTemplateResolver'
import TodoListResolver from './resolvers/TodoListResolver'
import { customAuthChecker } from './auth'
import UserResolver from './resolvers/UserResolver'
const PORT = process.env.PORT || 4000

const startServer = async () => {
  const schema = await buildSchema({
    resolvers: [ListTemplateResolver, TodoTemplateResolver, TodoListResolver, UserResolver],
    authChecker: customAuthChecker
  })

  new ApolloServer({ schema, context: createContext, introspection: true }).listen({ port: PORT }).then(() => {
    console.log('server is running on ' + PORT)
  })
}

startServer()

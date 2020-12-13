import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server'
import { createContext } from './context'
import ListTemplateResolver from './resolvers/ListTemplateResolver'
import TodoTemplateResolver from './resolvers/TodoTemplateResolver'
const PORT = process.env.PORT || 4000

const startServer = async () => {
  const schema = await buildSchema({
    resolvers: [ListTemplateResolver, TodoTemplateResolver]
  })

  const context = createContext()

  new ApolloServer({ schema, context }).listen({ port: PORT }).then(() => {
    console.log('server is running on ' + PORT)
  })
}

startServer()

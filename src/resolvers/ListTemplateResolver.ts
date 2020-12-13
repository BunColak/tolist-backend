import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root
} from 'type-graphql'
import { Context } from '../context'
import ListTemplate, { AddListTemplateInput } from '../models/ListTemplate'
import TodoTemplate from '../models/TodoTemplate'

@Resolver((of) => ListTemplate)
export default class ListTemplateResolver {
  @Query((returns) => [ListTemplate])
  async listTemplates (@Ctx() ctx: Context) {
    return ctx.prisma.listTemplate.findMany()
  }

  @Query(returns => ListTemplate)
  async listTemplate (@Arg('id') id: number, @Ctx() ctx: Context) {
    return ctx.prisma.listTemplate.findFirst({ where: { id } })
  }

  @Mutation((returns) => ListTemplate)
  async addListTemplate (
    @Arg('data') data: AddListTemplateInput,
    @Ctx() ctx: Context
  ) {
    const todosToCreate = data.todos.map((todo) => ({ text: todo }))

    const listTemplate = await ctx.prisma.listTemplate.create({
      data: {
        todos: {
          create: todosToCreate
        }
      }
    })

    return listTemplate
  }

  @Mutation((returns) => ListTemplate)
  async deleteListTemplate (@Arg('id') id: number, @Ctx() ctx: Context) {
    await ctx.prisma.todoTemplate.deleteMany({ where: { templateId: id } })
    return ctx.prisma.listTemplate.delete({ where: { id } })
  }

  @FieldResolver((returns) => [TodoTemplate])
  async todos (@Root() listTemplate: ListTemplate, @Ctx() ctx: Context) {
    return ctx.prisma.todoTemplate.findMany({
      where: { templateId: listTemplate.id }
    })
  }
}

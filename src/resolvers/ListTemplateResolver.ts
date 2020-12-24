import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root
} from 'type-graphql'
import { Context } from '../context'
import { RoleType } from '../auth'
import ListTemplate, { AddListTemplateInput } from '../models/ListTemplate'
import TodoTemplate from '../models/TodoTemplate'
import User from '../models/User'

@Resolver((of) => ListTemplate)
export default class ListTemplateResolver {
  @Query((returns) => [ListTemplate])
  @Authorized()
  async listTemplates (@Ctx() ctx: Context) {
    return ctx.prisma.listTemplate.findMany()
  }

  @Query((returns) => [ListTemplate])
  @Authorized()
  async myListTemplates (@Ctx() ctx: Context) {
    return ctx.prisma.listTemplate.findMany({ where: { userId: ctx.user.id } })
  }

  @Query(returns => ListTemplate)
  async listTemplate (@Arg('id') id: number, @Ctx() ctx: Context) {
    return ctx.prisma.listTemplate.findFirst({ where: { id } })
  }

  @Mutation((returns) => ListTemplate)
  @Authorized()
  async createListTemplate (
    @Arg('data') data: AddListTemplateInput,
    @Ctx() ctx: Context
  ) {
    const listTemplate = await ctx.prisma.listTemplate.create({
      data: {
        user: {
          connect: { id: ctx.user.id }
        },
        title: data.title,
        todos: {
          create: data.todos.map((todo) => ({
            text: todo,
            user: {
              connect: { id: ctx.user.id }
            }
          }))
        }
      }
    })

    return listTemplate
  }

  @Mutation((returns) => ListTemplate)
  @Authorized<RoleType>(['owner', 'admin'])
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

  @FieldResolver((returns) => User)
  async user (@Root() listTemplate: ListTemplate, @Ctx() ctx: Context) {
    return ctx.prisma.user.findFirst({
      where: { id: listTemplate.userId }
    })
  }
}

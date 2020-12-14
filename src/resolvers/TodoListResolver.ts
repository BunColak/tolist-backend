import { Arg, Authorized, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql'
import { RoleType } from '../auth'
import { Context } from '../context'
import { Todo } from '../models/Todo'
import TodoList, { CreateTodoListFromTemplateInput } from '../models/TodoList'
import TodoTemplate from '../models/TodoTemplate'

@Resolver((of) => TodoList)
export default class TodoListResolver {
  @Query((returns) => [TodoList])
  @Authorized()
  async myTodoLists (@Ctx() ctx: Context) {
    return ctx.prisma.todoList.findMany({ where: { userId: ctx.user.id } })
  }

  @Query((returns) => [TodoList])
  async todoLists (@Ctx() ctx: Context) {
    return ctx.prisma.todoList.findMany()
  }

  @Query((returns) => TodoList)
  async todoList (@Arg('id') id: number, @Ctx() ctx: Context) {
    return ctx.prisma.todoList.findFirst({ where: { id } })
  }

  @Mutation((returns) => TodoList)
  @Authorized()
  async createTodoListFromTemplate (@Arg('data') data: CreateTodoListFromTemplateInput, @Ctx() ctx: Context) {
    const template = data.title
      ? null
      : await ctx.prisma.listTemplate.findFirst({
        where: { id: data.templateId }
      })

    const todoTemplates = await ctx.prisma.todoTemplate.findMany({
      where: { templateId: data.templateId }
    })

    return ctx.prisma.todoList.create({
      data: {
        template: { connect: { id: data.templateId } },
        title: data.title || template.title,
        todos: {
          create: todoTemplates.map((todo) => ({ text: todo.text, user: { connect: { id: ctx.user.id } } }))
        },
        user: {
          connect: {
            id: ctx.user.id
          }
        }
      }
    })
  }

  @Mutation(returns => TodoList)
  @Authorized<RoleType>(['owner', 'admin'])
  async deleteTodoList (@Arg('id') id: number, @Ctx() ctx: Context) {
    await ctx.prisma.todo.deleteMany({ where: { listId: id } })
    return ctx.prisma.todoList.delete({ where: { id } })
  }

  @FieldResolver((returns) => TodoTemplate)
  async template (@Root() todoList: TodoList, @Ctx() ctx: Context) {
    return ctx.prisma.listTemplate.findFirst({
      where: { id: todoList.templateId }
    })
  }

  @FieldResolver((returns) => [Todo])
  async todos (@Root() todoList: TodoList, @Ctx() ctx: Context) {
    return ctx.prisma.todo.findMany({ where: { listId: todoList.id }, orderBy: { completed: 'asc' } })
  }
}

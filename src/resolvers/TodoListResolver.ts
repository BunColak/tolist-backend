import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql'
import { Context } from '../context'
import { Todo } from '../models/Todo'
import TodoList from '../models/TodoList'
import TodoTemplate from '../models/TodoTemplate'

@Resolver((of) => TodoList)
export default class TodoListResolver {
  @Query((returns) => [TodoList])
  async todoLists (@Ctx() ctx: Context) {
    return ctx.prisma.todoList.findMany()
  }

  @Mutation((returns) => TodoList)
  async createTodoListFromTemplate (@Arg('templateId') templateId: number, @Ctx() ctx: Context) {
    const todoTemplates = await ctx.prisma.todoTemplate.findMany({
      where: { templateId }
    })
    return ctx.prisma.todoList.create({
      data: {
        template: { connect: { id: templateId } },
        todos: {
          create: todoTemplates.map((todo) => ({ text: todo.text }))
        }
      }
    })
  }

  @Mutation(returns => TodoList)
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
    return ctx.prisma.todo.findMany({ where: { listId: todoList.id } })
  }
}

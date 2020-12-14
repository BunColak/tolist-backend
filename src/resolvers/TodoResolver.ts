import { Arg, Ctx, Mutation } from 'type-graphql'
import { Context } from '../context'
import { Todo } from '../models/Todo'

export default class TodoResolver {
  @Mutation(returns => Todo)
  async toggleTodo (@Arg('id') id: number, @Ctx() ctx: Context) {
    const todo = await ctx.prisma.todo.findFirst({ where: { id } })
    return ctx.prisma.todo.update({ where: { id }, data: { completed: !todo.completed } })
  }
}

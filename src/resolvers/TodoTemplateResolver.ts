import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { Context } from '../context'
import TodoTemplate, { UpdateTodoTemplateInput } from '../models/TodoTemplate'

@Resolver((of) => TodoTemplate)
export default class TodoTemplateResolver {
  @Mutation((returns) => TodoTemplate)
  async updateTodoTemplate (
    @Arg('data') data: UpdateTodoTemplateInput,
    @Ctx() ctx: Context
  ) {
    return ctx.prisma.todoTemplate.update({
      where: { id: data.id },
      data: { text: data.text }
    })
  }
}

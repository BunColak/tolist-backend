import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql'
import { RoleType } from '../auth'
import { Context } from '../context'
import TodoTemplate, { UpdateTodoTemplateInput } from '../models/TodoTemplate'

@Resolver((of) => TodoTemplate)
export default class TodoTemplateResolver {
  @Mutation((returns) => TodoTemplate)
  @Authorized<RoleType>(['owner', 'admin'])
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

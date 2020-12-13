import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Context } from '../context'
import User, { CreateUserInput, LoginInput, LoginToken } from '../models/User'
import ListTemplate from '../models/ListTemplate'
import TodoList from '../models/TodoList'

@Resolver(of => User)
export default class UserResolver {
  @Query(returns => [User])
  async users (@Ctx() ctx: Context) {
    return ctx.prisma.user.findMany()
  }

  @Query(returns => User)
  async user (@Arg('id') id: number, @Ctx() ctx: Context) {
    return ctx.prisma.user.findFirst({ where: { id } })
  }

  @Mutation(returns => User)
  async createUser (@Arg('data') data: CreateUserInput, @Ctx() ctx: Context) {
    const hashedPassword = await bcrypt.hash(data.password, 10)

    return ctx.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword
      }
    })
  }

  @Mutation(returns => LoginToken)
  async login (@Arg('data') data: LoginInput, @Ctx() ctx:Context) {
    const user = await ctx.prisma.user.findFirst({ where: { username: data.username } })
    if (!user) {
      throw Error('Username or password does not match.')
    }
    const passwordMatch = await bcrypt.compare(data.password, user.password)

    if (!passwordMatch) {
      throw Error('Username or password does not match.')
    }

    const token = jwt.sign({ id: user.id }, 'secret')

    return {
      token,
      user
    }
  }

  @FieldResolver(returns => [ListTemplate])
  async templates (@Root() user: User, @Ctx() ctx: Context) {
    return ctx.prisma.listTemplate.findMany({ where: { userId: user.id } })
  }

  @FieldResolver(returns => [TodoList])
  async lists (@Root() user: User, @Ctx() ctx: Context) {
    return ctx.prisma.todoList.findMany({ where: { userId: user.id } })
  }
}

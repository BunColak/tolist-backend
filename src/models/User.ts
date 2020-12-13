import { Field, InputType, ObjectType } from 'type-graphql'
import ListTemplate from './ListTemplate'
import TodoList from './TodoList'

@ObjectType()
export default class User {
    @Field()
    id: number;

    @Field()
    email: string

    @Field()
    username: string

    @Field()
    password: string

    @Field(type => [TodoList])
    lists: TodoList[]

    @Field(type => [ListTemplate])
    templates: ListTemplate[]
}

@ObjectType()
export class LoginToken {
    @Field()
    token: string

    @Field(type => User)
    user: User
}

@InputType()
export class CreateUserInput {
    @Field()
    username: string

    @Field()
    email: string

    @Field()
    password: string
}

@InputType()
export class LoginInput {
    @Field()
    username: string

    @Field()
    password: string
}

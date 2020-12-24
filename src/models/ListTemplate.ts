import { Field, InputType, ObjectType } from 'type-graphql'
import TodoTemplate from './TodoTemplate'
import User from './User'

@ObjectType()
export default class ListTemplate {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field((type) => [TodoTemplate])
  todos: TodoTemplate[];

  @Field(type => User)
  user: User

  @Field()
  userId: number
}

@InputType()
export class AddListTemplateInput {
  @Field()
  title: string;

  @Field(type => [String])
  todos: string[]
}

@ObjectType()
export class ListTemplateFilter {
}

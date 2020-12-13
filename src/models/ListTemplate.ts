import { Field, InputType, ObjectType } from 'type-graphql'
import TodoTemplate from './TodoTemplate'

@ObjectType()
export default class ListTemplate {
  @Field()
  id: number;

  @Field((type) => [TodoTemplate])
  todos: TodoTemplate[];
}

@InputType()
export class AddListTemplateInput {
    @Field(type => [String])
    todos: string[]
}

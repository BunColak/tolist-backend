import { Field, InputType, ObjectType } from 'type-graphql'
import ListTemplate from './ListTemplate'
import { Todo } from './Todo'

@ObjectType()
export default class TodoList {
  @Field()
  id: number;

  @Field({ nullable: true })
  title: string

  @Field(returns => [Todo])
  todos: Todo[];

  @Field(returns => ListTemplate)
  template: ListTemplate;

  @Field()
  templateId: number;
}

@InputType()
export class CreateTodoListFromTemplateInput {
  @Field({ nullable: true })
  templateId: number;

  @Field({ nullable: true })
  title?: string
}

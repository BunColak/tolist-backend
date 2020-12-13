import { Field, ObjectType } from 'type-graphql'
import ListTemplate from './ListTemplate'
import { Todo } from './Todo'

@ObjectType()
export default class TodoList {
  @Field()
  id: number;

  @Field(returns => [Todo])
  todos: Todo[];

  @Field(returns => ListTemplate)
  template: ListTemplate;

  @Field()
  templateId: number;
}

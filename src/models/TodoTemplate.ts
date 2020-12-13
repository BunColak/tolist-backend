import { Field, InputType, ObjectType } from 'type-graphql'

@ObjectType()
export default class TodoTemplate {
  @Field()
  id: number;

  @Field()
  text: string;
}

@InputType()
export class UpdateTodoTemplateInput {
  @Field()
  id: number;

  @Field()
  text: string
}

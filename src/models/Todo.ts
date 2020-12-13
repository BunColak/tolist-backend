import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Todo {
  @Field()
  id: number;

  @Field()
  text: string;

  @Field()
  completed: boolean;
}

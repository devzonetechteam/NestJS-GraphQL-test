import { ObjectType, Field,  } from "@nestjs/graphql";
import { type } from "os";

@ObjectType()
export class DataDto {
    @Field()
    id: string;
    @Field()
    createdAt: string;
    @Field()
    name: string;
    @Field()
    parentId: string;
    @Field()
    cost: number;
    @Field(() => [DataDto])
    children?: DataDto[];
}
import { Args, Query, Resolver } from '@nestjs/graphql';

import { TravelCostService } from './travel-cost.service';
import { DataDto } from './dto/data.dto';
@Resolver()
export class TravelCostResolver {
    constructor(private readonly travelCostService: TravelCostService){}

    @Query(() => [DataDto])
    async travelCost(@Args('id') id: string): Promise<DataDto[]> {
        const data = await this.travelCostService.companyCostTree(id);
        return data
    }
}
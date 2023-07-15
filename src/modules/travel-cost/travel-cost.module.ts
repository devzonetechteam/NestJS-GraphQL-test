import { Global, Module } from '@nestjs/common';
// import { HttpModule } from '@nestjs/axios';
import { TravelCostService } from './travel-cost.service';
import { TravelCostResolver } from './travel-cost.resolve';

@Global()
@Module({
    imports: [],
    providers: [TravelCostService,
    TravelCostResolver],
    // exports: [TravelCostService],
})
export class TravelCostModule { }

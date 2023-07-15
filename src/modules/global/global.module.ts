import { Global, Module } from '@nestjs/common';
import { GlobalService } from './global.service';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
    imports: [HttpModule],
    providers: [GlobalService],
    exports: [GlobalService],
})
export class GlobalModule { }

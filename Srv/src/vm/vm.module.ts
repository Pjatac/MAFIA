import { Module } from '@nestjs/common';
import { VMGateway } from './vm.gateway';

@Module({
    providers: [ VMGateway ]
})
export class VMModule {}

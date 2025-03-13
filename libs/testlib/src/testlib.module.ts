import { Module } from '@nestjs/common';
import { TestlibService } from './testlib.service';

@Module({
  providers: [TestlibService],
  exports: [TestlibService],
})
export class TestlibModule {}

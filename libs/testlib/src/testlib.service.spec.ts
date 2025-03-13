import { Test, TestingModule } from '@nestjs/testing';
import { TestlibService } from './testlib.service';

describe('TestlibService', () => {
  let service: TestlibService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestlibService],
    }).compile();

    service = module.get<TestlibService>(TestlibService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ShirtsService } from './shirts.service';

describe('ShirtsService', () => {
  let service: ShirtsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShirtsService],
    }).compile();

    service = module.get<ShirtsService>(ShirtsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

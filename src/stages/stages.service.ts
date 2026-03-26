import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stage } from './entities/stage.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StagesService {
  constructor(
    @InjectRepository(Stage)
    private readonly stageRepository: Repository<Stage>,
  ) {}

  create(dto: any) {
    const stage = this.stageRepository.create(dto);
    return this.stageRepository.save(stage);
  }

  findAll() {
    return this.stageRepository.find({ order: { name: 'ASC' } });
  }

  async remove(id: number) {
    const stage = await this.stageRepository.findOne({ where: { id } });
    if (!stage) throw new NotFoundException();
    return this.stageRepository.remove(stage);
  }
}

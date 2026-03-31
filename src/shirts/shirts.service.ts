import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Shirt } from './entities/shirt.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ShirtsService {
  constructor(
    @InjectRepository(Shirt)
    private shirtRepository: Repository<Shirt>,
  ) {}

  async create(createShirtDto: any, user: User) {
    const shirt = this.shirtRepository.create({
      ...createShirtDto,
      givenOut: false,
      user: user,
    });
    return await this.shirtRepository.save(shirt);
  }

  async findAllByUser(user: User) {
    return await this.shirtRepository.find({
      where: { user: { id: user.id } },
    });
  }

  async findAll() {
    return await this.shirtRepository.find({
      relations: ['user'],
      order: { createdAt: 'DESC'}
    });
  }

  async update(id: string, updateData: Partial<Shirt>) {
    await this.shirtRepository.update(id, updateData);
    return this.shirtRepository.findOne({ where: { id }});
  }

  async giveOut(id: string) {
    const shirt = await this.shirtRepository.findOne({ where: { id } });

    if (!shirt) throw new NotFoundException('Shirt not found');
    if (shirt.givenOut) throw new BadRequestException('Shirt already given out');

    shirt.givenOut = true;
    return await this.shirtRepository.save(shirt);
  }
}

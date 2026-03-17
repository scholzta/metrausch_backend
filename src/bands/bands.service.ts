import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Band } from "./entities/band.entity";
import { CreateBandDto } from "./dto/create-band.dto";

@Injectable()
export class BandsService {
  constructor(
    @InjectRepository(Band)
    private readonly bandRepository: Repository<Band>,
  ) {}

  async create (CreateBandDto: CreateBandDto, imageUrl?: string): Promise<Band> {
    const band = this.bandRepository.create({
      ...CreateBandDto,
      imageUrl,
    });
    return await this.bandRepository.save(band);
  }

  async findAll(): Promise<Band[]> {
    return await this.bandRepository.find({
      order: { name: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Band> {
    const band = await this.bandRepository.findOne({ where: { id } });
    if (!band) throw new NotFoundException(`Band with ID ${id} not found`);
    return band;
  }

  async update(id: number, updateData: Partial<Band>): Promise<Band> {
    const band = await this.findOne(id);
    Object.assign(band, updateData);
    return await this.bandRepository.save(band);
  }

  async remove(id: number): Promise<void> {
    const band = await this.findOne(id);
    await this.bandRepository.remove(band);
  }
}

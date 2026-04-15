import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Band } from "./entities/band.entity";
import { CreateBandDto } from "./dto/create-band.dto";
import { join } from "path";
import * as fs from 'fs';

@Injectable()
export class BandsService {
  constructor(
    @InjectRepository(Band)
    private readonly bandRepository: Repository<Band>,
  ) {}

  // async create (CreateBandDto: CreateBandDto, imageUrl?: string): Promise<Band> {
  //   const band = this.bandRepository.create({
  //     ...CreateBandDto,
  //     imageUrl,
  //   });
  //   return await this.bandRepository.save(band);
  // }
  async create(data: any) {
    const band = new Band();
    band.name = data.name;
    band.sub = data.sub;
    band.genre = data.genre;
    band.description = data.description;
    band.imageUrl = data.imageUrl;

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
    await this.bandRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const band = await this.bandRepository.findOne({ where: { id } });

    if (!band) {
      throw new NotFoundException('Band not found');
    }

    if (band.imageUrl) {
      const filePath = join(process.cwd(), 'public', band.imageUrl);

      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Failed to delete image')
        } else {
          console.log("Successfully deleted image")
        }
      })
    }
    await this.bandRepository.remove(band);
  }
}

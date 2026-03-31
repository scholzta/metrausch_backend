import { Injectable, NotFoundException } from '@nestjs/common';
import { Faq } from './entities/faq.entity';
import { Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FaqService {
  constructor(
    @InjectRepository(Faq)
    private readonly faqRepository: Repository<Faq>,
  ) {}

  async create(data: any) {
    const faq = new Faq();
    faq.question = data.question;
    faq.answer = data.answer;

    return await this.faqRepository.save(faq);
  }

  async findAll(): Promise<Faq[]> {
    return await this.faqRepository.find();
  }

  async findUnanswered(): Promise<Faq[]> {
     return await this.faqRepository.createQueryBuilder('faq')
      .where('faq.answer = ""')
      .getMany();
  }
  async findAnswered(): Promise<Faq[]> {
     return await this.faqRepository.createQueryBuilder('faq')
      .where('faq.answer != ""')
      .getMany();
  }

  async findOne(id: number): Promise<Faq> {
    const faq = await this.faqRepository.findOne({ where: { id } });
    if (!faq) throw new NotFoundException(`Faq with ID ${id} not found`);
    return faq;
  }

  async update(id: number, updateData: Partial<Faq>): Promise<Faq> {
    const faq = await this.findOne(id);
    Object.assign(faq, updateData);
    return await this.faqRepository.save(faq);
  }

  async remove(id: number): Promise<void> {
    const faq = await this.faqRepository.findOne({ where: { id } });

    if (!faq) {
      throw new NotFoundException('Faq not found');
    }
    await this.faqRepository.remove(faq);
  }

}

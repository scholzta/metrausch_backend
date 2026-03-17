import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {}

  async create(createTicketDto: CreateTicketDto, user: User) {
    const ticket = this.ticketRepository.create({
      ...createTicketDto,
      user: user,
    });
    return await this.ticketRepository.save(ticket);
  }

  async findAllByUser(user: User) {
    return await this.ticketRepository.find({
      where: { user: { id: user.id } },
    });
  }

  async findAll() {
    return await this.ticketRepository.find({
      relations: ['user'],
      order: { createdAt: 'DESC'}
    });
  }

  async update(id: string, updateData: Partial<Ticket>) {
    await this.ticketRepository.update(id, updateData);
    return this.ticketRepository.findOne({ where: { id }});
  }
}

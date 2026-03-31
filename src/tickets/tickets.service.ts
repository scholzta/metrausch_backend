import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { User } from 'src/users/entities/user.entity';
import { PromoCode } from 'src/promo-code/entities/promo-code.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
    @InjectRepository(PromoCode)
    private codeRepository: Repository<PromoCode>
  ) {}

  async create(createTicketDto: any, user: User) {
    if (createTicketDto.promoCode) {
      const code =  await this.codeRepository.createQueryBuilder('promo_codes')
      .where('promo_codes.secret = :secret', { secret: createTicketDto.promoCode})
      .getOne();

      if (code) {
        if (code.usedCount >= code.usageLimit) return new BadRequestException("Code is invalid")
        createTicketDto.price = createTicketDto.price - (createTicketDto.price /100 * code.discountPercent)
        code.usedCount += 1;
        this.codeRepository.update(code.id, code)
      }
    }

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

  async remove(id: string) {
    const ticket = await this.ticketRepository.findOne({ where: { id } });
    if (!ticket) throw new NotFoundException();
    return this.ticketRepository.remove(ticket);
  }

  async update(id: string, updateData: Partial<Ticket>) {
    await this.ticketRepository.update(id, updateData);
    return this.ticketRepository.findOne({ where: { id }});
  }

  async checkIn(id: string) {
    const ticket = await this.ticketRepository.findOne({ where: { id } });

    if (!ticket) throw new NotFoundException('Ticket not found');
    if (ticket.arrived) throw new BadRequestException('Ticket already used');

    ticket.arrived = true;
    return await this.ticketRepository.save(ticket);
  }
}

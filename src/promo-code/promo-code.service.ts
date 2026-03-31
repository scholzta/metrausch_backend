import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PromoCode } from './entities/promo-code.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PromoCodeService {
  constructor(
    @InjectRepository(PromoCode)
    private codeRepository: Repository<PromoCode>,
  ) {}

  async create(createPromoCodeDto: any, user: User) {
    const secret = generateRandomString(8);
    const code = this.codeRepository.create({
      ...createPromoCodeDto,
      secret: secret,
      user: user,
    });
    return await this.codeRepository.save(code);
  }

  async findAll() {
    return await this.codeRepository.find();
  }

  async update(id: string, updateData: Partial<PromoCode>) {
    await this.codeRepository.update(id, updateData);
    return this.codeRepository.findOne({ where: { id }});
  }

  async delete(id: string) {
    return await this.codeRepository.delete(id);
  }


  async useCode(id: string) {
    const code = await this.codeRepository.findOne({ where: { id } });

    if (!code) throw new NotFoundException('Code not found');
    if (code.usedCount >= code.usageLimit) throw new BadRequestException('Code has already been used');

    code.usedCount += 1;
    return await this.codeRepository.save(code);
  }

  async validateTicketCode(secret: string) {
    const code =  await this.codeRepository.createQueryBuilder('promo_codes')
    .where('promo_codes.secret = :secret', { secret: secret})
    .getOne();

    if (!code) throw new NotFoundException();
    if (!code.allowTicket) throw new BadRequestException('Code is not elligable for a ticket discount')
    if (code.usedCount >= code.usageLimit) throw new BadRequestException('The usage limit of the code is reached')

    return code.discountPercent;
  }

}


function generateRandomString(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}   

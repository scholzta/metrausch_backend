import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { User } from "src/users/entities/user.entity";

@Entity('promo_codes')
export class PromoCode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  owner: string;

  @Column({unique: true})
  secret: string;

  @Column({ unique: true})
  code: string;

  @Column('int', { default: 1})
  usageLimit: number;

  @Column('int', { default: 0 })
  usedCount: number;

  @Column({ default: false })
  allowTicket: boolean;

  @Column({ default: false })
  allowShirt: boolean;

  @Column({ default: false })
  allowCatering: boolean;

  @Column({ default: false })
  discountPercent: number;
}

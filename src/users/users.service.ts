import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserRole } from './enums/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    const existingUser = await this.usersRepository.findOne({ 
      where: { email: userData.email } 
    });
    
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Explicitly handle the password hashing
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userData.password!, salt); 
    console.log("!!!!!!!!!!!!!!")
    console.log(userData)

    const newUser = this.usersRepository.create({
      ...userData,
      password: hashedPassword,
      hasAccepterNewsletter: false,
    });

    const savedUser = await this.usersRepository.save(newUser);
    
    // Using destructuring to remove password safely
    const { password, ...result } = savedUser;
    return result as User;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ 
      where: { email },
      select: ['id', 'email', 'password', 'role', 'firstName'] 
    });
  }

  async updateRole(id: number, role: string) {
    return await this.usersRepository.update(id, { role: role as UserRole });
  }

  async findAll() {
    return await this.usersRepository.find({
      select: ['id', 'email', 'firstName', 'lastName', 'role', 'createdAt'],
    });
  }
}

import { Controller, Get, Param, Body, Patch, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    if (req.user.role !== 'admin') throw new UnauthorizedException('Admins only');
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/role')
  async updateRole(@Param('id') id: number, @Body('role') role: string, @Request() req) {
    if (req.user.role !== 'admin') throw new UnauthorizedException('Admins only');
    return this.usersService.updateRole(id, role)
  }

}


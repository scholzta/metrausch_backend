import { Controller, Post, UseGuards, Body, Get, Patch, Request, Param, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { ShirtsService } from './shirts.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('shirts')
export class ShirtsController {
  constructor(private readonly shirtsService: ShirtsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createShirtDto: any, @Request() req) {
    return this.shirtsService.create(createShirtDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-shirts')
  getUserShirts(@Request() req) {
    return this.shirtsService.findAllByUser(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAllShirts(@Request() req) {
    if (req.user.role === 'user') throw new UnauthorizedException();
    return this.shirtsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateShirt(@Param('id') id: string, @Body() updateData: any, @Request() req) {
    if (req.user.role === 'user') throw new UnauthorizedException();
    return this.shirtsService.update(id, updateData);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/check-in')
  async handleCheckIn(@Param('id') id: string, @Request() req) {
    if (req.user.role !== 'admin') throw new ForbiddenException();

    return this.shirtsService.giveOut(id);
  }
}

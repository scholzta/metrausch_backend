import { Controller, UseGuards, Post, Get, Body, Request, Param, Patch, UnauthorizedException, ForbiddenException, Delete } from '@nestjs/common';
import { PromoCodeService } from './promo-code.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('promo-code')
export class PromoCodeController {
  constructor(private readonly codeService: PromoCodeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCodeDto: any, @Request() req) {
    return this.codeService.create(createCodeDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllCodes(@Request() req) {
    if (req.user.role !== 'admin') throw new UnauthorizedException();
    return this.codeService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteCode(@Param('id') id: string, @Request() req) {
    if (req.user.role !== 'admin') throw new ForbiddenException();
    return this.codeService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateCode(@Param('id') id: string, @Body() updateData: any, @Request() req) {
    if (req.user.role === 'user') throw new UnauthorizedException();
    return this.codeService.update(id, updateData);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/use-code')
  async handleUseCode(@Param('id') id: string, @Request() req) {
    if (req.user.role !== 'admin') throw new ForbiddenException();

    return this.codeService.useCode(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('validate')
  async validateTicketCode(@Body() codeDto: any) {
    return this.codeService.validateTicketCode(codeDto.code);
  }
}

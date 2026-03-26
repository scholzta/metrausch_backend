import { Body, Post, Get, Request, Controller, UseGuards, UnauthorizedException, Patch, Param, ForbiddenException } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTicketDto: CreateTicketDto, @Request() req) {
    return this.ticketsService.create(createTicketDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-tickets')
  getUserTickets(@Request() req) {
    return this.ticketsService.findAllByUser(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAllTickets(@Request() req) {
    if (req.user.role === 'user') throw new UnauthorizedException();
    return this.ticketsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateTicket(@Param('id') id: string, @Body() updateData: any, @Request() req) {
    if (req.user.role === 'user') throw new UnauthorizedException();
    return this.ticketsService.update(id, updateData);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/check-in')
  async handleCheckIn(@Param('id') id: string, @Request() req) {
    if (req.user.role !== 'admin') throw new ForbiddenException();

    return this.ticketsService.checkIn(id);
  }
}

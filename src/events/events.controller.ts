import { Body, Controller, Delete, ForbiddenException, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get('public-schedule')
  findAll() {
    return this.eventsService.getFullSchedule();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createEventDto: any, @Request() req) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException('Only admins can modify the schedule');
    }
    return this.eventsService.create(createEventDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.eventsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number, @Request() req) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException();
    }
    return this.eventsService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDto: any, @Request() req) {
    if (req.user.role !== 'admin') throw new ForbiddenException();
    return this.eventsService.update(id, updateDto);
  }


}

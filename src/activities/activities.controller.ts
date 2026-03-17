import { 
  Controller, 
  Get, 
  Post, 
  Patch, 
  Delete, 
  Body, 
  Param, 
  UseGuards, 
  Request, 
  ParseIntPipe, 
  ForbiddenException 
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}
  @Get()
  async findPublic() {
    return this.activitiesService.findPublic();
  }
  @UseGuards(JwtAuthGuard)
  @Get('my-activities')
  async getMyActivities(@Request() req) {
    return this.activitiesService.findByOrganizer(req.user.id);
  }
  @UseGuards(JwtAuthGuard)
  @Post('suggest')
  async suggestNew(@Body() createDto: any, @Request() req) {
    return this.activitiesService.suggestNew(createDto, req.user);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id/suggest-update')
  async suggestUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: any,
    @Request() req
  ) {
    return this.activitiesService.suggestUpdate(id, updateDto, req.user);
  }
  @UseGuards(JwtAuthGuard)
  @Get('pending')
  async getPending(@Request() req) {
    if (req.user.role === 'user') throw new ForbiddenException('Admins/Moderators only');
    // You'll need to add a findPending() method to your service
    return this.activitiesService.findPending(); 
  }
  @UseGuards(JwtAuthGuard)
  @Post(':id/approve')
  async approve(@Param('id', ParseIntPipe) id: number, @Request() req) {
    if (req.user.role === 'user') throw new ForbiddenException('Admins/Moderators only');
    return this.activitiesService.approve(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    if (req.user.role === 'user') throw new ForbiddenException('Admins/Moderators only');
    // Standard delete logic
    return this.activitiesService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin-all')
  async findAllAdmin(@Request() req) {
    if (req.user.role === 'user') throw new ForbiddenException();
    return this.activitiesService.findAllForAdmin();
  }
}

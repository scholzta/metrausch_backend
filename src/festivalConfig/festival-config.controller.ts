import { Body, Controller, Delete, Get, Param, Patch, UseGuards, Request, ForbiddenException } from "@nestjs/common";
import { FestivalConfigService } from "./festival-config.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller('festival-info')
export class FestivalConfigController {
  constructor(private readonly service: FestivalConfigService) {}

  @Get()
  getFestivalInfo() {
    return this.service.getConfig();
  }

  @Patch('update')
  @UseGuards(JwtAuthGuard)
  updateInfo(@Body() body: any) {
    return this.service.updateConfig(body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('clear/:target')
  async clearTable(@Param('target') target: string, @Request() req) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException('Only admins can perform bulk deletion');
    }

    const result = await this.service.deleteAll(target);
    return {
      message: 'Successfully cleared',
      affectedRows: result.affected
    }
  }

}

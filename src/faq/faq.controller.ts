import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { FaqService } from './faq.service';
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {};


  @Get()
  findAll() {
    return this.faqService.findAll();
  }

  @Get('unanswered')
  findUnanswered() {
    return this.faqService.findUnanswered();
  }

  @Get('answered')
  findAnswered() {
    return this.faqService.findAnswered();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.faqService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createFaqDto: any) {
    return this.faqService.create({ ...createFaqDto });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFaqDto: any,
  ) {
    const updateData = { ...updateFaqDto };
    return this.faqService.update(+id, updateData);
  }

}

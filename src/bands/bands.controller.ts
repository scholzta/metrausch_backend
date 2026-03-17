import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { BandsService } from "./bands.service";

@Controller('bands')
export class BandsController {
  constructor(private readonly bandsService: BandsService) {}

  @Get()
  findAll() {
    return this.bandsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bandsService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './public/uploads/bands',
      filename: (req, file,cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        return cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  create(@Body() createBandDto: any, @UploadedFile() file: Express.Multer.File) {
    const imageUrl = file ? `/uploads/bands/${file.filename}` : null;
    return this.bandsService.create({ ...createBandDto, imageUrl });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: string,
    @Body() updateBandDto: any,
    @UploadedFile() file: Express.Multer.File
  ) {
    const updateData = { ...updateBandDto };
    if (file) {
      updateData.imageUrl = `/uploads/bands/${file.filename}`;
    }
    return this.bandsService.update(+id, updateData);
  }
}

import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { PrismaService } from '../prisma/prisma.service';
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [FileUploadController],
  providers: [FileUploadService, PrismaService],
  exports: [FileUploadService],
})
export class FileUploadModule {}

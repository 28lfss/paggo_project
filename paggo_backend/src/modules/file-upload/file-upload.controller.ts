import {
    Controller, FileTypeValidator,
    MaxFileSizeValidator, Param, ParseFilePipe,
    Post,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('api/file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post(':username')
  @UseInterceptors(FileInterceptor('file'))
  uploadInvoice(@Param('username') username: string,
      @UploadedFile(
      new ParseFilePipe({
        validators: [
            new MaxFileSizeValidator({maxSize: (2 * 1024 * 1024)}), // File measured in bytes, expression that calculate in 2MB
            new FileTypeValidator({fileType: 'pdf'}),
        ],
      }),) file: Express.Multer.File,) {
    return this.fileUploadService.uploadInvoice(file, username);
  }
}
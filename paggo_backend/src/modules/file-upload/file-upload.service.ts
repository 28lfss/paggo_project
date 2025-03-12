import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as pdfParse from 'pdf-parse';
import * as fs from 'fs';

@Injectable()
export class FileUploadService {
    constructor(private prisma: PrismaService) {}

    async uploadInvoice(file: Express.Multer.File, username: string) {
        const user = await this.prisma.user.findUnique({
            where: {username: username},
            select: {id:true}
        });
        const pdfBuffer = fs.readFileSync(file.path);
        const parsedPdf = await pdfParse(pdfBuffer);
        const ocrText = parsedPdf.text.trim();

        if (!user) return null

        await this.prisma.invoice.create({
            data: {
                path: file.path,
                ocr: ocrText,
                explanation: "", // AI-generated text
                user_id: user?.id,
            },
        });

        return { ocr: ocrText };
    }
}
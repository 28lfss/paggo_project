import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import { GeminiService } from './gemini.service';

@Controller('api/gemini')
export class GeminiController {
    constructor(private readonly geminiService: GeminiService) {}

    @Post('generate')
    async generate(@Body('ocr') ocrText: string) {
        return this.geminiService.generateText(ocrText);
    }
}

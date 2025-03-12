import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GeminiService {
    private genAI: GoogleGenerativeAI;
    private geminiModel = 'gemini-2.0-flash';

    constructor(private configService: ConfigService) {
        const apiKey = this.configService.get<string>('GEMINI_API_KEY');
        if (apiKey !== undefined) {
            this.genAI = new GoogleGenerativeAI(apiKey);
        } else {
            throw new Error('GEMINI_API_KEY is missing!');
        }
    }

    async generateText(ocrText: string): Promise<string> {
        try {
            const model = this.genAI.getGenerativeModel({ model: this.geminiModel });
            const result = await model.generateContent(ocrText);
            return result.response.text();
        } catch (error) {
            console.error('Error generating text:', error);
            throw new Error('Failed to generate text');
        }
    }
}

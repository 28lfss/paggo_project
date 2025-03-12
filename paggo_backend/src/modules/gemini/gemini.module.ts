import { Module } from '@nestjs/common';
import {GeminiService} from "./gemini.service";
import {PrismaService} from "../prisma/prisma.service";
import {GeminiController} from "./gemini.controller";
import {ConfigModule} from "@nestjs/config";

@Module({
    controllers: [GeminiController],
    providers: [GeminiService, PrismaService],
    exports: [GeminiService],
    imports: [ConfigModule]
})
export class GeminiModule {}

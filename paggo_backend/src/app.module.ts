import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { PrismaService } from './modules/prisma/prisma.service';

import { UserModule } from './modules/user/user.module';
import { FileUploadModule } from './modules/file-upload/file-upload.module';
import { GeminiModule } from './modules/gemini/gemini.module';
import { GeminiService } from './modules/gemini/gemini.service';
import { GeminiController } from './modules/gemini/gemini.controller';

@Module({
  imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      GeminiModule,
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true,
        synchronize: true,
      }),
      UserModule,
      FileUploadModule,
      GeminiModule,
  ],
  controllers: [AppController, GeminiController],
  providers: [AppService, PrismaService, GeminiService],
})
export class AppModule {}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  private saltRounds = 10;

  async createUser(data: Prisma.UserCreateInput): Promise<string> {
    data.password = await this.hashPassword(data.password);
    await this.prisma.user.create({ data });
    return 'User created successfully.';
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async getAllUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
      },
    });
  }

  async getUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });
  }

  async updateUser(id: number, data: Prisma.UserUpdateInput) {
    if (typeof data.password == 'string') {
      data.password = await this.hashPassword(data.password);
    }
    this.prisma.user.update({
      where: { id },
      data,
    });

    return { message: 'User updated successfully.' };
  }

  async deleteUser(id: number) {
    await this.prisma.user.delete({ where: { id } });
    return { message: 'User deleted successfully.' };
  }

  async checkUsername(username: string) {
    const user = await this.prisma.user.findUnique({ where: { username } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'User already exist' };
  }

  async checkEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Email already exist' };
  }

  async validateUser(username: string, password: string) {
    const user = await this.prisma.user.findUnique({where: {username}})
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const validatePassword = await bcrypt.compare(password, user.password)
    if (!validatePassword) throw new HttpException("Password don't match", HttpStatus.UNAUTHORIZED);

    return { message: 'Logged in' };
  }

  async getUserInvoices(id: number) {
      return this.prisma.user.findUnique({
          where: {id},
          select: {invoices: true},
      })
  }
}

import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put} from '@nestjs/common';
import {UserService} from "./user.service";
import {Prisma} from "@prisma/client";
import {ValidateUserDto} from "./dto/validate-user.dto";

@Controller('api/user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post()
    async createUser(@Body() data: Prisma.UserCreateInput): Promise<String> {
        return this.userService.createUser(data)
    }

    @Get()
    async getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get(':id')
    async getUserById(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getUserById(id);
    }

    @Put(':id')
    async updateUser(@Param('id', ParseIntPipe) id: number, @Body() data: Prisma.UserUpdateInput) {
        return this.userService.updateUser(id, data);
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.deleteUser(id);
    }

    @Get('check-username/:username')
    async checkUsername(@Param('username') username: string) {
        return this.userService.checkUsername(username);
    }

    @Get('check-email/:email')
    async checkEmail(@Param('email') email: string) {
        return this.userService.checkEmail(email);
    }

    @Post('validate-user')
    async validateUser(@Body() data: ValidateUserDto) {
        return this.userService.validateUser(data.username, data.password   );
    }

    @Get(':id/invoices')
    async getInvoices(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getUserInvoices(id);
    }
}
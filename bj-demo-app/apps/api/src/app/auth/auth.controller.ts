import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiBearerAuth()
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Get auth/login' })
  @ApiResponse({
    status: 200,
    description: 'Authorization successful',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
    type: Error,
  })
  async login(@Request() req) {
    const access_token = await this.authService.login(req.user);
    return access_token;
  }

  @Post('logout')
  @ApiOperation({ summary: 'Get auth/logout' })
  @ApiResponse({
    status: 200,
    description: 'Logout completed successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
    type: Error,
  })
  async logout() {
    return true;
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  @ApiOperation({ summary: 'Get auth/user' })
  @ApiResponse({
    status: 200,
    description: 'User successfully received',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
    type: Error,
  })
  getProfile(@Request() req) {
    const user = {
      id: req.user.id,
      firstName: req.user.firstName,
      middleName: req.user.middleName,
      lastName: req.user.lastName,
      email: req.user.email,
      role: req.user.role,
    };
    return user;
  }
}

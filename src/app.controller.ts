import { Controller, Get, Query, Post, Body, Render, UseGuards, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggedInGuard } from './auth/logged-in.guard';


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {}

  @Get()
  @Render('index')
  showindexPage(){
    return;
  }

  @Get('mypage')
  @UseGuards(LoggedInGuard)
  @Render('mypage')
  async myPage(@Req() req) {
    const { user } = req;
    return { user };
  }

  @Get('/init')
  async init(
    @Query('user') user: string,
    @Query('userval') userval: string,
  ): Promise<string> {
    return this.appService.init(user, userval);
  }

  @Get('/invoke')
  async invoke(
    @Query('sender') sender: string,
    @Query('reciever') reciever: string,
    @Query('value') value: string,
  ): Promise<string> {
    return this.appService.invoke(sender, reciever, value);
  }

  @Get('/query')
  async query(
    @Query('name') name: string,
  ): Promise<string> {
    return this.appService.query(name);
  }

  @Get('/delete')
  async delete(
    @Query('name') name: string,
  ): Promise<string> {
    return this.appService.delete(name);
  }
}
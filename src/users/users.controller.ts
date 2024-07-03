import { Body, Controller, Get, Post, Req, Res, UseGuards, Render} from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from '../common/decorators/users.decorator';
import { localAuthGuard } from '../auth/local-auth.guard';
import { LoggedInGuard } from '../auth/logged-in.guard';
import { send } from '../util/connectFabric';

@Controller('users')
export class UsersController {
    constructor(private UsersService:UsersService){}

    @Post('join')
    async Join(@Body() body){
        if (body.id.startsWith('seller_')) {
            await this.UsersService.Join(body.id, body.password, body.name);
            let userval: string = '0';
            const args = [body.id, userval];
            await send(false, 'init', args);
        } else {
            await this.UsersService.Join(body.id, body.password, body.name);
            let userval: string = '100000';
            const args = [body.id, userval];
            await send(false, 'init', args);
        }
    }

    @UseGuards(localAuthGuard)
    @Post('login')
    logIn(@Users() user){
        return user
    }

    @UseGuards(LoggedInGuard)
    @Get('logout')
    async logOut(@Req() req, @Res() res) {
        await new Promise<void>((resolve, reject) => {
        req.logout((err) => {
            if (err) {
            reject(err);
            } else {
            resolve();
            }
        });
        });

        res.clearCookie('connect.sid', { httpOnly: true });
        res.redirect('/'); 
        }
}
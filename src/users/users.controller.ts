import { Body, Controller, Get, Post, Req, Res, UseGuards, Render} from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from '../common/decorators/users.decorator';
import { localAuthGuard } from '../auth/local-auth.guard';
import { LoggedInGuard } from '../auth/logged-in.guard';

@Controller('users')
export class UsersController {
    constructor(private UsersService:UsersService){}

    @Post('join')
    async Join(@Body() body){
        await this.UsersService.Join(body.id, body.password, body.name);
    }

    @UseGuards(localAuthGuard)
    @Post('login')
    logIn(@Users() user){
        return user
    }

    @UseGuards(LoggedInGuard)
    @Post('logout')
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
        res.send('OK');
        }
}
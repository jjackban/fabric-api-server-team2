import { Injectable, UnauthorizedException, Logger } from "@nestjs/common";
import { Strategy } from 'passport-local';
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService:AuthService){
        super({usernameField:'id', passwordField:'password'});
    }
    async validate(id:string, password:string, done:CallableFunction){
        
        const user = await this.authService.validateUser(id, password);
        if(!user){
            throw new UnauthorizedException(); 
        }
        return done(null, user); 
    }
}
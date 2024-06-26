import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalSerializer extends PassportSerializer{
    constructor(
        private readonly authService:AuthService,
        @InjectRepository(User) private userRepository:Repository<User>
    ){
        super();
    }

    serializeUser(user: User, done: CallableFunction){
        console.log(user);
        done(null, user.id)
    }    

    async deserializeUser(userId: string, done: CallableFunction){
        return await this.userRepository.findOneOrFail(
            {
                where: {
                    id : userId,
                },
                select: ['id', 'name'],
            })
        .then((user)=>{
            console.log('user: ',user);
            done(null, user);
        })
        .catch((error)=>done(error))
    }
}
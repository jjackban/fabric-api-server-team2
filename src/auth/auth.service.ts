import { Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService{
    constructor(@InjectRepository(User) private usersRepository:Repository<User>){}

    async validateUser(id:string, password:string){
        const user=await this.usersRepository.findOne({
            where:{id},
        });
        if(!user){
            return null;
        }
        const result = await bcrypt.compare(password, user.password);
        if(result){
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }
        return null;
    }
}
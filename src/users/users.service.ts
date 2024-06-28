import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ){}

    async Join(id:string, password:string, name:string){
        const newuser = await this.usersRepository.findOne({where:{id}});
        if(newuser){
            throw new UnauthorizedException('이미 존재하는 사용자입니다.')
            return;
        }else{
            const hashedpassword = await bcrypt.hash(password, 10);
            await this.usersRepository.save({
                id,
                password:hashedpassword,
                name,
            })
        }     
    }
}
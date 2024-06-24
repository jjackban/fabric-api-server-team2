import { Injectable } from '@nestjs/common';
import { send } from './util/connectFabric';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async init(user:string, userval:string) {
    const args = [user, userval];
    return await send(false, 'init', args);
  }

  async invoke(sender:string, reciever:string, value:string) {
    const args = [sender, reciever, value];
    return await send(false, 'invoke', args);
  }

  async query(name:string) {
    const args = [name];
    return await send(true, 'query', args);
  }

  async delete(name:string) {
    const args = [name];
    return await send(false, 'delete', args);
  }
}
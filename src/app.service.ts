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

  async initItem(itemName:string, styleNum:string, brand:string, inventory:string) {
    const args = [itemName, styleNum, brand, inventory];
    return await send(false, 'initItem', args);
  }

  async charge(user:string, userval:string) {
    const args = [user, userval];
    return await send(false, 'charge', args);
  }

  async purchaseItem(user:string, itemId:string) {
    const args = [user, itemId];
    return await send(false, 'purchaseItem', args);
  }

  async invoke(sender:string, reciever:string, value:string) {
    const args = [sender, reciever, value];
    return await send(false, 'invoke', args);
  }

  async query(name:string) {
    const args = [name];
    return await send(true, 'query', args);
  }

  async queryitem(itemId:string) {
    const args = [itemId];
    return await send(true, 'queryitem', args);
  }

  async querypurchase(user:string) {
    const args = [user];
    return await send(true, 'querypurchase', args);
  }

  async delete(name:string) {
    const args = [name];
    return await send(false, 'delete', args);
  }
}
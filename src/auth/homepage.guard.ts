import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class homepaGeGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();

    // 사용자가 로그인되어 있지 않은 경우에도 허용하도록 설정
    // 실제로는 세션 유효성을 검사하거나 특정 조건을 추가할 수 있습니다.
    if (!request) {
      return true; // 세션이 없어도 허용
    }

    return true; // 세션이 있어도 허용
  }
}
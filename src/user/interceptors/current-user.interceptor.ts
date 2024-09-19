import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';

import { UserService } from '../user.service';
import { Observable } from 'rxjs';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UserService) {}

  async intercept(
    context: ExecutionContext,
    handler: CallHandler<any>,
  ){
    const reqeust = context.switchToHttp().getRequest();
    const { userId } = reqeust.session || {};

    if (userId) {
      const user = await this.userService.findUserById(userId);
      reqeust.currentUser = user;
    }

    return handler.handle();
  }
}

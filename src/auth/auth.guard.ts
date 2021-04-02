import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { AllowedRoles } from './role.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<AllowedRoles>(
      'roles',
      context.getHandler(),
    );
    //metadata값 불러오기

    if (!roles) {
      return true;
    }
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const user: User = gqlContext['user'];
    if (!user) {
      return false;
    }
    if (roles.includes('Any')) {
      return true;
    }

    return roles.includes(user.role);
    // roles의 Array 안에 user.role이 있냐없냐 => boolean
  }
}

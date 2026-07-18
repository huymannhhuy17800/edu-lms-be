import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRole } from "../enums/roles.enum";
import { ROLES_KEY } from "../decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private reflector : Reflector){}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
            ROLES_KEY,[context.getHandler(), context.getClass()]
        );
        if(!requiredRoles || requiredRoles.length == 0) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if(!user) {
            throw new UnauthorizedException('User authentication context missing')
        }

        return this.matchRoles(requiredRoles, user.roles);
    }

    private matchRoles(requiredRoles : UserRole[], userRole: UserRole | UserRole[]) {
        if(Array.isArray(userRole)) {
            return requiredRoles.some((role) => userRole.includes(role));
        }

        // Optimized for O(1) checking if requiredRoles list grows long in complex modules
        return requiredRoles.includes(userRole)
    }

}
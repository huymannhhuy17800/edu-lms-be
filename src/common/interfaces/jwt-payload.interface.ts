import { UserRole } from "../enums/roles.enum";

export interface JwtPayload {
    sub: string,
    roles: UserRole[],
    email? : string
}

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "src/common/interfaces/jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private configService : ConfigService){
        const jwtSecret = configService.get<string>('JWT_SECRET');
        if(!jwtSecret) {
            throw new Error('JWT_SECRET key missing in environment configuration')
        }
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtSecret
        })
    }

    async validate(payload: JwtPayload) {
        return {
            id: payload.sub,
            email: payload.email,
            roles: payload.roles
        }
    }
}
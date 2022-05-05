import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { User } from "@prisma/client";
import { Strategy, ExtractJwt } from 'passport-jwt'
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    
    constructor(private readonly userService: UserService) {
        super({
           jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
           secretOrKey: process.env.JWT_SECRET 
        });
    }

    async validate(payload: any): Promise<User> {
        const user: User = await this.userService.getOne({
            where: { id: payload.sub },
            include: {
                profile: {
                    include: { 
                        publications: true,
                        likes: true
                    }
                }
            }
        });

        delete user.password;
        return user;
    }
}
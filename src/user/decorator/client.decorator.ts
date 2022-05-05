import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "@prisma/client";

export const Client = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request: any = ctx.switchToHttp().getRequest();
        const user: User = request.user;
        return (data)? user[data] : user;
    }
);
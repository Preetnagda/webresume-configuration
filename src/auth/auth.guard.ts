import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { KeyService } from "src/key/key.service";
import { GetAuth } from "./dto/get-auth.dto";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private readonly jwtService: JwtService, private readonly keyService: KeyService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const publicKey = await this.keyService.getPublicKey();
            const payload: GetAuth = await this.jwtService.verifyAsync(
                token,
                {
                secret: publicKey
                }
            );
            
            request.body['auth'] = payload;
        } catch{
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
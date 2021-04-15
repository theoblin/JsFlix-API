import { Module } from '@nestjs/common';
import{ JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config"
import { AuthService } from "../service/auth.service";

@Module({
    imports:[
        JwtModule.registerAsync(
            {
                imports:[ConfigModule],
                inject:[ConfigService],
                useFactory: async (configService: ConfigService) =>({
                    secret: "" + process.env.JWT_KEY,
                    signOptions: {expiresIn:'100s'}
                })
            }
        )
    ],

    providers:[AuthService],
    exports:[AuthService]
})
export class AuthModule {}

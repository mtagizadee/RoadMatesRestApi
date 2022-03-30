import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

//DATABASE_URL="postgres://hyhmguqnoxonqv:adf48699dc4dce25c3fc1b2b87d8052c1113ab50a656b867aae9aaba77e29e0f@ec2-44-194-92-192.compute-1.amazonaws.com:5432/d3epbkbdveop1p"

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        super({
            datasources: {
                db: { url: process.env.DATABASE_URL }
            }
        });
    }
}
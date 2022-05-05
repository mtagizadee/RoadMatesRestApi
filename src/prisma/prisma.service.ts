import { Injectable } from '@nestjs/common';
import {PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        super({
            datasources: {
                db: { url: process.env.DATABASE_URL }
            }
        });
    }

    async deleteExpiredData(getCallBack: (params: any) => any[] | any, deleteCallBack: (params: any) => any) {
        const now: Date = new Date();
        const items: any[] = await getCallBack({});
        for (let index = 0; index < items.length; index++) {
            const item: any = items[index];
            if (item.expiredAt <= now) await deleteCallBack({
                where: { id: item.id }
            });
        }
    }

}
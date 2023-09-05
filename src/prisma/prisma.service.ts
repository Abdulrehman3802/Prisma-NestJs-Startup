import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService implements OnModuleInit {
    private readonly prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async onModuleInit() {
        await this.prisma.$connect();
    }

    async enableShutdownHooks(app: INestApplication) {
        // @ts-ignore
        this.prisma.$on<'beforeExit'>('beforeExit', async () => {
            await app.close();
        });
    }

    async getClient() {
        return this.prisma;
    }
}


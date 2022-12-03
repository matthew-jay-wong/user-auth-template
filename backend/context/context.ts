import { PrismaClient } from '@prisma/client';
import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';

export const context = ({ req, res }: CreateExpressContextOptions) => ({
	prismaClient: new PrismaClient(),
});

export type Context = inferAsyncReturnType<typeof context>;

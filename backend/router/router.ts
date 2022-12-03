import { initTRPC, TRPCError } from '@trpc/server';
import { z } from 'zod';
import { compare, hash } from 'bcrypt';
import { Prisma } from '@prisma/client';
import { Context } from '../context';

const t = initTRPC.context<Context>().create();

export const router = t.router({
	login: t.procedure
		.input(
			z.object({
				username: z.string(),
				password: z.string(),
			}),
		)
		.mutation(async (req) => {
			const {
				input: { username, password },
				ctx: { prismaClient },
			} = req;

			try {
				const user = await prismaClient.user.findUniqueOrThrow({
					where: {
						username,
					},
				});

				return await compare(password, user.hashedPassword);
			} catch (e) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: `User with username: ${username} not found`,
					cause: e,
				});
			}
		}),

	userCreate: t.procedure
		.input(
			z.object({
				username: z.string(),
				password: z.string(),
				email: z.string().email(),
			}),
		)
		.mutation(async (req) => {
			const {
				input: { username, password, email },
				ctx: { prismaClient },
			} = req;

			const hashedPassword = await hash(password, 10);

			try {
				const newUser = await prismaClient.user.create({
					data: {
						username,
						email,
						hashedPassword,
					},
				});

				return newUser;
			} catch (e) {
				if (e instanceof Prisma.PrismaClientKnownRequestError) {
					switch (e.code) {
						case 'P2002':
							throw new TRPCError({
								code: 'BAD_REQUEST',
								message:
									'There is a unique constraint error. User could not be created.',
								cause: e,
							});
						default:
					}
				}

				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Unknown Error',
					cause: e,
				});
			}
		}),
});

export type AppRouter = typeof router;

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { FC, PropsWithChildren, useState } from 'react';
import { trpc } from '../utils/trpc';

export const TRPCProvider: FC<PropsWithChildren> = ({ children }) => {
	const [queryClient] = useState(() => new QueryClient());
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: 'http://localhost:4001/trpc',
					// optional
					headers() {
						return {
							// authorization: getAuthCookie(),
						};
					},
				}),
			],
		}),
	);

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</trpc.Provider>
	);
};

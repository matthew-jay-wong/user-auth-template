import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { SignUp } from './pages';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { TRPCProvider } from './providers/TRPCProvider';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Landing />,
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/sign-up',
		element: <SignUp />,
	},
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<TRPCProvider>
			<RouterProvider router={router} />
		</TRPCProvider>
	</React.StrictMode>,
);

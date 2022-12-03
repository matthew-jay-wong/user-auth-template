import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { trpc } from '../../utils/trpc';

interface IForm {
	username: string;
	password: string;
	rememberMe: boolean;
}

export const Login: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IForm>();

	const login = trpc.login.useMutation();

	const onSubmit = (data: IForm) => login.mutate(data);

	return (
		<div className="flex flex-col justify-center content-center gap-2 w-60">
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
				<label>Username</label>
				<input {...register('username', { required: true })} />

				<div className="flex justify-between">
					<label>Password</label>
					<a href="forgot-password">Forgot Password?</a>
				</div>
				<input {...register('password', { required: true })} />

				<div className="flex gap-2">
					<input type="checkbox" {...register('rememberMe')} />
					<label>Remember Me</label>
				</div>

				{login.error && (
					<div className="text-red-500">{login.error.message}</div>
				)}

				<button type="submit" disabled={login.isLoading}>
					Login
				</button>
			</form>
			<a className="cursor-pointer text-center" href="sign-up">
				Sign Up
			</a>
		</div>
	);
};

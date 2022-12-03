import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { trpc } from '../../utils/trpc';

interface IForm {
	username: string;
	password: string;
	reEnterPassword: string;
	email: string;
}

export const SignUp: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IForm>();

	const signUp = trpc.userCreate.useMutation();

	const onSubmit = (data: IForm) => {
		const { username, password, email } = data;

		signUp.mutate({
			username,
			password,
			email,
		});
	};

	return (
		<div className="flex flex-col justify-center content-center gap-2">
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
				<label>Username</label>
				<input {...register('username', { required: true })} />

				<label>Email</label>
				<input {...register('email', { required: true })} />

				<label>Password</label>
				<input {...register('password', { required: true })} />

				<label>Re-Enter Password</label>
				<input {...register('reEnterPassword', { required: true })} />

				{signUp.error && (
					<div className="text-red-500">{signUp.error.message}</div>
				)}

				<button type="submit" disabled={signUp.isLoading}>
					Sign Up
				</button>
			</form>
			<a className="cursor-pointer text-center" href="login">
				Login
			</a>
		</div>
	);
};

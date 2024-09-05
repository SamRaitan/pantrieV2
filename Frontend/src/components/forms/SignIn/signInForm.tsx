import { useForm } from '@mantine/form';
import { TextInput, Box, Button, PasswordInput, Group, Loader } from '@mantine/core';
import './signInForm.css';
import { useSigninMutation } from '../../../selectors/signIn';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { SerializedError } from '@reduxjs/toolkit/react';
import { setUser } from '../../../slice/authSlice';
import { useDispatch, } from 'react-redux';
import { notifications } from '@mantine/notifications';
import { FiXCircle } from "react-icons/fi";



type CustomResponse = {
    data?: SignInResponse;
    error?: FetchBaseQueryError | SerializedError | SignInResponseError;
};

function SignInForm() {
    const dispatch = useDispatch();

    const [signin, { isLoading }] = useSigninMutation();

    const form = useForm({
        initialValues: { userOrEmail: '', password: '' }
    });

    const submit = async (userData: SignInRequestBody) => {
        try {
            const response: CustomResponse = await signin(userData);


            if ('error' in response) {
                if (response.error && typeof response.error === 'object' && 'data' in response.error) {
                    notifications.show({
                        title: 'Sign-in Failed',
                        message: (response.error.data as any).error || 'Sign-in failed. Please try again.',
                        color: 'red',
                        icon: <FiXCircle />
                    });
                } else {
                    throw Error('Something went wrong');
                }
            } else if ('data' in response) {
                dispatch(setUser({
                    user: response.data?.user,
                    cookie: response.data?.cookie
                }));

                notifications.show({
                    title: 'Sign-in Successful',
                    message: 'You have successfully signed in.',
                    color: 'green',
                });
                window.location.href = '/';
            }

        } catch (err: any) {
            console.log(err);

            notifications.show({
                title: 'Error',
                message: String(err) || 'An unexpected error occurred.',
                color: 'red',
                icon: <FiXCircle />
            });
        }
    };

    return (
        <>
            {isLoading ? (
                <Group justify="center" mt="xl">
                    <Loader m={20} color="green" size="lg" type="bars" />
                </Group>
            ) : (
                <>
                    <Box maw={340} mx="auto">
                        <TextInput
                            m={10}
                            label="Username"
                            placeholder="Username"
                            {...form.getInputProps('userOrEmail')}
                        />
                        <PasswordInput
                            m={10}
                            label="Password"
                            placeholder="Password"
                            {...form.getInputProps('password')}
                        />

                        <Group justify="center" mt="md">
                            <Button className='sign-in-button' color="green" onClick={() => submit(form.values)}>Sign in</Button>
                        </Group>
                    </Box>
                </>
            )}
        </>
    );
}

export default SignInForm;
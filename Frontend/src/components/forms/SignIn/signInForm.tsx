import { useForm } from '@mantine/form';
import { TextInput, Box, Button, PasswordInput, Group, Loader, Notification } from '@mantine/core';
import './signInForm.css'
import { useSigninMutation } from '../../../selectors/signIn';
import { useState } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { SerializedError } from '@reduxjs/toolkit/react';
import { FiXCircle } from "react-icons/fi";
import { setUser } from '../../../slice/authSlice';
import { useDispatch } from 'react-redux';

type CustomResponse = {
    data?: SignInResponse; // Use optional property for success case
    error?: FetchBaseQueryError | SerializedError | SignInResponseError;
};

function SignInForm() {

    const dispatch = useDispatch();
    const [signin, { isLoading }] = useSigninMutation();
    const [failedNotification, setFailedNotification] = useState<string>();
    const [notification, setNotification] = useState<boolean>(false);


    const form = useForm({
        initialValues: { userOrEmail: '', password: '' }
    });

    const submit = async (userData: SignInRequestBody) => {
        try {

            const response: CustomResponse = await signin(userData);
            if ('error' in response) {
                if (response.error && typeof response.error === 'object' && 'data' in response.error) {
                    setFailedNotification((response.error.data as any).error)
                    setNotification(true)
                } else {
                    throw Error('Something went wrong')
                }
            } else if ('data' in response) {
                setNotification(false)
                const user = response.data;
                dispatch(setUser(user));
                console.log(response);
                // window.location.href = '/';
            }

        } catch (err: any) {
            setFailedNotification(String(err))
            setNotification(true)
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
                    {notification && (
                        <Notification icon={<FiXCircle />} color="red" title="Sign-in Failed" mt="md" withCloseButton={false} withBorder>
                            {failedNotification}
                        </Notification>
                    )}
                </>
            )}
        </>
    );
}

export default SignInForm



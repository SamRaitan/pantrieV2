// SignUpForm.tsx
import { useState } from 'react';
import { Stepper, Button, Group, TextInput, PasswordInput, FileInput, StepperProps, Select, Loader } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import countryList from '../../../utils/contryList';
import './signUpForm.css';
import { signUpSchemaStep1, signUpSchemaStep2, signUpSchemaStep3, signUpSchemaStep4 } from './validation';
import { useSignupMutation } from '../../../selectors/signUp';
import { notifications } from '@mantine/notifications';
import { FiXCircle } from 'react-icons/fi';

function SignUpForm(props: StepperProps) {
    const [active, setActive] = useState(0);
    const [signup, { isLoading }] = useSignupMutation();

    const form = useForm({
        initialValues: {
            username: '',
            password: '',
            fullName: '',
            email: '',
            image: '',
            bio: '',
            region: '',
            dateOfBirth: ''
        },
        validate: yupResolver(active === 0 ? signUpSchemaStep1 :
            active === 1 ? signUpSchemaStep2 :
                active === 2 ? signUpSchemaStep3 :
                    signUpSchemaStep4),
    });

    const nextStep = () =>
        setActive((current: number) => {
            if (form.validate().hasErrors) {
                return current;
            }

            return current < 4 ? current + 1 : current;
        });

    const prevStep = () => setActive((current: number) => (current > 0 ? current - 1 : current));

    const submit = async (userData: SignUpRequest) => {
        try {
            const response = await signup(userData);
            if ('error' in response) {
                throw Error('make sure to fill all feilds, if persists restart process');
            }
            notifications.show({
                title: 'Sign-in Successful',
                message: 'You have successfully signed in.',
                color: 'green',
            });
            window.location.href = '/';
        } catch (err) {
            notifications.show({
                title: 'Sign-Up Failed :(',
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
                    <Stepper color="green" styles={{ separator: { display: 'none' } }} {...props} active={active}>
                        <Stepper.Step label="First step" description="Username & Password" miw={50}>
                            <TextInput withAsterisk label="Username" placeholder="Username" {...form.getInputProps('username')} />
                            <PasswordInput
                                withAsterisk
                                mt="md"
                                label="Password"
                                placeholder="Password"
                                {...form.getInputProps('password')}
                            />
                        </Stepper.Step>

                        <Stepper.Step label="Second step" description="Personal information">
                            <TextInput label="Name" placeholder="Name" withAsterisk {...form.getInputProps('fullName')} />
                            <TextInput mt="md" label="Email" placeholder="Email" withAsterisk {...form.getInputProps('email')} />
                        </Stepper.Step>

                        <Stepper.Step label="Final step" description="Profile settings">
                            <Select
                                label="Your favorite library"
                                placeholder="Pick value"
                                data={countryList}
                                searchable
                                nothingFoundMessage="Nothing found..."
                                withAsterisk
                                {...form.getInputProps('region')}
                            />
                            <DateInput
                                withAsterisk
                                clearable defaultValue={new Date()}
                                label="Date input"
                                placeholder="Date input"
                                {...form.getInputProps('dateOfBirth')}
                            />
                        </Stepper.Step>

                        <Stepper.Step label="Optional step" description="Profile settings">
                            <TextInput label="Bio" placeholder="Bio" {...form.getInputProps('bio')} />
                            <FileInput
                                p={10}
                                variant="filled"
                                label="Input label"
                                placeholder="Input placeholder"
                                accept=".png,.jpeg,.jpg"
                                onChange={(file: File | null) => {
                                    if (file) {
                                        // Check if the file type is PNG or JPEG
                                        if (file.type === 'image/png' || file.type === 'image/jpeg') {
                                            const fileURL = URL.createObjectURL(file);
                                            form.setFieldValue('image', fileURL);
                                        } else {
                                            // Notify the user about the invalid file type
                                            alert('Please upload only PNG or JPEG files.');
                                        }
                                    }
                                }}
                            />
                        </Stepper.Step>

                        <Stepper.Completed>
                            Completed! Form values:
                        </Stepper.Completed>
                    </Stepper >

                    <Group justify="center" mt="xl">
                        {active !== 0 && (
                            <Button variant="default" onClick={prevStep}>
                                Back
                            </Button>
                        )}
                        {active !== 3 && <Button color="green" onClick={nextStep}>Next step</Button>}
                        {active === 3 && <Button color="green" onClick={() => submit(form.values)}>Submit</Button>}
                    </Group>
                </>
            )}
        </>
    );
}

export default SignUpForm;

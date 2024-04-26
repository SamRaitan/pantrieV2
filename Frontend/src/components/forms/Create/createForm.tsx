// SignUpForm.tsx
import { useState } from 'react';
import { Stepper, Button, Group, TextInput, PasswordInput, FileInput, StepperProps, Select } from '@mantine/core';
import { useForm, } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import countryList from '../../../utils/contryList';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../../slice/authSlice';

function CreateForm(props: StepperProps) {
    const dispatch = useDispatch();
    const [active, setActive] = useState(0);

    const form = useForm({
        initialValues: {
            username: '',

        },

    });

    const nextStep = () =>
        setActive((current: number) => {
            if (form.validate().hasErrors) {
                return current;
            }

            return current < 4 ? current + 1 : current;
        });

    const prevStep = () => setActive((current: number) => (current > 0 ? current - 1 : current));

    const submit = async () => {
        try {
            console.log('clicked');

            dispatch(clearUser());
        } catch (err) {
            // Handle error
            console.error('Signup failed:', err);
        }
    };

    return (

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
                {active !== 3 && <Button color="green" onClick={() => submit()}>Next step</Button>}
                {active === 3 && <Button color="green" >Submit</Button>}


            </Group>
        </>
    );
}

export default CreateForm;

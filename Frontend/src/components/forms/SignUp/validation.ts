import * as Yup from 'yup';

const signUpSchemaStep1 = Yup.object().shape({
    username: Yup.string()
        .required('Username is required')
        .matches(/^[a-zA-Z0-9_]+$/, 'Username must contain only letters, numbers, and underscores'),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters').matches(/[A-Z]/, 'Password must contain at least one capital letter'),
});

const signUpSchemaStep2 = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
});

const signUpSchemaStep3 = Yup.object().shape({
    region: Yup.string().required('Region is required'),
    dateOfBirth: Yup.date().required('Date of birth is required'),
});

const signUpSchemaStep4 = Yup.object().shape({
    bio: Yup.string().required('Bio is required'),
    image: Yup.mixed()
        .test('fileType', 'Invalid file type, only image files are allowed', (value) => {
            if (!value) return true; // Allow empty value
            const acceptedExtensions = ['jpg', 'jpeg', 'png'];
            const fileName = value instanceof File ? value.name : value.toString();
            const extension = fileName.split('.').pop()?.toLowerCase();
            return extension ? acceptedExtensions.includes(extension) : false;
        }).required('noni'),
});

export { signUpSchemaStep1, signUpSchemaStep2, signUpSchemaStep3, signUpSchemaStep4 };

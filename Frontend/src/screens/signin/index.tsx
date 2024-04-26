import { Modal } from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import '../signup/signup.css'
import SignInForm from "../../components/forms/SignIn/signInForm";


function SignIn() {
    const [opened, { open }] = useDisclosure(false);
    const imageUrls = [
        'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-6.png',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTLc2RJDXMj97DuklLh0gtM0sVcU61BBefiXW0ra7CCQ&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFPfCoMWKyvgNeEjSLcViAKP2Kz5p6VekTJttLe0kYfJUkaI2Fp1MV_VuRGFMg6U_-_cU&usqp=CAU',

    ];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [imageUrls.length]);

    useEffect(() => {
        open();
    }, [open]);

    return (
        <div
            style={{
                backgroundImage: `url(${imageUrls[currentImageIndex]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100vw',
                height: '100vh',
            }}
        >
            <Modal opened={opened} onClose={open} title="Authentication" withCloseButton={false} centered>
                <SignInForm />
                <p className="login-text">Don't have a account yet?
                    <span className="logIn">
                        <a className="loginPage" href="/signup"> Sign-up</a>
                    </span>
                </p>
            </Modal>
        </div>
    );
}

export default SignIn;

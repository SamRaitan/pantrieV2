import { Modal } from "@mantine/core";
import imageUrls from "../../utils/imagesList";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import '../signup/signup.css'
import SignInForm from "../../components/forms/SignIn/signInForm";
import { IsUserLoggedIn } from "../../components/shared/isLoggedIn";


function SignIn() {
    IsUserLoggedIn()
    const [opened, { open }] = useDisclosure(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
        }, 5000);

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
            <Modal opened={opened} onClose={open} title="Authentication" withCloseButton={false} centered overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
                mt: 50
            }}>
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

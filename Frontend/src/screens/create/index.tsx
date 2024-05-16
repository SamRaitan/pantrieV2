import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import '../signup/signup.css'
import CreateForm from "../../components/forms/Create/createForm";


function Create() {
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
        <div className='mantine-Modal-root'>

            <div
                style={{
                    backgroundImage: `url(${imageUrls[currentImageIndex]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100vw',
                    height: '100vh',
                }}
            >
                <Modal
                    opened={opened}
                    onClose={open}
                    title="Create Recipe Post"
                    withCloseButton={false}
                    yOffset={100}
                    centered
                    overlayProps={{
                        backgroundOpacity: 0.55,
                        blur: 3,
                        mt: 50
                    }}>
                    <CreateForm />
                </Modal>
            </div>
        </div>

    );
}

export default Create;

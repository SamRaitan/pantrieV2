import { Container, Text, Group, ActionIcon, Divider } from '@mantine/core';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {
    return (
        <Container mt={50}>
            <Divider my="md" />
            <footer style={{ padding: '3rem 0', marginTop: 'auto' }}>
                <Group justify="apart" gap="xl" style={{ marginBottom: '2rem' }} p={15}>
                    {/* Quick Links */}
                    <div>
                        <Text fw={700} mb={10} color="teal">Quick Links</Text>
                        <Text component="a" href="/about" size="sm" color="teal" style={{ marginBottom: '0.5rem' }}>About Us</Text>
                        <br />
                        <Text component="a" href="/contact" size="sm" color="teal" style={{ marginBottom: '0.5rem' }}>Contact Us</Text>
                        <br />
                        <Text component="a" href="/faq" size="sm" color="teal">FAQ</Text>
                    </div>

                    {/* Social Media Links */}
                    <div>
                        <Text fw={700} mb={10} color="teal">Follow Us</Text>
                        <Group gap={15}>
                            <ActionIcon component="a" href="https://www.facebook.com" size="lg" variant="outline" radius="xl" color="teal">
                                <FaFacebook />
                            </ActionIcon>
                            <ActionIcon component="a" href="https://www.twitter.com" size="lg" variant="outline" radius="xl" color="teal">
                                <FaTwitter />
                            </ActionIcon>
                            <ActionIcon component="a" href="https://www.instagram.com" size="lg" variant="outline" radius="xl" color="teal">
                                <FaInstagram />
                            </ActionIcon>
                        </Group>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <Text fw={700} mb={10} color="teal">Contact Info</Text>
                        <Text size="sm" color="teal">123 Recipe Street</Text>
                        <Text size="sm" color="teal">Food City, FC 12345</Text>
                        <Text size="sm" color="teal">Email: support@pantrie.com</Text>
                    </div>
                </Group>
                <Divider my="xl" />
                <Text size="sm" color="dimmed" style={{ marginTop: '1rem' }}>
                    © 2024 Pantrie. All rights reserved.
                </Text>
            </footer>
        </Container>
    );
}

export default Footer;
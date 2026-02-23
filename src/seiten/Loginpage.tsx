// LoginPage.tsx
import { Box, Stack, Text, Input, Button, Alert, AlertIcon } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        // Mock-Login-Daten
        if (username === "admin" && password === "admin") {
            setError("");
            navigate("/LandingPage"); // Weiterleitung zur LandingPage
        } else {
            setError("Benutzername oder Passwort ist falsch");
        }
    };

    return (
        <Box
            minH="100vh"
            w="100vw"
            bgGradient="linear(to-br, teal.500, blue.600)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="white"
            px={0}
        >
            <Stack
                spacing={6}
                textAlign="center"
                maxW="2xl"
                py={12}
                px={8}
                bg="rgba(255, 255, 255, 0.05)"
                borderRadius="3xl"
                boxShadow="2xl"
                backdropFilter="blur(15px)"
                animation="fadeIn 1s ease-in"
            >
                <Text fontSize={["4xl", "5xl", "6xl"]} fontWeight="extrabold">
                    Login
                </Text>

                {error && (
                    <Alert status="error" borderRadius="lg">
                        <AlertIcon />
                        {error}
                    </Alert>
                )}

                <Stack spacing={4} w="100%">
                    <Input
                        placeholder="Benutzername"
                        size="lg"
                        bg="whiteAlpha.800"
                        color="black"
                        _placeholder={{ color: "gray.600" }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Passwort"
                        size="lg"
                        bg="whiteAlpha.800"
                        color="black"
                        _placeholder={{ color: "gray.600" }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Stack>

                <Button
                    colorScheme="orange"
                    size="lg"
                    fontWeight="bold"
                    px={12}
                    py={6}
                    _hover={{ transform: "scale(1.05)", bg: "orange.400" }}
                    onClick={handleLogin}
                >
                    Einloggen
                </Button>
            </Stack>

            {/* Fade-In Animation */}
            <style>
                {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
            </style>
        </Box>
    );
}

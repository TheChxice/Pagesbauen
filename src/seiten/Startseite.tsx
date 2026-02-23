// LandingPage.tsx
import { Box, Stack, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login"); // Weiterleitung zur Login-Seite
    };

    return (
        <Box
            minH="100vh"
            w="100vw" // volle Breite
            bgGradient="linear(to-br, teal.500, blue.600)" // Vollbild-Farbverlauf
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="white"
        >
            <Stack
                spacing={8}
                textAlign="center"
                maxW="2xl"
                py={12}
                px={0} // kein horizontaler Padding, damit kein Rand
                bg="rgba(255, 255, 255, 0.05)" // leicht transparentes Overlay
                borderRadius="3xl"
                boxShadow="2xl"
                backdropFilter="blur(15px)"
                animation="fadeIn 1s ease-in"
            >
                <Text fontSize={["4xl", "5xl", "6xl"]} fontWeight="extrabold" lineHeight="short">
                    Willkommen bei QuizArena
                </Text>
                <Text fontSize={["lg", "xl", "2xl"]} color="whiteAlpha.900">
                    Teste dein Wissen, tritt gegen andere Spieler an und steigere deinen Punktestand.
                </Text>
                <Button
                    colorScheme="orange"
                    size="lg"
                    fontWeight="bold"
                    px={12}
                    py={6}
                    _hover={{ transform: "scale(1.05)", bg: "orange.400" }}
                    onClick={handleLogin}
                >
                    Login
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

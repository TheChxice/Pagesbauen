import {
    Box,
    SimpleGrid,
    Stack,
    Text,
    Button,
    Grid,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    Select,
    useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LandingPage() {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const activePlayers = ["Anna Schmidt", "Max Weber", "Lisa Wagner", "Thomas Becker"];
    const topPlayer = { name: "Anna Schmidt", score: 1200 };
    const activeGames = [
        {
            id: 1,
            name: "Allgemeinwissen Master",
            players: ["Anna Schmidt", "Max Weber", "Lisa Wagner", "Thomas Becker"],
        },
        {
            id: 2,
            name: "Science & Tech",
            players: ["Thomas Becker", "Lisa Wagner", "Max Weber"],
        },
    ];
    const userStats = { gamesPlayed: 10, gamesWon: 6, currentScore: 800 };

    const courses: Record<string, string[]> = {
        Mathematik: ["Algebra", "Analysis", "Geometrie"],
        Informatik: ["Programmierung", "Datenbanken", "Künstliche Intelligenz"],
        Geschichte: ["Antike", "Mittelalter", "Neuzeit"],
        Wirtschaft: ["Marketing", "Finanzen", "Management"],
    };

    const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
    const [selectedCourse, setSelectedCourse] = useState<string>("");
    const [selectedTopic, setSelectedTopic] = useState<string>("");

    /* ---------------- CLICK LOGIK ---------------- */

    const handleActivePlayerClick = (player: string) => {
        // Nur hier soll Modal kommen
        setSelectedPlayer(player);
        setSelectedCourse("");
        setSelectedTopic("");
        onOpen();
    };

    const handleGamePlayerClick = (player: string) => {
        // Direkt ins Spiel ohne Modal
        navigate("/maingame", {
            state: {
                player,
                course: "Standardkurs",
                topic: "Standardthema",
            },
        });
    };

    const startGame = () => {
        if (!selectedPlayer || !selectedCourse || !selectedTopic) return;

        navigate("/maingame", {
            state: {
                player: selectedPlayer,
                course: selectedCourse,
                topic: selectedTopic,
            },
        });

        onClose();
    };

    const goToPastGames = () => {
        navigate("/past-games");
    };

    return (
        <>
            <Box
                minH="100vh"
                w="100vw"
                bgGradient="linear(to-br, teal.500, blue.600)"
                display="flex"
                justifyContent="center"
                alignItems="center"
                px={4}
            >
                <Box
                    w="full"
                    maxW="6xl"
                    py={12}
                    px={8}
                    bg="rgba(255, 255, 255, 0.05)"
                    borderRadius="3xl"
                    backdropFilter="blur(15px)"
                    boxShadow="2xl"
                    color="white"
                >
                    <Text fontSize={["3xl", "4xl", "5xl"]} fontWeight="extrabold" textAlign="center" mb={8}>
                        QuizArena Dashboard
                    </Text>

                    <SimpleGrid columns={[1, null, 2]} gap={6}>

                        {/* Aktive Spieler → MIT MODAL */}
                        <Box
                            bg="whiteAlpha.800"
                            p={6}
                            borderRadius="2xl"
                            shadow="md"
                            color="black"
                            overflowX="auto"
                        >
                            <Text fontSize="xl" fontWeight="semibold" mb={4}>
                                Aktuell angemeldete Spieler
                            </Text>
                            <Grid templateColumns="repeat(auto-fill, minmax(120px, 1fr))" gap={3}>
                                {activePlayers.map((player) => (
                                    <Button
                                        key={player}
                                        size="sm"
                                        colorScheme="blue"
                                        onClick={() => handleActivePlayerClick(player)}
                                        _hover={{ transform: "scale(1.05)" }}
                                    >
                                        {player}
                                    </Button>
                                ))}
                            </Grid>
                        </Box>

                        {/* Scoreboard */}
                        <Box
                            bg="whiteAlpha.800"
                            p={6}
                            borderRadius="2xl"
                            shadow="md"
                            textAlign="center"
                            color="black"
                        >
                            <Text fontSize="xl" fontWeight="semibold" mb={4}>
                                Scoreboard – Platz 1
                            </Text>
                            <Text fontSize="lg" fontWeight="bold">
                                {topPlayer.name}
                            </Text>
                            <Text>{topPlayer.score} Punkte</Text>
                        </Box>

                        {/* Aktive Spiele → DIREKT START */}
                        <Box
                            bg="whiteAlpha.800"
                            p={6}
                            borderRadius="2xl"
                            shadow="md"
                            color="black"
                            overflowY="auto"
                        >
                            <Text fontSize="xl" fontWeight="semibold" mb={4}>
                                Aktive Spiele
                            </Text>
                            <Stack gap={4}>
                                {activeGames.map((game) => (
                                    <Box key={game.id} p={3} borderWidth={1} borderRadius="lg" bg="whiteAlpha.700">
                                        <Text fontWeight="medium" mb={2}>
                                            {game.name}
                                        </Text>
                                        <Grid templateColumns="repeat(auto-fill, minmax(100px, 1fr))" gap={3}>
                                            {game.players.map((player) => (
                                                <Button
                                                    key={player}
                                                    size="sm"
                                                    colorScheme="green"
                                                    onClick={() => handleGamePlayerClick(player)}
                                                    _hover={{ transform: "scale(1.05)" }}
                                                >
                                                    {player}
                                                </Button>
                                            ))}
                                        </Grid>
                                    </Box>
                                ))}
                            </Stack>
                        </Box>

                        {/* Eigene Statistiken */}
                        <Box
                            bg="whiteAlpha.800"
                            p={6}
                            borderRadius="2xl"
                            shadow="md"
                            color="black"
                        >
                            <Text fontSize="xl" fontWeight="semibold" mb={4}>
                                Eigene Statistiken
                            </Text>
                            <Stack gap={2} mb={4}>
                                <Text>Gespielte Spiele: {userStats.gamesPlayed}</Text>
                                <Text>Gewonnene Spiele: {userStats.gamesWon}</Text>
                                <Text>Aktueller Punktestand: {userStats.currentScore}</Text>
                            </Stack>
                            <Button
                                colorScheme="orange"
                                width="100%"
                                onClick={goToPastGames}
                                _hover={{ transform: "scale(1.05)", bg: "orange.400" }}
                            >
                                Vergangene Spiele anzeigen
                            </Button>
                        </Box>

                    </SimpleGrid>
                </Box>
            </Box>

            {/* MODAL bleibt unverändert */}
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent borderRadius="2xl">
                    <ModalHeader>Spiel starten für {selectedPlayer}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={4}>
                            <Select
                                placeholder="Kurs auswählen"
                                value={selectedCourse}
                                onChange={(e) => {
                                    setSelectedCourse(e.target.value);
                                    setSelectedTopic("");
                                }}
                            >
                                {Object.keys(courses).map((course) => (
                                    <option key={course} value={course}>
                                        {course}
                                    </option>
                                ))}
                            </Select>

                            <Select
                                placeholder="Themengebiet auswählen"
                                value={selectedTopic}
                                isDisabled={!selectedCourse}
                                onChange={(e) => setSelectedTopic(e.target.value)}
                            >
                                {selectedCourse &&
                                    courses[selectedCourse].map((topic) => (
                                        <option key={topic} value={topic}>
                                            {topic}
                                        </option>
                                    ))}
                            </Select>
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="teal"
                            mr={3}
                            onClick={startGame}
                            isDisabled={!selectedCourse || !selectedTopic}
                        >
                            Spiel starten
                        </Button>
                        <Button variant="ghost" onClick={onClose}>
                            Abbrechen
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
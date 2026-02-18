import { useState } from "react";
import {
    Box,
    Button,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    Stack,
    Flex,
    SimpleGrid,
} from "@chakra-ui/react";

// Mock Daten
const THEMES = ["Allgemeinwissen", "Science & Tech", "History & Culture"];
const PLAYERS = ["Anna Schmidt", "Max Weber"];
const QUESTIONS = [
    {
        question: "Was ist die Hauptstadt von Frankreich?",
        answers: ["Paris", "Berlin", "Rom", "Madrid"],
        correct: 0,
    },
    {
        question: "Welches Element hat das Symbol H?",
        answers: ["Helium", "Hydrogen", "Hafnium", "Holmium"],
        correct: 1,
    },
    {
        question: "Wer malte die Mona Lisa?",
        answers: ["Van Gogh", "Michelangelo", "Leonardo da Vinci", "Picasso"],
        correct: 2,
    },
];

// Typ für beantwortete Fragen
type QuestionResult = {
    question: string;
    selectedAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
};

export default function MainPage() {
    const [currentRound, setCurrentRound] = useState(1);
    const [activePlayerIndex, setActivePlayerIndex] = useState(0);
    const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
    const [usedThemes, setUsedThemes] = useState<string[]>([]);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [scores, setScores] = useState([0, 0]);
    const [roundResults, setRoundResults] = useState<QuestionResult[]>([]);
    const [showThemeModal, setShowThemeModal] = useState(false);
    const [showRoundSummary, setShowRoundSummary] = useState(false);

    // Runde starten
    const startRound = () => {
        setSelectedTheme(null);
        setShowThemeModal(true);
        setRoundResults([]);
        setQuestionIndex(0);
    };

    // Thema wählen
    const chooseTheme = (theme: string) => {
        setSelectedTheme(theme);
        setUsedThemes((prev) => [...prev, theme]); // Thema sperren
        setShowThemeModal(false);
    };

    // Antwort auswählen
    const handleAnswer = (answerIndex: number) => {
        const currentQuestion = QUESTIONS[questionIndex];
        const isCorrect = answerIndex === currentQuestion.correct;

        // Ergebnisse speichern
        setRoundResults((prev) => [
            ...prev,
            {
                question: currentQuestion.question,
                selectedAnswer: currentQuestion.answers[answerIndex],
                correctAnswer: currentQuestion.answers[currentQuestion.correct],
                isCorrect,
            },
        ]);

        // Punkte vergeben
        if (isCorrect) {
            const newScores = [...scores];
            newScores[activePlayerIndex] += 1;
            setScores(newScores);
        }

        // Nächste Frage oder Zwischenstand
        if (questionIndex + 1 < QUESTIONS.length) {
            setQuestionIndex(questionIndex + 1);
        } else {
            setShowRoundSummary(true);
        }
    };

    // Nächste Runde starten
    const handleNextRound = () => {
        if (currentRound < 3) {
            setCurrentRound(currentRound + 1);
            setActivePlayerIndex((activePlayerIndex + 1) % PLAYERS.length);
            setShowRoundSummary(false);
            startRound();
        } else {
            alert(
                `Spiel beendet!\n${PLAYERS[0]}: ${scores[0]} Punkte\n${PLAYERS[1]}: ${scores[1]} Punkte`
            );
            // Reset für neues Spiel
            setCurrentRound(1);
            setActivePlayerIndex(0);
            setScores([0, 0]);
            setUsedThemes([]);
            setShowRoundSummary(false);
            setSelectedTheme(null);
        }
    };

    // Gewinner der Runde ermitteln
    const maxScore = Math.max(...scores);
    const winnerIndices = scores
        .map((score, idx) => (score === maxScore ? idx : -1))
        .filter((idx) => idx !== -1);

    // Zwischenstand-Ansicht
    if (showRoundSummary) {
        return (
            <Box bg="gray.50" minH="100vh" p={6}>
                <Text fontSize="3xl" fontWeight="bold" mb={6} textAlign="center">
                    Zwischenstand – Runde {currentRound}
                </Text>

                {/* Scoreboard */}
                <SimpleGrid columns={PLAYERS.length} gap={6} mb={8}>
                    {PLAYERS.map((player, idx) => (
                        <Box
                            key={player}
                            bg={winnerIndices.includes(idx) ? "green.100" : "white"}
                            p={4}
                            borderRadius="lg"
                            shadow="md"
                            textAlign="center"
                        >
                            <Text fontWeight="bold">{player}</Text>
                            <Text fontSize="lg">Punkte: {scores[idx]}</Text>
                            {winnerIndices.includes(idx) && (
                                <Text color="green.600" fontWeight="bold">
                                    Gewinner der Runde
                                </Text>
                            )}
                        </Box>
                    ))}
                </SimpleGrid>

                {/* Fragenübersicht */}
                <Stack spacing={4}>
                    {roundResults.map((res, idx) => (
                        <Box
                            key={idx}
                            bg={res.isCorrect ? "green.50" : "red.50"}
                            p={4}
                            borderRadius="lg"
                            shadow="sm"
                            display="flex"
                            flexDirection="column"
                        >
                            <Text fontWeight="bold" mb={2}>
                                Frage {idx + 1}: {res.question}
                            </Text>
                            <Text>
                                Deine Antwort: <b>{res.selectedAnswer}</b>
                            </Text>
                            <Text>
                                Richtige Antwort: <b>{res.correctAnswer}</b>
                            </Text>
                            <Text
                                color={res.isCorrect ? "green.600" : "red.600"}
                                fontWeight="bold"
                                mt={2}
                            >
                                {res.isCorrect ? "✅ Richtig" : "❌ Falsch"}
                            </Text>
                        </Box>
                    ))}
                </Stack>

                {/* Nächste Runde */}
                <Box textAlign="center" mt={8}>
                    <Button colorScheme="purple" size="lg" onClick={handleNextRound}>
                        {currentRound < 3 ? "Nächste Runde starten" : "Spiel beenden"}
                    </Button>
                </Box>
            </Box>
        );
    }

    // Hauptspiel-Ansicht
    return (
        <Box p={6} minH="100vh" bg="gray.50">
            {/* Header: Spieler + Runde + Scoreboard */}
            <Flex justify="space-between" mb={6}>
                <Text fontSize="xl" fontWeight="bold">
                    Runde {currentRound} / 3 — Spieler: {PLAYERS[activePlayerIndex]}
                </Text>
                <Flex gap={4}>
                    {PLAYERS.map((player, idx) => (
                        <Box
                            key={player}
                            bg="gray.100"
                            p={3}
                            borderRadius="md"
                            textAlign="center"
                        >
                            <Text fontWeight="bold">{player}</Text>
                            <Text>Punkte: {scores[idx]}</Text>
                        </Box>
                    ))}
                </Flex>
            </Flex>

            {/* Hauptbereich: Frage */}
            {selectedTheme ? (
                <Box
                    bg="white"
                    borderRadius="2xl"
                    shadow="lg"
                    p={8}
                    textAlign="center"
                    maxW="600px"
                    mx="auto"
                >
                    <Text fontSize="2xl" fontWeight="bold" mb={6}>
                        Thema: {selectedTheme}
                    </Text>

                    <Text fontSize="xl" mb={6}>
                        {QUESTIONS[questionIndex].question}
                    </Text>

                    <Stack spacing={4}>
                        {QUESTIONS[questionIndex].answers.map((ans, idx) => (
                            <Button
                                key={idx}
                                colorScheme="blue"
                                size="lg"
                                onClick={() => handleAnswer(idx)}
                            >
                                {ans}
                            </Button>
                        ))}
                    </Stack>
                </Box>
            ) : (
                <Button
                    colorScheme="purple"
                    size="lg"
                    onClick={() => setShowThemeModal(true)}
                    display="block"
                    mx="auto"
                >
                    Runde starten
                </Button>
            )}

            {/* Modal für Themenwahl */}
            <Modal isOpen={showThemeModal} onClose={() => {}} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{PLAYERS[activePlayerIndex]} wählt das Thema</ModalHeader>
                    <ModalBody>
                        <Stack spacing={4} mb={4}>
                            {THEMES.map((theme) => (
                                <Button
                                    key={theme}
                                    colorScheme="teal"
                                    size="lg"
                                    onClick={() => chooseTheme(theme)}
                                    isDisabled={usedThemes.includes(theme)} // deaktiviert, falls schon gewählt
                                >
                                    {theme}
                                </Button>
                            ))}
                        </Stack>
                        <Text fontSize="sm" color="gray.500" textAlign="center">
                            Bereits gewählte Themen sind deaktiviert.
                        </Text>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
}

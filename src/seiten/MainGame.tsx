import { useState, useEffect } from "react";
import {
    Box,
    Button,
    Text,
    VStack,
    HStack,
    Progress,
    Checkbox,
    CheckboxGroup,
    Grid,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

// Mock Daten
const THEMES = ["Allgemeinwissen", "Science & Tech", "History & Culture"];
const PLAYERS = ["Anna Schmidt", "Max Weber"];

const QUESTIONS = [
    {
        question: "Was ist die Hauptstadt von Frankreich?",
        answers: ["Paris", "Berlin", "Rom", "Madrid"],
        correct: [0],
    },
    {
        question: "Welches Element hat das Symbol H?",
        answers: ["Helium", "Hydrogen", "Hafnium", "Holmium"],
        correct: [1],
    },
    {
        question: "Wer malte die Mona Lisa?",
        answers: ["Van Gogh", "Michelangelo", "Leonardo da Vinci", "Picasso"],
        correct: [2],
    },
];

type RoundResult = {
    playerAnswers: (boolean | null)[];
    opponentAnswers: (boolean | null)[];
};

export default function MainPage() {
    const navigate = useNavigate();

    const [currentRound, setCurrentRound] = useState(1);
    const [activePlayerIndex, setActivePlayerIndex] = useState(0);
    const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
    const [usedThemes, setUsedThemes] = useState<string[]>([]);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [scores, setScores] = useState([0, 0]);
    const [roundResults, setRoundResults] = useState<RoundResult[]>([]);
    const [currentAnswers, setCurrentAnswers] = useState<(boolean | null)[]>(
        Array(QUESTIONS.length).fill(null)
    );
    const [timer, setTimer] = useState(10);
    const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

    const availableThemes = THEMES.filter((t) => !usedThemes.includes(t));

    // Timer
    useEffect(() => {
        if (!selectedTheme) return;
        if (timer === 0) {
            submitAnswer();
            return;
        }
        const interval = setInterval(() => setTimer((t) => t - 1), 1000);
        return () => clearInterval(interval);
    }, [timer, selectedTheme]);

    const chooseTheme = (theme: string) => {
        setSelectedTheme(theme);
        setUsedThemes((prev) => [...prev, theme]);
        setQuestionIndex(0);
        setCurrentAnswers(Array(QUESTIONS.length).fill(null));
        setTimer(10);
        setSelectedOptions([]);
    };

    const submitAnswer = () => {
        const currentQuestion = QUESTIONS[questionIndex];
        const correctAnswers = currentQuestion.correct;

        const isCorrect =
            correctAnswers.length === selectedOptions.length &&
            correctAnswers.every((v) => selectedOptions.includes(v));

        // Antworten für diese Runde aktualisieren
        const updatedAnswers = [...currentAnswers];
        updatedAnswers[questionIndex] = isCorrect;
        setCurrentAnswers(updatedAnswers);

        // Score aktualisieren
        const updatedScores = [...scores];
        if (isCorrect) updatedScores[activePlayerIndex] += 1;
        setScores(updatedScores);

        if (questionIndex + 1 < QUESTIONS.length) {
            // Nächste Frage
            setQuestionIndex((prev) => prev + 1);
            setTimer(10);
            setSelectedOptions([]);
            return;
        }

        // Runde fertig: Gegnerantworten generieren
        const opponentAnswers = QUESTIONS.map(() => Math.random() > 0.5);

        // RoundResults aktualisieren
        setRoundResults((prev) => [
            ...prev,
            { playerAnswers: updatedAnswers, opponentAnswers },
        ]);

        // Prüfen ob Spiel vorbei
        if (currentRound >= 3) {
            navigate("/match-summary", {
                state: {
                    players: PLAYERS,
                    scores: updatedScores,
                    roundResults: [
                        ...roundResults,
                        { playerAnswers: updatedAnswers, opponentAnswers },
                    ],
                },
            });
            return;
        }

        // Nächste Runde vorbereiten
        setCurrentRound((prev) => prev + 1);
        setActivePlayerIndex((prev) => (prev + 1) % 2);
        setSelectedTheme(null);
        setTimer(10);
        setSelectedOptions([]);
        setCurrentAnswers(Array(QUESTIONS.length).fill(null));
        setQuestionIndex(0);
    };

    const getBoxColor = (isCorrect: boolean | null) => {
        if (isCorrect === true) return "green.500";
        if (isCorrect === false) return "red.500";
        return "gray.300";
    };

    return (
        <Box
            minH="100vh"
            w="100vw"
            bgGradient="linear(to-br, teal.500, blue.600)"
            display="flex"
            justifyContent="center"
            alignItems="center"
            px={8}
        >
            <Box w="full" maxW="7xl" py={12}>
                {/* Spieler Übersicht */}
                <HStack justify="space-between" mb={10} align="start">
                    {PLAYERS.map((player, pIndex) => (
                        <VStack key={player} align="center">
                            <Text fontWeight="bold" fontSize="xl">
                                {player}
                            </Text>

                            {/* Alte Runden */}
                            {roundResults.map((round, rIndex) => (
                                <HStack key={rIndex} spacing={1}>
                                    {(pIndex === 0 ? round.playerAnswers : round.opponentAnswers).map(
                                        (ans, i) => (
                                            <Box
                                                key={i}
                                                w="6"
                                                h="6"
                                                bg={getBoxColor(ans)}
                                                borderRadius="full"
                                                border="2px solid white"
                                            />
                                        )
                                    )}
                                </HStack>
                            ))}

                            {/* Aktuelle Runde */}
                            {selectedTheme && (
                                <HStack spacing={1}>
                                    {currentAnswers.map((ans, i) => (
                                        <Box
                                            key={i}
                                            w="6"
                                            h="6"
                                            bg={getBoxColor(ans)}
                                            borderRadius="full"
                                            border="2px solid white"
                                        />
                                    ))}
                                </HStack>
                            )}
                        </VStack>
                    ))}
                </HStack>

                {/* Theme Auswahl */}
                {!selectedTheme && (
                    <VStack spacing={6}>
                        <Text fontSize="3xl" fontWeight="bold" color="white">
                            Wähle ein Themengebiet
                        </Text>

                        <Grid templateColumns="repeat(3, 1fr)" gap={6} w="600px">
                            {availableThemes.map((theme) => (
                                <Button
                                    key={theme}
                                    size="lg"
                                    colorScheme="purple"
                                    h="100px"
                                    fontSize="lg"
                                    borderRadius="2xl"
                                    onClick={() => chooseTheme(theme)}
                                >
                                    {theme}
                                </Button>
                            ))}
                        </Grid>
                    </VStack>
                )}

                {/* Fragen UI */}
                {selectedTheme && (
                    <Box
                        bg="white"
                        maxW="600px"
                        mx="auto"
                        p={8}
                        borderRadius="2xl"
                        shadow="xl"
                        textAlign="center"
                    >
                        <Text fontSize="2xl" fontWeight="bold" mb={2}>
                            {selectedTheme}
                        </Text>

                        <Text fontSize="xl" mb={4}>
                            {QUESTIONS[questionIndex].question}
                        </Text>

                        <Text mb={2}>Zeit: {timer}s</Text>
                        <Progress value={(timer / 10) * 100} mb={4} />

                        <CheckboxGroup
                            value={selectedOptions.map(String)}
                            onChange={(vals) => setSelectedOptions(vals.map(Number))}
                        >
                            <VStack spacing={4}>
                                {QUESTIONS[questionIndex].answers.map((ans, idx) => (
                                    <Checkbox key={idx} value={idx.toString()} size="lg">
                                        {ans}
                                    </Checkbox>
                                ))}
                            </VStack>
                        </CheckboxGroup>

                        <Button mt={6} size="lg" colorScheme="purple" onClick={submitAnswer}>
                            Antwort bestätigen
                        </Button>
                    </Box>
                )}
            </Box>
        </Box>
    );
}

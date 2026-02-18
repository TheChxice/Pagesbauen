
import { Box, Stack, Text, SimpleGrid, Badge } from "@chakra-ui/react";

type QuestionResult = {
    question: string;
    selectedAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
};

type RoundSummaryProps = {
    roundNumber: number;
    results: QuestionResult[];
    scores: number[];
    players: string[];
    onNextRound: () => void; // optional, um zur nächsten Runde zu wechseln
};

export default function RoundSummary({
                                         roundNumber,
                                         results,
                                         scores,
                                         players,
                                         onNextRound,
                                     }: RoundSummaryProps) {
    // Gewinner ermitteln
    const maxScore = Math.max(...scores);
    const winnerIndices = scores
        .map((score, idx) => (score === maxScore ? idx : -1))
        .filter((idx) => idx !== -1);

    return (
        <Box p={6} minH="100vh" bg="gray.50">
    <Text fontSize="3xl" fontWeight="bold" mb={6}>
        Rundenübersicht – Runde {roundNumber}
    </Text>

    {/* Punkte & Gewinner */}
    <SimpleGrid columns={players.length} gap={6} mb={8}>
        {players.map((player, idx) => (
                <Box
                    key={player}
            bg={winnerIndices.includes(idx) ? "green.100" : "white"}
            p={4}
            borderRadius="md"
            shadow="md"
            textAlign="center"
            >
            <Text fontWeight="bold">{player}</Text>
                <Text>Punkte: {scores[idx]}</Text>
    {winnerIndices.includes(idx) && (
        <Badge mt={2} colorScheme="green">
        Gewinner
        </Badge>
    )}
    </Box>
))}
    </SimpleGrid>

    {/* Übersicht der Fragen */}
    <Stack spacing={4}>
        {results.map((res, idx) => (
                <Box
                    key={idx}
            bg={res.isCorrect ? "green.50" : "red.50"}
            p={4}
            borderRadius="lg"
            shadow="sm"
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
    <Text color={res.isCorrect ? "green.600" : "red.600"} fontWeight="semibold">
        {res.isCorrect ? "Richtig ✅" : "Falsch ❌"}
        </Text>
        </Box>
))}
    </Stack>

    {onNextRound && (
        <Box textAlign="center" mt={8}>
    <button
        onClick={onNextRound}
        style={{
        backgroundColor: "#805AD5",
            color: "white",
            padding: "12px 24px",
            borderRadius: "12px",
            fontSize: "16px",
    }}
    >
        Nächste Runde starten
    </button>
    </Box>
    )}
    </Box>
);
}

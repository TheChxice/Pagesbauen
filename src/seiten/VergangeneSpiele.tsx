import { useState } from "react";
import {
    Box,
    Text,
    SimpleGrid,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    Stack,
    Flex,
    Badge,
    HStack,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

type QuestionResult = {
    question: string;
    selectedAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
};

type Duel = {
    id: string;
    opponent: string;
    date: string;
    results: QuestionResult[];
    scores: { [player: string]: number };
};

const mockDuels: Duel[] = [
    {
        id: "1",
        opponent: "Max Weber",
        date: "2026-02-17",
        scores: { "Anna Schmidt": 2, "Max Weber": 1 },
        results: [
            { question: "Frage 1", selectedAnswer: "A", correctAnswer: "A", isCorrect: true },
            { question: "Frage 2", selectedAnswer: "B", correctAnswer: "C", isCorrect: false },
            { question: "Frage 3", selectedAnswer: "D", correctAnswer: "D", isCorrect: true },
        ],
    },
    {
        id: "2",
        opponent: "Max Weber",
        date: "2026-02-15",
        scores: { "Anna Schmidt": 1, "Max Weber": 2 },
        results: [
            { question: "Frage 1", selectedAnswer: "A", correctAnswer: "B", isCorrect: false },
            { question: "Frage 2", selectedAnswer: "C", correctAnswer: "C", isCorrect: true },
        ],
    },
];

export default function PastDuelsPage() {
    const [selectedDuel, setSelectedDuel] = useState<Duel | null>(null);
    const [filter, setFilter] = useState<"all" | "win" | "lose">("all");

    const filteredDuels = mockDuels.filter((duel) => {
        const playerScore = duel.scores["Anna Schmidt"];
        const opponentScore = duel.scores[duel.opponent];
        if (filter === "win") return playerScore > opponentScore;
        if (filter === "lose") return playerScore < opponentScore;
        return true;
    });

    return (
        <Box
            minH="100vh"
            w="100vw"
            bgGradient="linear(to-br, teal.500, blue.600)"
            display="flex"
            justifyContent="center"
            alignItems="flex-start"
            py={12}
            px={4}
        >
            <Box
                w="full"
                maxW="6xl"
                bg="rgba(255, 255, 255, 0.05)"
                borderRadius="3xl"
                backdropFilter="blur(15px)"
                boxShadow="2xl"
                color="white"
                px={8}
                py={12}
            >
                <Text fontSize={["3xl", "4xl", "5xl"]} fontWeight="extrabold" textAlign="center" mb={8}>
                    Vergangene Duelle
                </Text>

                {/* Filter Buttons */}
                <Flex gap={4} mb={6} justify="center">
                    <Button colorScheme={filter === "all" ? "purple" : "gray"} onClick={() => setFilter("all")}>
                        Alle
                    </Button>
                    <Button colorScheme={filter === "win" ? "green" : "gray"} onClick={() => setFilter("win")}>
                        Siege
                    </Button>
                    <Button colorScheme={filter === "lose" ? "red" : "gray"} onClick={() => setFilter("lose")}>
                        Niederlagen
                    </Button>
                </Flex>

                {/* Duelle */}
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                    {filteredDuels.slice(0, 10).map((duel) => {
                        const playerScore = duel.scores["Anna Schmidt"];
                        const opponentScore = duel.scores[duel.opponent];
                        const isWin = playerScore > opponentScore;

                        return (
                            <Box
                                key={duel.id}
                                bg="whiteAlpha.800"
                                p={6}
                                borderRadius="2xl"
                                shadow="md"
                                cursor="pointer"
                                _hover={{ shadow: "lg", transform: "scale(1.02)" }}
                                transition="all 0.2s"
                                onClick={() => setSelectedDuel(duel)}
                                color="black"
                            >
                                <Flex justify="space-between" align="center" mb={2}>
                                    <Text fontWeight="bold">Duell mit {duel.opponent}</Text>
                                    <Badge colorScheme={isWin ? "green" : "red"}>{isWin ? "Sieg" : "Niederlage"}</Badge>
                                </Flex>
                                <Text fontSize="sm" color="gray.700" mb={2}>
                                    Datum: {duel.date}
                                </Text>
                                <HStack spacing={1}>
                                    {duel.results.map((res, idx) =>
                                        res.isCorrect ? <CheckIcon key={idx} color="green.500" /> : <CloseIcon key={idx} color="red.500" />
                                    )}
                                </HStack>
                            </Box>
                        );
                    })}
                </SimpleGrid>

                {/* Modal */}
                {selectedDuel && (
                    <Modal isOpen={selectedDuel !== null} onClose={() => setSelectedDuel(null)} size="lg" isCentered>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>
                                Duell mit {selectedDuel.opponent} am {selectedDuel.date}
                            </ModalHeader>
                            <ModalBody>
                                <Stack spacing={4} mb={4}>
                                    {selectedDuel.results.map((res, idx) => (
                                        <Box
                                            key={idx}
                                            bg={res.isCorrect ? "green.50" : "red.50"}
                                            p={4}
                                            borderRadius="md"
                                            shadow="sm"
                                        >
                                            <Text fontWeight="bold" mb={1}>
                                                Frage {idx + 1}: {res.question}
                                            </Text>
                                            <Text>
                                                Deine Antwort: <b>{res.selectedAnswer}</b>
                                            </Text>
                                            <Text>
                                                Richtige Antwort: <b>{res.correctAnswer}</b>
                                            </Text>
                                            <Badge mt={2} colorScheme={res.isCorrect ? "green" : "red"}>
                                                {res.isCorrect ? "Richtig ✅" : "Falsch ❌"}
                                            </Badge>
                                        </Box>
                                    ))}
                                </Stack>
                                <Flex justify="space-between" mt={4}>
                                    <Text fontWeight="bold">
                                        Punkte: Anna Schmidt {selectedDuel.scores["Anna Schmidt"]} | {selectedDuel.opponent}{" "}
                                        {selectedDuel.scores[selectedDuel.opponent]}
                                    </Text>
                                    <Button onClick={() => setSelectedDuel(null)}>Schließen</Button>
                                </Flex>
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                )}
            </Box>
        </Box>
    );
}

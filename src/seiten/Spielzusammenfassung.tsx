import { Box, Text, VStack, HStack, Button } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

type RoundResultFlexible =
    | {
    playerAnswerCorrect?: boolean[];
    opponentAnswerCorrect?: boolean[];
}
    | boolean[][]
    | any;

type MatchSummaryStateFlexible = {
    players?: string[];
    scores?: number[];
    roundResults?: RoundResultFlexible[];
};

export default function MatchSummaryPageWrapper() {
    const location = useLocation();
    const state = location.state as MatchSummaryStateFlexible | undefined;

    if (!state) return <FallbackScreen />;

    const players = state.players ?? ["Spieler 1", "Spieler 2"];
    const scores = state.scores ?? [0, 0];
    const roundResultsRaw = state.roundResults ?? [];

    const normalizedRounds = normalizeRounds(roundResultsRaw);

    return (
        <MatchSummaryPage
            players={players}
            scores={scores}
            roundResults={normalizedRounds}
        />
    );
}

function normalizeRounds(rounds: RoundResultFlexible[]) {
    return rounds.map((round) => {
        if (typeof round === "object" && round && "playerAnswers" in round) {
            return {
                playerAnswerCorrect: (round as any).playerAnswers ?? [],
                opponentAnswerCorrect: (round as any).opponentAnswers ?? [],
            };
        }

        if (typeof round === "object" && round && "playerAnswerCorrect" in round) {
            return {
                playerAnswerCorrect: (round as any).playerAnswerCorrect ?? [],
                opponentAnswerCorrect: (round as any).opponentAnswerCorrect ?? [],
            };
        }

        if (Array.isArray(round)) {
            return {
                playerAnswerCorrect: round[0] ?? [],
                opponentAnswerCorrect: round[1] ?? [],
            };
        }

        return {
            playerAnswerCorrect: [],
            opponentAnswerCorrect: [],
        };
    });
}

function FallbackScreen() {
    return (
        <Box
            minH="100vh"
            w="100vw"
            bgGradient="linear(to-br, teal.500, blue.600)"
            display="flex"
            justifyContent="center"
            alignItems="center"
            color="white"
        >
            <Text fontSize="2xl" fontWeight="bold">
                Keine Spieldaten verfügbar
            </Text>
        </Box>
    );
}

function MatchSummaryPage({
                              players,
                              scores,
                              roundResults,
                          }: {
    players: string[];
    scores: number[];
    roundResults: {
        playerAnswerCorrect: (boolean | null)[];
        opponentAnswerCorrect: (boolean | null)[];
    }[];
}) {
    const navigate = useNavigate();

    const getBoxColor = (value?: boolean | null) => {
        if (value === true) return "green.400";
        if (value === false) return "red.400";
        return "gray.400";
    };

    const maxScore = Math.max(...scores);
    const winnerIndex =
        scores.filter((s) => s === maxScore).length === 1
            ? scores.findIndex((s) => s === maxScore)
            : null;

    return (
        <Box
            minH="100vh"
            w="100vw"
            bgGradient="linear(to-br, teal.500, blue.600)"
            display="flex"
            justifyContent="center"
            alignItems="flex-start"
            py={12}
            px={6}
        >
            <Box
                w="full"
                maxW="6xl"
                bg="rgba(255,255,255,0.06)"
                backdropFilter="blur(20px)"
                borderRadius="3xl"
                boxShadow="2xl"
                color="white"
                px={12}
                py={14}
            >
                <Text fontSize="4xl" fontWeight="bold" mb={12} textAlign="center">
                    Spiel Zusammenfassung
                </Text>

                {/* Spielernamen + Gewinner Pokal */}
                <HStack justify="space-between" mb={14}>
                    {/* Spieler 1 */}
                    <HStack>
                        <Text fontSize="2xl" fontWeight="bold">
                            {players[0]}
                        </Text>
                        {winnerIndex === 0 && <Text fontSize="2xl">🏆</Text>}
                    </HStack>

                    {/* Spieler 2 */}
                    <HStack>
                        {winnerIndex === 1 && <Text fontSize="2xl">🏆</Text>}
                        <Text fontSize="2xl" fontWeight="bold">
                            {players[1]}
                        </Text>
                    </HStack>
                </HStack>

                {/* Runden Anzeige */}
                <VStack spacing={10}>
                    {roundResults.map((round, rIdx) => (
                        <Box key={rIdx} w="full">
                            <Text
                                fontSize="2xl"
                                fontWeight="bold"
                                textAlign="center"
                                mb={6}
                            >
                                Runde {rIdx + 1}
                            </Text>

                            <HStack justify="space-between">
                                {/* Spieler 1 Kreise */}
                                <HStack>
                                    {round.playerAnswerCorrect.map((ans, i) => (
                                        <Box
                                            key={i}
                                            w="10"
                                            h="10"
                                            bg={getBoxColor(ans)}
                                            borderRadius="full"
                                            border="2px solid white"
                                        />
                                    ))}
                                </HStack>

                                {/* Spieler 2 Kreise */}
                                <HStack>
                                    {round.opponentAnswerCorrect.map((ans, i) => (
                                        <Box
                                            key={i}
                                            w="10"
                                            h="10"
                                            bg={getBoxColor(ans)}
                                            borderRadius="full"
                                            border="2px solid white"
                                        />
                                    ))}
                                </HStack>
                            </HStack>
                        </Box>
                    ))}
                </VStack>

                {/* Zurück Button */}
                <Box mt={16} textAlign="center">
                    <Button
                        size="lg"
                        colorScheme="purple"
                        borderRadius="xl"
                        px={10}
                        py={6}
                        fontSize="lg"
                        onClick={() => navigate("/LandingPage")}
                    >
                        Zurück zur Übersicht
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}


import { Box, SimpleGrid, Stack, Text, Button, Grid } from "@chakra-ui/react";

export default function LandingPage() {
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

    const handlePlayerClick = (player: string) => {
        console.log("Spieler geklickt:", player);
    };

    return (
        <Box p={6} minH="100vh" bg="gray.50" width="100%">
            <Text fontSize="3xl" fontWeight="bold" mb={6} textAlign="center">
                QuizArena Dashboard
            </Text>

            {/* 2x2 Grid */}
            <SimpleGrid columns={2} gap={6} width="100%">
                {/* Oben links: Aktive Spieler */}
                <Box bg="white" p={6} borderRadius="2xl" shadow="md" height="100%">
                    <Text fontSize="xl" fontWeight="semibold" mb={4}>
                        Aktuell angemeldete Spieler
                    </Text>
                    <Grid templateColumns="repeat(3, 1fr)" gap={3}>
                        {activePlayers.map((player) => (
                            <Button
                                key={player}
                                size="sm"
                                colorScheme="blue"
                                onClick={() => handlePlayerClick(player)}
                            >
                                {player}
                            </Button>
                        ))}
                    </Grid>
                </Box>

                {/* Oben rechts: Scoreboard */}
                <Box bg="white" p={6} borderRadius="2xl" shadow="md" textAlign="center" height="100%">
                    <Text fontSize="xl" fontWeight="semibold" mb={4}>
                        Scoreboard – Platz 1
                    </Text>
                    <Text fontSize="lg" fontWeight="bold">
                        {topPlayer.name}
                    </Text>
                    <Text>{topPlayer.score} Punkte</Text>
                </Box>

                {/* Unten links: Aktive Spiele */}
                <Box bg="white" p={6} borderRadius="2xl" shadow="md" height="100%" overflowY="auto">
                    <Text fontSize="xl" fontWeight="semibold" mb={4}>
                        Aktive Spiele
                    </Text>
                    <Stack gap={4}>
                        {activeGames.map((game) => (
                            <Box key={game.id} p={3} borderWidth={1} borderRadius="lg">
                                <Text fontWeight="medium" mb={2}>
                                    {game.name}
                                </Text>
                                <Grid templateColumns="repeat(3, 1fr)" gap={3}>
                                    {game.players.map((player) => (
                                        <Button
                                            key={player}
                                            size="sm"
                                            colorScheme="green"
                                            onClick={() => handlePlayerClick(player)}
                                        >
                                            {player}
                                        </Button>
                                    ))}
                                </Grid>
                            </Box>
                        ))}
                    </Stack>
                </Box>

                {/* Unten rechts: Eigene Statistiken */}
                <Box bg="white" p={6} borderRadius="2xl" shadow="md" height="100%">
                    <Text fontSize="xl" fontWeight="semibold" mb={4}>
                        Eigene Statistiken
                    </Text>
                    <Stack gap={2}>
                        <Text>Gespielte Spiele: {userStats.gamesPlayed}</Text>
                        <Text>Gewonnene Spiele: {userStats.gamesWon}</Text>
                        <Text>Aktueller Punktestand: {userStats.currentScore}</Text>
                    </Stack>
                </Box>
            </SimpleGrid>
        </Box>
    );
}

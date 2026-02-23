import {
    Box,
    SimpleGrid,
    Stack,
    Text,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    Input,
    Select,
    Textarea,
    Checkbox,
    useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";

interface Player {
    name: string;
    password: string;
    courses: string[]; // Mehrfachzuordnung
}

interface Answer {
    text: string;
    isCorrect: boolean;
}

interface Question {
    course: string;
    topic: string;
    question: string;
    answers: Answer[];
}

export default function AdminDashboardPage() {
    /* ---------------- STATE ---------------- */
    const [players, setPlayers] = useState<Player[]>([
        { name: "Anna Schmidt", password: "1234", courses: ["Mathematik"] },
    ]);

    const [courses, setCourses] = useState<Record<string, string[]>>({
        Mathematik: ["Algebra"],
        Informatik: ["Programmierung"],
    });

    const [questions, setQuestions] = useState<Question[]>([]);

    /* ---------------- MODALS ---------------- */
    const newPlayerModal = useDisclosure();
    const editPlayerModal = useDisclosure();
    const newCourseModal = useDisclosure();
    const editCourseModal = useDisclosure();
    const newQuestionModal = useDisclosure();
    const editQuestionModal = useDisclosure();

    /* ---------------- PLAYER FORM ---------------- */
    const [newPlayerName, setNewPlayerName] = useState("");
    const [newPlayerPassword, setNewPlayerPassword] = useState("");
    const [newPlayerCourses, setNewPlayerCourses] = useState<string[]>([]);

    const [selectedEditPlayer, setSelectedEditPlayer] = useState("");
    const [editPlayerName, setEditPlayerName] = useState("");
    const [editPlayerPassword, setEditPlayerPassword] = useState("");
    const [editPlayerCourses, setEditPlayerCourses] = useState<string[]>([]);

    /* ---------------- COURSE FORM ---------------- */
    const [newCourseName, setNewCourseName] = useState("");
    const [newTopicName, setNewTopicName] = useState("");

    const [selectedEditCourse, setSelectedEditCourse] = useState("");
    const [editCourseName, setEditCourseName] = useState("");
    const [editCourseTopics, setEditCourseTopics] = useState<string[]>([]);
    const [newEditTopic, setNewEditTopic] = useState("");

    /* ---------------- QUESTION FORM ---------------- */
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedTopic, setSelectedTopic] = useState("");
    const [newCustomTopic, setNewCustomTopic] = useState("");
    const [newQuestionText, setNewQuestionText] = useState("");

    const [answers, setAnswers] = useState<Answer[]>([
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
    ]);

    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number | null>(null);

    /* ---------------- HELPERS ---------------- */
    const resetQuestionForm = () => {
        setSelectedCourse("");
        setSelectedTopic("");
        setNewCustomTopic("");
        setNewQuestionText("");
        setAnswers([
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
        ]);
        setSelectedQuestionIndex(null);
    };

    const resetCourseEditForm = () => {
        setSelectedEditCourse("");
        setEditCourseName("");
        setEditCourseTopics([]);
        setNewEditTopic("");
    };

    /* ---------------- HANDLER ---------------- */
    const addPlayer = () => {
        if (!newPlayerName || !newPlayerPassword || newPlayerCourses.length === 0) return;
        setPlayers([
            ...players,
            { name: newPlayerName, password: newPlayerPassword, courses: newPlayerCourses },
        ]);
        setNewPlayerName("");
        setNewPlayerPassword("");
        setNewPlayerCourses([]);
        newPlayerModal.onClose();
    };

    const updatePlayer = () => {
        setPlayers(
            players.map((p) =>
                p.name === selectedEditPlayer
                    ? { name: editPlayerName, password: editPlayerPassword, courses: editPlayerCourses }
                    : p
            )
        );
        editPlayerModal.onClose();
    };

    const deletePlayer = () => {
        setPlayers(players.filter((p) => p.name !== selectedEditPlayer));
        editPlayerModal.onClose();
    };

    const addCourse = () => {
        if (!newCourseName || !newTopicName) return;
        setCourses((prev) => ({
            ...prev,
            [newCourseName]: [newTopicName],
        }));
        setNewCourseName("");
        setNewTopicName("");
        newCourseModal.onClose();
    };

    const updateCourse = () => {
        if (!selectedEditCourse || !editCourseName) return;
        const updated = { ...courses };
        delete updated[selectedEditCourse];
        updated[editCourseName] = editCourseTopics;
        setCourses(updated);
        resetCourseEditForm();
        editCourseModal.onClose();
    };

    const deleteCourse = () => {
        if (!selectedEditCourse) return;
        const updated = { ...courses };
        delete updated[selectedEditCourse];
        setCourses(updated);
        resetCourseEditForm();
        editCourseModal.onClose();
    };

    const addQuestion = () => {
        if (!selectedCourse || !newQuestionText) return;
        let finalTopic = selectedTopic;
        if (selectedTopic === "Sonstiges" && newCustomTopic) {
            finalTopic = newCustomTopic;
            setCourses((prev) => ({
                ...prev,
                [selectedCourse]: [...prev[selectedCourse], newCustomTopic],
            }));
        }
        if (!finalTopic) return;
        setQuestions([...questions, { course: selectedCourse, topic: finalTopic, question: newQuestionText, answers }]);
        resetQuestionForm();
        newQuestionModal.onClose();
    };

    const updateQuestion = () => {
        if (selectedQuestionIndex === null) return;
        const updated = [...questions];
        updated[selectedQuestionIndex] = { course: selectedCourse, topic: selectedTopic, question: newQuestionText, answers };
        setQuestions(updated);
        editQuestionModal.onClose();
        resetQuestionForm();
    };

    const deleteQuestion = () => {
        if (selectedQuestionIndex === null) return;
        setQuestions(questions.filter((_, i) => i !== selectedQuestionIndex));
        editQuestionModal.onClose();
        resetQuestionForm();
    };

    /* ---------------- UI ---------------- */
    return (
        <>
            <Box
                minH="100vh"
                w="100vw"
                bgGradient="linear(to-br, purple.600, pink.500)"
                display="flex"
                justifyContent="center"
                alignItems="center"
                px={8}
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
                    <Text fontSize="5xl" fontWeight="extrabold" textAlign="center" mb={8}>
                        Admin Dashboard
                    </Text>

                    <SimpleGrid columns={[1, null, 2]} gap={6}>
                        {/* Spieler verwalten */}
                        <Box
                            bg="whiteAlpha.800"
                            p={6}
                            borderRadius="2xl"
                            shadow="md"
                            color="black"
                            minH="250px"
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                        >
                            <Text fontSize="xl" fontWeight="semibold" mb={4}>
                                Spieler verwalten
                            </Text>
                            <Stack spacing={3}>
                                <Button colorScheme="blue" onClick={newPlayerModal.onOpen} w="full">
                                    Neuen Spieler anlegen
                                </Button>
                                <Button colorScheme="orange" onClick={editPlayerModal.onOpen} w="full">
                                    Spieler bearbeiten
                                </Button>
                            </Stack>
                        </Box>

                        {/* Kurse verwalten */}
                        <Box
                            bg="whiteAlpha.800"
                            p={6}
                            borderRadius="2xl"
                            shadow="md"
                            color="black"
                            minH="250px"
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                        >
                            <Text fontSize="xl" fontWeight="semibold" mb={4}>
                                Kurse verwalten
                            </Text>
                            <Stack spacing={3}>
                                <Button colorScheme="green" onClick={newCourseModal.onOpen} w="full">
                                    Neuen Kurs anlegen
                                </Button>
                                <Button colorScheme="teal" onClick={editCourseModal.onOpen} w="full">
                                    Kurs bearbeiten
                                </Button>
                            </Stack>
                        </Box>

                        {/* Fragen verwalten */}
                        <Box
                            bg="whiteAlpha.800"
                            p={6}
                            borderRadius="2xl"
                            shadow="md"
                            color="black"
                            minH="250px"
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                        >
                            <Text fontSize="xl" fontWeight="semibold" mb={4}>
                                Fragen verwalten
                            </Text>
                            <Stack spacing={3}>
                                <Button colorScheme="purple" onClick={newQuestionModal.onOpen} w="full">
                                    Neue Frage
                                </Button>
                                <Button colorScheme="pink" onClick={editQuestionModal.onOpen} w="full">
                                    Frage bearbeiten
                                </Button>
                            </Stack>
                        </Box>

                        {/* Statistiken unten rechts */}
                        <Box
                            bg="whiteAlpha.800"
                            p={6}
                            borderRadius="2xl"
                            shadow="md"
                            color="black"
                            minH="250px"
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            textAlign="center"
                        >
                            <Text fontSize="xl" fontWeight="semibold" mb={4}>
                                Statistiken
                            </Text>
                            <Stack spacing={2}>
                                <Text>Gesamtspieler: {players.length}</Text>
                                <Text>Gesamtkurse: {Object.keys(courses).length}</Text>
                                <Text>Gesamtfragen: {questions.length}</Text>
                            </Stack>
                        </Box>
                    </SimpleGrid>
                </Box>
            </Box>

            {/* ---------------- MODALS ---------------- */}

            {/* Neuer Spieler */}
            <Modal isOpen={newPlayerModal.isOpen} onClose={newPlayerModal.onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Neuer Spieler</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={3}>
                            <Input placeholder="Name" value={newPlayerName} onChange={e => setNewPlayerName(e.target.value)} />
                            <Input placeholder="Passwort" type="password" value={newPlayerPassword} onChange={e => setNewPlayerPassword(e.target.value)} />
                            <Text>Kursteilnahme wählen</Text>
                            {Object.keys(courses).map(c => (
                                <Checkbox
                                    key={c}
                                    isChecked={newPlayerCourses.includes(c)}
                                    onChange={e => {
                                        if (e.target.checked) setNewPlayerCourses([...newPlayerCourses, c]);
                                        else setNewPlayerCourses(newPlayerCourses.filter(course => course !== c));
                                    }}
                                >
                                    {c}
                                </Checkbox>
                            ))}
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={addPlayer}>Speichern</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Spieler bearbeiten */}
            <Modal isOpen={editPlayerModal.isOpen} onClose={editPlayerModal.onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Spieler bearbeiten</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={3}>
                            <Select placeholder="Spieler wählen" onChange={e => {
                                const p = players.find(p => p.name === e.target.value);
                                if (!p) return;
                                setSelectedEditPlayer(p.name);
                                setEditPlayerName(p.name);
                                setEditPlayerPassword(p.password);
                                setEditPlayerCourses([...p.courses]);
                            }}>
                                {players.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
                            </Select>
                            <Input placeholder="Neuer Name" value={editPlayerName} onChange={e => setEditPlayerName(e.target.value)} />
                            <Input placeholder="Neues Passwort" value={editPlayerPassword} onChange={e => setEditPlayerPassword(e.target.value)} />
                            <Text>Kursteilnahme wählen</Text>
                            {Object.keys(courses).map(c => (
                                <Checkbox
                                    key={c}
                                    isChecked={editPlayerCourses.includes(c)}
                                    onChange={e => {
                                        if (e.target.checked) setEditPlayerCourses([...editPlayerCourses, c]);
                                        else setEditPlayerCourses(editPlayerCourses.filter(course => course !== c));
                                    }}
                                >
                                    {c}
                                </Checkbox>
                            ))}
                        </Stack>
                    </ModalBody>
                    <ModalFooter justifyContent="space-between">
                        <Button colorScheme="red" onClick={deletePlayer}>Löschen</Button>
                        <Button colorScheme="orange" onClick={updatePlayer}>Speichern</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Kurse und Fragen Modals bleiben unverändert */}
            {/* Neuer Kurs */}
            <Modal isOpen={newCourseModal.isOpen} onClose={newCourseModal.onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Neuer Kurs</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={3}>
                            <Input placeholder="Kursname" value={newCourseName} onChange={e => setNewCourseName(e.target.value)} />
                            <Input placeholder="Erstes Themengebiet" value={newTopicName} onChange={e => setNewTopicName(e.target.value)} />
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="green" onClick={addCourse}>Speichern</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Kurs bearbeiten */}
            <Modal isOpen={editCourseModal.isOpen} onClose={editCourseModal.onClose} isCentered size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Kurs bearbeiten</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={3}>
                            <Select placeholder="Kurs wählen" onChange={e => {
                                const c = e.target.value;
                                if (!c) return;
                                setSelectedEditCourse(c);
                                setEditCourseName(c);
                                setEditCourseTopics([...courses[c]]);
                            }}>
                                {Object.keys(courses).map(c => <option key={c} value={c}>{c}</option>)}
                            </Select>
                            <Input placeholder="Neuer Kursname" value={editCourseName} onChange={e => setEditCourseName(e.target.value)} />
                            <Text>Themengebiete bearbeiten</Text>
                            {editCourseTopics.map((t, i) => (
                                <Input key={i} value={t} onChange={e => {
                                    const updated = [...editCourseTopics];
                                    updated[i] = e.target.value;
                                    setEditCourseTopics(updated);
                                }} />
                            ))}
                            <Input placeholder="Neues Thema hinzufügen" value={newEditTopic} onChange={e => setNewEditTopic(e.target.value)} />
                            <Button mt={2} onClick={() => {
                                if (!newEditTopic.trim()) return;
                                setEditCourseTopics([...editCourseTopics, newEditTopic]);
                                setNewEditTopic("");
                            }}>Hinzufügen</Button>
                        </Stack>
                    </ModalBody>
                    <ModalFooter justifyContent="space-between">
                        <Button colorScheme="red" onClick={deleteCourse}>Löschen</Button>
                        <Button colorScheme="green" onClick={updateCourse}>Speichern</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Neue Frage */}
            <Modal isOpen={newQuestionModal.isOpen} onClose={newQuestionModal.onClose} size="lg" isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Neue Frage</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={3}>
                            <Select placeholder="Kurs wählen" value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)}>
                                {Object.keys(courses).map(c => <option key={c} value={c}>{c}</option>)}
                            </Select>
                            <Select placeholder="Thema wählen" isDisabled={!selectedCourse} value={selectedTopic} onChange={e => { setSelectedTopic(e.target.value); if (e.target.value !== "Sonstiges") setNewCustomTopic(""); }}>
                                {selectedCourse && courses[selectedCourse].map(t => <option key={t} value={t}>{t}</option>)}
                                <option value="Sonstiges">Sonstiges</option>
                            </Select>
                            {selectedTopic === "Sonstiges" && <Input placeholder="Neues Thema" value={newCustomTopic} onChange={e => setNewCustomTopic(e.target.value)} />}
                            <Textarea placeholder="Fragetext" value={newQuestionText} onChange={e => setNewQuestionText(e.target.value)} />
                            {answers.map((a, i) => (
                                <Stack key={i} direction="row">
                                    <Input value={a.text} onChange={e => { const updated = [...answers]; updated[i].text = e.target.value; setAnswers(updated); }} />
                                    <Checkbox isChecked={a.isCorrect} onChange={e => { const updated = [...answers]; updated[i].isCorrect = e.target.checked; setAnswers(updated); }}>Richtig</Checkbox>
                                </Stack>
                            ))}
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="purple" onClick={addQuestion}>Speichern</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Frage bearbeiten */}
            <Modal isOpen={editQuestionModal.isOpen} onClose={editQuestionModal.onClose} size="lg" isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Frage bearbeiten</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={3}>
                            <Select placeholder="Frage auswählen" onChange={e => {
                                const index = Number(e.target.value);
                                const q = questions[index];
                                if (!q) return;
                                setSelectedQuestionIndex(index);
                                setSelectedCourse(q.course);
                                setSelectedTopic(q.topic);
                                setNewQuestionText(q.question);
                                setAnswers(q.answers);
                            }}>
                                {questions.map((q, i) => <option key={i} value={i}>{q.question}</option>)}
                            </Select>
                            <Textarea value={newQuestionText} onChange={e => setNewQuestionText(e.target.value)} />
                            {answers.map((a, i) => (
                                <Stack key={i} direction="row">
                                    <Input value={a.text} onChange={e => { const updated = [...answers]; updated[i].text = e.target.value; setAnswers(updated); }} />
                                    <Checkbox isChecked={a.isCorrect} onChange={e => { const updated = [...answers]; updated[i].isCorrect = e.target.checked; setAnswers(updated); }}>Richtig</Checkbox>
                                </Stack>
                            ))}
                        </Stack>
                    </ModalBody>
                    <ModalFooter justifyContent="space-between">
                        <Button colorScheme="red" onClick={deleteQuestion}>Löschen</Button>
                        <Button colorScheme="pink" onClick={updateQuestion}>Speichern</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

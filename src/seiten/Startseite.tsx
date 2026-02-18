export type Course = {
    id: string;
    name: string;
    description: string;
    supervisors: string[]; // Admin players
};

// Mock Data (Replace later with API data)
const mockCourses: Course[] = [
    {
        id: "1",
        name: "Allgemeinwissen Master",
        description: "Fortgeschrittene Fragen aus allen Kategorien",
        supervisors: ["Anna Schmidt"],
    },
    {
        id: "2",
        name: "Science & Tech",
        description: "Naturwissenschaften, IT und Technik",
        supervisors: ["Lisa Wagner"],
    },
    {
        id: "3",
        name: "History & Culture",
        description: "Geschichte, Politik und Kulturwissen",
        supervisors: ["Thomas Becker"],
    },
];

export default function StartPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="w-full border-b bg-white">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">QuizArena</h1>

                    <button className="px-4 py-2 rounded-xl border hover:bg-gray-100 transition">
                        Login
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="max-w-6xl mx-auto px-6 py-12">
                <div className="space-y-4">
                    <h2 className="text-4xl font-bold tracking-tight">
                        Willkommen bei QuizArena
                    </h2>

                    <p className="text-lg opacity-80 max-w-2xl">
                        Trainiere dein Wissen, tritt gegen andere Spieler an und verbessere
                        deine Fähigkeiten in verschiedenen Wissensgebieten.
                    </p>
                </div>
            </section>

            {/* Courses Section */}
            <section className="max-w-6xl mx-auto px-6 pb-16">
                <h3 className="text-2xl font-semibold mb-6">Verfügbare Kurse</h3>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockCourses.map((course) => (
                        <div
                            key={course.id}
                            className="rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow p-6 space-y-3"
                        >
                            <h4 className="text-xl font-semibold">{course.name}</h4>

                            <p className="text-sm opacity-80">{course.description}</p>

                            <div className="pt-2">
                                <p className="text-xs opacity-60 mb-1">Betreuer: {course.supervisors.map((sup) => (
                                    <span
                                        key={sup}
                                        className="text-xs px-2 py-1 rounded-lg border"
                                    >
                      {sup}
                    </span>
                                ))}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

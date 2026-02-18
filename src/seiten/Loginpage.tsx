
export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-sm">
                {/* Titel */}
                <h1 className="text-3xl font-bold text-center mb-8">Login</h1>

                {/* Benutzername */}
                <div className="mb-6 flex flex-col">
                    <label
                        htmlFor="username"
                        className="text-sm font-medium mb-2"
                    >
                    </label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Benutzername"
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Passwort */}
                <div className="mb-6 flex flex-col">
                    <label
                        htmlFor="password"
                        className="text-sm font-medium mb-2"
                    >
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Passwort"
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Login Button */}
                <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                    Einloggen
                </button>
            </div>
        </div>
    );
}

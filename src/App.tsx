
import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Startseite from './seiten/Startseite.tsx';
import LoginPage from "./seiten/Loginpage.tsx";
import LandingpageUser from "./seiten/LandingpageUser.tsx";
import MainGame from "./seiten/MainGame.tsx";
import Rundenzusammenfassung from "./seiten/Rundenzusammenfassung.tsx";
import VergangeneSpiele from "./seiten/VergangeneSpiele.tsx";
import Dashboard from "./components/Dashboard.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard/>} />
            </Routes>
        </Router>
    );
}

export default App;

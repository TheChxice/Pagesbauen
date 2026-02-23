
import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Startseite from './seiten/Startseite.tsx';
import LoginPage from "./seiten/Loginpage.tsx";
import LandingpageUser from "./seiten/LandingpageUser.tsx";
import MainGame from "./seiten/MainGame.tsx";
import VergangeneSpiele from "./seiten/VergangeneSpiele.tsx";
import MatchSummaryPage from "./seiten/Spielzusammenfassung.tsx";
import AdminPage from "./seiten/AdminPage.tsx"

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Startseite/>} />
                <Route path="/LandingPage" element={<LandingpageUser/>} />
                <Route path="/maingame" element={<MainGame />} />
                <Route path="/past-games" element={<VergangeneSpiele />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/match-summary" element={<MatchSummaryPageWrapper />} />
                <Route path="/admin" element={<AdminPage />} />
            </Routes>
        </Router>
    );
}
import { useLocation } from "react-router-dom";
function MatchSummaryPageWrapper() {
    const { state } = useLocation();
    return state ? <MatchSummaryPage {...state} /> : <Text>Keine Spieldaten verfügbar</Text>;
}



export default App;

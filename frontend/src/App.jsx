import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import ChallengesPage from './pages/ChallengesPage';
import ChallengePage from './pages/ChallengePage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/challenges" element={<ChallengesPage />} />
        <Route path="/challenge/:id" element={<ChallengePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Layout>
  );
}

export default App;

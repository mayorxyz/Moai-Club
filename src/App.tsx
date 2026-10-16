import { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

// Route-level code splitting: each page is its own chunk and only downloads
// when the user navigates to it, instead of bundling every page up front.
const Home = lazy(() => import('./pages/Home'));
const Mint = lazy(() => import('./pages/Mint'));
const Collection = lazy(() => import('./pages/Collection'));
const NFTDetail = lazy(() => import('./pages/NFTDetail'));
const MyNFTs = lazy(() => import('./pages/MyNFTs'));
const Allowlist = lazy(() => import('./pages/Allowlist'));
const Roadmap = lazy(() => import('./pages/Roadmap'));
const Team = lazy(() => import('./pages/Team'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Provenance = lazy(() => import('./pages/Provenance'));
const Security = lazy(() => import('./pages/Security'));
const Transparency = lazy(() => import('./pages/Transparency'));
const Rarity = lazy(() => import('./pages/Rarity'));
const Activity = lazy(() => import('./pages/Activity'));
const Leaderboard = lazy(() => import('./pages/Leaderboard'));
const Community = lazy(() => import('./pages/Community'));
const Press = lazy(() => import('./pages/Press'));
const Artist = lazy(() => import('./pages/Artist'));
const Updates = lazy(() => import('./pages/Updates'));
const UpdateDetail = lazy(() => import('./pages/UpdateDetail'));
const Help = lazy(() => import('./pages/Help'));
const Soon = lazy(() => import('./pages/Soon'));
const Reveal = lazy(() => import('./pages/Reveal'));
const ShareCard = lazy(() => import('./pages/ShareCard'));
const Holder = lazy(() => import('./pages/Holder'));
const Staking = lazy(() => import('./pages/Staking'));
const Claim = lazy(() => import('./pages/Claim'));
const Admin = lazy(() => import('./pages/Admin'));

import config from './drop.config';

function PageFallback() {
  return (
    <div className="section" style={{ textAlign: 'center', padding: '60px 16px' }}>
      <div className="skeleton" style={{ height: 24, width: 240, maxWidth: '80%', margin: '0 auto 14px' }} />
      <div className="skeleton" style={{ height: 14, width: 320, maxWidth: '90%', margin: '0 auto 10px' }} />
      <div className="skeleton" style={{ height: 14, width: 200, maxWidth: '70%', margin: '0 auto' }} />
      <p style={{ marginTop: 18, fontSize: 13, opacity: 0.7 }}>Loading…</p>
    </div>
  );
}

export default function App() {
  const isPrelaunch = config.prelaunch.enabled && new Date(config.prelaunch.launchTime).getTime() > Date.now();

  return (
    <HashRouter>
      <Layout>
        <Suspense fallback={<PageFallback />}>
          <Routes>
          <Route path="/" element={isPrelaunch ? <Navigate to="/soon" replace /> : <Home />} />
          <Route path="/soon" element={<Soon />} />
          <Route path="/mint" element={<Mint />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/collection/:tokenId" element={<NFTDetail />} />
          <Route path="/my-nfts" element={<MyNFTs />} />
          <Route path="/allowlist" element={<Allowlist />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/team" element={<Team />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/provenance" element={<Provenance />} />
          <Route path="/security" element={<Security />} />
          <Route path="/transparency" element={<Transparency />} />
          <Route path="/rarity" element={<Rarity />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/community" element={<Community />} />
          <Route path="/press" element={<Press />} />
          <Route path="/artist" element={<Artist />} />
          <Route path="/updates" element={<Updates />} />
          <Route path="/updates/:id" element={<UpdateDetail />} />
          <Route path="/help" element={<Help />} />
          <Route path="/reveal" element={<Reveal />} />
          <Route path="/share/:tokenId" element={<ShareCard />} />
          <Route path="/holder" element={<Holder />} />
          <Route path="/staking" element={<Staking />} />
          <Route path="/claim" element={<Claim />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </HashRouter>
  );
}

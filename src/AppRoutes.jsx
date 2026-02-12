import { Routes, Route } from 'react-router-dom';

// Home Group
import RootLayout from './layouts/root-navbar/RootLayout';
import Home from './layouts/root-navbar/Home';
import Info from './layouts/root-navbar/Info';
import Create from './layouts/root-navbar/Create';
import Saved from './layouts/root-navbar/Saved';
import Login from './layouts/root-navbar/Login';

// Rule Search Group
import Rules from './layouts/rules-tabs/Rules';
import RulesLayout from './layouts/rules-tabs/RulesLayout';
import Ancestry from './layouts/rules-tabs/Ancestry';
import Backgrounds from './layouts/rules-tabs/Backgrounds';
import Classes from './layouts/rules-tabs/Classes';
import Skills from './layouts/rules-tabs/Skills';
import Feats from './layouts/rules-tabs/Feats';

// Character Sheet Group
import CharacterLayout from './layouts/character-tabs/CharacterLayout';
import Overview from './layouts/character-tabs/Overview';
import Stats from './layouts/character-tabs/Stats';
import Features from './layouts/character-tabs/Features';
import Inventory from './layouts/character-tabs/Inventory';



const AppRoutes = () => (
  <Routes>
    {/* Home Group */}
    <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="info" element={<Info />} />
        <Route path="create" element={<Create />} />
        <Route path="saved" element={<Saved />} />
        <Route path="login" element={<Login />} />

        {/* Rule search Group */}
        <Route path="/rules" element={<RulesLayout />}>
            <Route index element={<Rules />} />
            <Route path="backgrounds" element={<Backgrounds />} />
            <Route path="classes" element={<Classes />} />
            <Route path="ancestry" element={<Ancestry />} />
            <Route path="skills" element={<Skills />} />
            <Route path="feats" element={<Feats />} />
        </Route>

        {/* Character Sheet Group */}
        <Route path="/character" element={<CharacterLayout />}>
            <Route index element={<Overview />} />
            <Route path="stats" element={<Stats />} />
            <Route path="features" element={<Features />} />
            <Route path="inventory" element={<Inventory />} />
        </Route>
    </Route>
  </Routes>
);

export default AppRoutes;
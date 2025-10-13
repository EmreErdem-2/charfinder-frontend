import { Routes, Route } from 'react-router-dom';

// Home Group
import RootLayout from './layouts/root-navbar/RootLayout';
import Home from './layouts/root-navbar/Home';
import Info from './layouts/root-navbar/Info';
import Rules from './layouts/root-navbar/Rules';
import Saved from './layouts/root-navbar/Saved';

// Character Creation Group
import CreateLayout from './layouts/create-tabs/CreateLayout';
import Ancestry from './layouts/create-tabs/Ancestry';
import Backgrounds from './layouts/create-tabs/Backgrounds';
import Classes from './layouts/create-tabs/Classes';
import Skills from './layouts/create-tabs/Skills';
import Feats from './layouts/create-tabs/Feats';

import { CreationProgressProvider } from './layouts/create-tabs/CreationProgressContext';


// Character Sheet Group
import CharacterLayout from './layouts/character-tabs/CharacterLayout';
import Overview from './layouts/character-tabs/Overview';
import Stats from './layouts/character-tabs/Stats';
import Features from './layouts/character-tabs/Features';
import Inventory from './layouts/character-tabs/Inventory';
import Create from './layouts/create-tabs/Create';



const AppRoutes = () => (
  <Routes>
    {/* Home Group */}
    <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="info" element={<Info />} />
        <Route path="rules" element={<Rules />} />
        <Route path="saved" element={<Saved />} />

        {/* Character Creation Group */}
        <Route path="/create" element={<CreationProgressProvider><CreateLayout /></CreationProgressProvider>}>
            <Route index element={<Create />} />
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
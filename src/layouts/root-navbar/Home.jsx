import {Link} from "react-router-dom"
import './Home.css'; // optional: for styling
import { CharacterCreation } from "../../components/CharacterCreation";


const Home = () => {
  return (
    <>        
        <div className="home-container">
        <header className="home-header">
            <h1>🧙 Pathfinder 2e Character Builder</h1>
            <p>Create your hero. Shape your destiny.</p>
        </header>

        <section className="home-intro">
            <h2>What is Pathfinder 2e?</h2>
            <p>
            Pathfinder Second Edition is a tabletop roleplaying system focused on tactical combat, rich character customization, and deep storytelling. Build your character from ancestry to feats and spells.
            </p>
        </section>

        <section className="home-actions">
            <h2>Get Started</h2>
            <ul>
            <li><Link to="/create">🛠️ Start Character Creation</Link></li>
            <li><Link to="/rules">📚 View Rules Reference</Link></li>
            <li><Link to="/saved">💾 Load Saved Characters</Link></li>
            </ul>
        </section>
        
        <footer className="home-footer">
            <p>Built for Pathfinder fans. Not affiliated with Paizo.</p>
        </footer>
        </div>
    </>
    
  );
};

export default Home;
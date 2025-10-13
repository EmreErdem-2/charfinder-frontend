import {Link} from "react-router-dom"


const Saved = () => {

    return (
        <section className="home-actions">
            <h2>Get Started</h2>
            {/* Get list of characters and show it with a list */}
            <ul>
                <li><Link to="/character">🛠️ Halolo</Link></li>
                <li><Link to="/character">📚 Zabalo</Link></li>
                <li><Link to="/character">💾 Zenaya</Link></li>
            </ul>
        </section>
    );
}
<div>Saved Content</div>;

export default Saved
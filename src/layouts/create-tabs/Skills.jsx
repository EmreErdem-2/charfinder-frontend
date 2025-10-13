import '../NavButton.css'
import NavButton from '../NavButton'



const Skills = () => {

    return (
        <>


            <div>This Skills</div>


            <div className="nav-buttons">
                <NavButton to="/create/classes" label="Back" />
                <NavButton to="/create/feats" label="Next" />
            </div>
        </>
    )
}

export default Skills
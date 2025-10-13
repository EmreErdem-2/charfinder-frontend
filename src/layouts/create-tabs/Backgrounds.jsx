import '../NavButton.css'
import NavButton from '../NavButton'



const Backgrounds = () => {

    return (
        <>

            <div>This Backgrounds</div>



            <div className="nav-buttons">
                <NavButton to="/create/ancestry" label="Back" />
                <NavButton to="/create/classes" label="Next" />
            </div>
        </>
    )
}

export default Backgrounds
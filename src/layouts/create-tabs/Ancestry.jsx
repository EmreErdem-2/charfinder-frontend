import '../NavButton.css'
import NavButton from '../NavButton'



const Ancestry = () => {

    return (
        <>

            <div>This Ancestry</div>


            <div className="nav-buttons">
                <NavButton to="/create" label="Back" />
                <NavButton to="/create/backgrounds" label="Next" />
            </div>
        </>
    )
}

export default Ancestry
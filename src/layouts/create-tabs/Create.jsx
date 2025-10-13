import '../NavButton.css'
import NavButton from '../NavButton'



const Create = () => {

    return (
        <>


            <div>This Base</div>


            <div className="nav-buttons">
                <NavButton to="/" label="Back" />
                <NavButton to="/create/ancestry" label="Next" />
            </div>
        </>
    )
}

export default Create
import '../NavButton.css'
import NavButton from '../NavButton'
import DataList from '../../components/DataList'



const Classes = () => {

    return (
        <>

            <div>This Classes</div>

            <DataList type='classes' />

            <div className="nav-buttons">
                <NavButton to="/create/backgrounds" label="Back" />
                <NavButton to="/create/skills" label="Next" />
            </div>
        </>
    )
}

export default Classes
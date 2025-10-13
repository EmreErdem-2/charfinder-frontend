import '../NavButton.css'
import NavButton from '../NavButton'
import InfoComponent from '../../components/InfoComponent'
import DataList from '../../components/DataList'


const Feats = () => {

    //const [feats, setFeats] = useState([]);

    return (
        <>

            <div>This Feats</div>

            <DataList type='feats' />
            <InfoComponent title={"Intimidating Glare"} header={"Intimidation"} info={"Glare that intimidates"} />
            <InfoComponent title={"Intimidating Glare"} header={"Intimidation"} info={"Glare that intimidates"} />
            <InfoComponent title={"Intimidating Glare"} header={"Intimidation"} info={"Glare that intimidates"} />

            <div className="nav-buttons">
                <NavButton to="/create/skills" label="Back" />
                <NavButton to="/create" label="Finish" />
            </div>
        </>
    )
}

export default Feats
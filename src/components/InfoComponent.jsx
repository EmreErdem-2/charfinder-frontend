
const InfoComponent = ({ title, header, info }) => {
    return (
        <div>
            <div className="infocomponent-title">
                <h1>{title}</h1>
            </div>
            <p>--------------------------------------------------------------------------------------</p>
            <div className="infocomponent-header">
                <p>This is a Header:</p>
                <p>{header}</p>
            </div>
            <p>--------------------------------------------------------------------------------------</p>
            <div className="infocomponent-info">
                <p>This is the info part:</p>
                <p>{info}</p>
            </div>
        </div>
    );
};

export default InfoComponent;
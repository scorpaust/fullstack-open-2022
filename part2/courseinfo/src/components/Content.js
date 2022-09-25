import Part from "./Part";
import Total from "./Total";

const Content = ({parts}) => {

    return (
        <div>
            {parts.map((part, i) => <p key={i} style={{listStyleType: 'none'}}><Part name={part.name} exercises={part.exercises} /></p>)}
            <Total parts={parts} />
        </div>
    );
}


export default Content;
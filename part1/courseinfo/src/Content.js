import Part from "./Part";

const Content = (props) => {

    console.log(props.program.part1);

    return (
        <div>
            <Part name={props.program.part1} exercises={props.program.exercises1} />
            <Part name={props.program.part2} exercises={props.program.exercises2} />
            <Part name={props.program.part3} exercises={props.program.exercises3} />
        </div>
    );
}

export default Content;
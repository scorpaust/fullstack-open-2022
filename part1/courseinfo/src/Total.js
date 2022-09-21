const Total = (props) => {

    console.log(props.parts)

    const totalExNumber = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises

    return (
        <div>
            <p>Number of exercises {totalExNumber}</p>
        </div>
    );
    
}

export default Total;
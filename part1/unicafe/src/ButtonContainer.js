import AppButton from "./AppButton";

const ButtonContainer = (props) => {
    
    return (
        <>
            <AppButton handleClick={props.stats[0].handleButton} text={props.stats[0].name} />
            <AppButton handleClick={props.stats[1].handleButton} text={props.stats[1].name} />
            <AppButton handleClick={props.stats[2].handleButton} text={props.stats[2].name} />
        </>
    );
}


export default ButtonContainer;
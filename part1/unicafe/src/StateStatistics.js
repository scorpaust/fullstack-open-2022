import StatisticLine from "./StatisticLine";

const StateStatistics = (props) => {
    
    const avg = ((props.stats[0].int * props.stats[0].total) + (props.stats[1].int * props.stats[1].total) + 
    (props.stats[2].int * props.stats[2].total)) / props.stats[3].total;

    const posCount = props.stats[0].total / props.stats[3].total;

    const positive = (posCount * 100).toFixed(1).toString() + "%";
    
    return (
        <div>
            <table>
                <tr>
                    <StatisticLine text={props.stats[0].name} value={props.stats[0].total} />
                </tr>
                <tr>
                    <StatisticLine text={props.stats[1].name} value={props.stats[1].total} />
                </tr>
                <tr>
                    <StatisticLine text={props.stats[2].name} value={props.stats[2].total} />
                </tr>
                <tr>
                    <StatisticLine text={props.stats[3].name} value={props.stats[3].total} />
                </tr>
                <tr>
                    <StatisticLine text="avg" value={avg} />
                </tr>
                <tr>
                    <StatisticLine text="positive" value={positive} />
                </tr>
            </table>
        </div>
    );
}

export default StateStatistics;
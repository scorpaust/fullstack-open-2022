const Filter = ({newFilter, handleNewFilter}) => {
    return (
        <>
            find countries <input value={newFilter} onChange={handleNewFilter} />
        </>
    )
}

export default Filter;
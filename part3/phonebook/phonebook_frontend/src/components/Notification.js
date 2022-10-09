const Notification = ({ message, error }) => {

    const notStyle = {
        color: error ? 'red' : 'green',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

    if (message === null) {
      return null
    }
  
    return (
      <div style={notStyle}>
        {message}
      </div>
    )
}

export default Notification;
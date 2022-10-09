const Person = ({ id, name, phoneNumber, remove }) => {

    return (
      <li>
        {name} {phoneNumber}
        <button onClick={() => remove(id, name)}>delete</button>
      </li>
    )
  }
  
  export default Person;
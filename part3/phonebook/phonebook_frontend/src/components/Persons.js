import Person from "./Person";

const Persons = ({contactsToShow, deleteFunc}) => {
    return (
        <ul>
            {contactsToShow.map(person => <Person key={person.id} name={person.name} phoneNumber={person.number} id={person.id} remove={deleteFunc}/>)}
        </ul>
    )
}

export default Persons;
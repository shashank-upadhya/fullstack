import Person from "./Person"
const Person_list = ({ personsToShow , deleteName}) => {
    return (
        <ul>
            {personsToShow.map(persons =>
                <Person key={persons.id} id={persons.id} name={persons.name} number={persons.number} deleteName={deleteName}/>
            )}
        </ul>
    )
}

export default Person_list
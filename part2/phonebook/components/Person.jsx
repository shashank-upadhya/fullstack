// const Person = ({id,name,number,deleteName}) => {

//     return (
//         <li>
//             {name} {number} <button onClick={()=>deleteName(id,name)}>Delete</button>
//         </li>
//     )
// }

// export default Person

const Person = ({id, name, number, deleteName}) => {
    console.log('Person component received ID:', id, 'Name:', name) // ADD THIS DEBUG LINE
    
    return (
        <li>
            {name} {number} 
            <button onClick={() => deleteName(id, name)}>Delete</button>
        </li>
    )
}

export default Person
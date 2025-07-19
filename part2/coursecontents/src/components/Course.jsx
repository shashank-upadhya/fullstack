
const Header = ({ name }) => <h2>{name}</h2>

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(name => <Part key={name.id} content={name} />)}
        </div>
    )
}

const Part = ({ content }) => {
    return (
        <div>
            <p>{content.name} {content.exercises}</p>
        </div>
    )
}

const Total = ({ value }) => {
    const totalExercises = value.reduce((total, curValue) => total + curValue.exercises, 0)
    return (
        <div>
            <b>total of {totalExercises} exercises</b>
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total value={course.parts} />
        </div>

    )
}

export default Course
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  const Header = (props) => {
    return (
      <div>
        <h1>{props.c}</h1>
      </div>
    )
  }

  const Part = (props) => {
    return (
      <p>{props.part.name} {props.part.exercises}</p>
    )
  }

  const Content = (props) => {
    return (
      <div>
        <Part part={props.p[0]}></Part>
        <Part part={props.p[1]}></Part>
        <Part part={props.p[2]}></Part>
      </div>
    )
  }

  const Total = (props) => {
    return (
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    )
  }

  return (
    <div>
      <Header c={course.name} />
      <Content p={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </div >
  )
}

export default App
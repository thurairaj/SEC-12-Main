import './App.css'
import Header from "./component/Header.jsx";
import UseCard from "./component/UseCard.jsx";
import TaskList from "./component/TaskList.jsx";
import Counter from "./component/Counter.jsx";
import Users from "./component/Users.jsx";

function App() {
    let henryRole = "Admin"
    let tasks = [
        {title: "Breakfast", id: 1},
        {title: "Lunch", id: 2},
        {title: "Teatime", id: 3},
        {title: "Dinner", id: 4},
    ]

    let onDelete = () => {}
  return (
    <div>
        <Header/>
        {/*<UseCard name="Henry" role={henryRole}></UseCard>*/}
        {/*<TaskList tasks={tasks} onDelete={onDelete}></TaskList>*/}
        {/*<Counter></Counter>*/}
        <Users></Users>
    </div>
  )
}

export default App

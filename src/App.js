import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTask] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const taskFromServer = await fetchTasks()
      setTask(taskFromServer);
    }
    getTasks();
  }, []
  );

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();

    return data;
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;
  }

  const addTast = async (task) => {
    console.log(task);
    // const id = Math.floor(Math.random() * 100000000) + 1
    // const newTask = { id, ...task }
    // setTask([...tasks, newTask])

    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task),
    });
    const data = await res.json()
    setTask([...tasks, data])

  }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    });
    setTask(tasks.filter((task) => task.id !== id))
  }

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask),
    });

    setTask(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task))
  }

  return (
    <Router>
      <div className='container'>
        <Route path='/' exact render={(props) => (<>
          {showAddTask && <AddTask onAdd={addTast}></AddTask>}
          <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}></Header>
          {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}></Tasks>) : (<h3>No task to show</h3>)}
        </>)}></Route>
        <Route path='/about' component={About}></Route>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;

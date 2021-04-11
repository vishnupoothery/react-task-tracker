import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import { useState } from 'react';

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTask] = useState([
    {
      id: 1,
      text: 'Doctors Appointment',
      day: 'Feb 5th at 2:30pm',
      reminder: true,
    },
    {
      id: 2,
      text: 'Meeting',
      day: 'Feb 6th at 3:30pm',
      reminder: true,
    },
    {
      id: 3,
      text: 'Shopping',
      day: 'Feb 5th at 3:30pm',
      reminder: false,
    },
  ])

  const addTast = (task) => {
    const id = Math.floor(Math.random() * 100000000) + 1
    const newTask = { id, ...task }
    setTask([...tasks, newTask])
  }

  const deleteTask = (id) => {
    setTask(tasks.filter((task) => task.id !== id))
  }

  const toggleReminder = (id) => {
    setTask(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task))
  }

  return (
    <div className='container'>
      {showAddTask && <AddTask onAdd={addTast}></AddTask>}
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}></Header>
      {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}></Tasks>) : (<h3>No task to show</h3>)}
    </div>
  );
}

export default App;

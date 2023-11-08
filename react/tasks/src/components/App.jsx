import './App.css';
import { useState } from 'react';
import Task from './Task';

function App() {

  // Déclaration de l'état tasks qui est un tableau d'objets de task
  const [tasks, setTasks] = useState([
    { id: 1, name: "Faire la vaisselle", done: false },
    { id: 2, name: "Essuyer la vaisselle", done: false },
    { id: 3, name: "Ranger la vaisselle", done: true }
  ]);

  function handleClickValidate(id) {
    console.log(`Dans handleClickValidate, id : `, id);
    // Changer le done qui se trouve dans l'état tasks
    const taskUpdated = tasks.map(task => {
      if(task.id === id) task.done = !task.done;
      return task
    })

    // Modification du state en utilisant setTasks
    setTasks(taskUpdated)
  }

  return (
    <div className="App container">
      <h1>Gestions des tâches</h1>
      {tasks.map((task) =>
        <Task
          key={task.id}
          task={task}
          onClickValidate={handleClickValidate}
        />)}

    </div>
  );
}

export default App;


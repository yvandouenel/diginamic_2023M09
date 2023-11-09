import './App.css';
import { useState } from 'react';
import Task from './Task';

function App() {

  // Déclaration de l'état tasks qui est un tableau d'objets de task
  const [tasks, setTasks] = useState([
    { id: 1, name: "Faire la vaisselle", done: false },
    { id: 2, name: "Essuyer la vaisselle", done: true },
    { id: 3, name: "Ranger la vaisselle", done: true }
  ]);

  function handleClickValidate(id) {
    console.log(`Dans handleClickValidate, id : `, id);
    // Changer le done qui se trouve dans l'état tasks
    const tasksUpdated = tasks.map(task => {
      if (task.id === id) task.done = !task.done;
      return task
    })

    // Modification du state en utilisant setTasks
    setTasks(tasksUpdated);
  }
  function handleClickRemove(id) {
    console.log(`Dans handleClickRemove, id : `, id);
    // filtre du table tasks et stockage dans tasksUpdated
    const tasksUpdated = tasks.filter(task => task.id !== id);

    // Modification du state en utilisant setTasks
    setTasks(tasksUpdated);
  }
  function handleSubmitAdd(taskName) {
    console.log(`Dans handleSubmitAdd, id : `);
    // Ajout d'une tâche dans la copie de tasks
    const tasksUpdated = [...tasks, { name: taskName, id: tasks.length + 1, done: false }];

    // Modification du state en utilisant setTasks
    setTasks(tasksUpdated);
  }

  return (
    <div className="App container">
      <h1>Gestions des tâches</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          // Récupération de la value de l'input
          const taskName = document.querySelector("#title").value;
          console.log(`taskName :`, taskName);
          handleSubmitAdd(taskName);
        }}
        className='d-flex gap-2 align-items-center'>
        <label htmlFor="title" className='form-label'>Tâche : </label>
        <input type="text" id="title" className='form-control w-50' />
        <input type="submit" value="Ajouter" className='btn btn-success' />
      </form>
      {[...tasks].sort((a,b) => b.id - a.id ).sort((a,b) => a.done - b.done ).map((task) =>
        <Task
          key={task.id}
          task={task}
          onClickValidate={handleClickValidate}
          onClickRemove={handleClickRemove}
        />)}

    </div>
  );
}

export default App;


import './App.css';
import { useState, useEffect } from 'react';
import Task from './Task';
import JsonServer from '../services/JsonServer';
/**
 * Composant parent de l'application qui intègre un formulaire d'ajout de tâches
 * et qui affiche les tâches en appliquant un classement
 * @returns JSX
 */
function App() {
  // Déclaration de l'état tasks qui est un tableau d'objets de task
  const [tasks, setTasks] = useState([]);

  // Appel de useEffect qui sera exécuté juste aprés le premier chargement du composant App.jsx
  useEffect(() => {
    (async () => {
      const loadedTasks = await JsonServer.loadTasks();
      console.log(`loadedTasks`, loadedTasks);
      setTasks(loadedTasks);
    })();


  }, [])

  /**
   * Modifie et le state et fait un appel à l'api REST avec la méthode PATCH
   * @param {number} id 
   * @returns void
   */
  function handleClickValidate(id) {
    console.log(`Dans handleClickValidate, id : `, id);
    // Changer le done qui se trouve dans l'état tasks
    const tasksUpdated = tasks.map(task => {
      if (task.id === id) {
        task.done = !task.done;
        // Appel au serveur pour modifier la propriété "done" de la tâche concernée
        JsonServer.patchTask(task.id, { done: task.done });
      }
      return task
    })

    // Modification du state en utilisant setTasks
    setTasks(tasksUpdated);


  }
  /**
   * Supprime une tâche dans l'état tasks - Fait appel à l'api REST avec la méthode DELETE
   * @param {number} id 
   * @returns void
   */
  function handleClickRemove(id) {
    console.log(`Dans handleClickRemove, id : `, id);
    // filtre du table tasks et stockage dans tasksUpdated
    const tasksUpdated = tasks.filter(task => task.id !== id);

    // Modification du state en utilisant setTasks
    setTasks(tasksUpdated);

    // Appel du serveur d'API REST avec le verbe DELETE
    JsonServer.removeTask(id);
  }
  /**
   * Ajoute une tâche dans l'état tasks - Fait appel à l'api REST avec la méthode POST
   * @param {string} taskName
   * @returns void 
   */
  function handleSubmitAdd(taskName) {
    console.log(`Dans handleSubmitAdd, id : `);
    // Ajout d'une tâche dans la copie de tasks
    const newTask = { name: taskName, done: false };


    // Appel au serveur pour l'ajout de la tâche
    console.log(`newTask dans handleSubmitAdd`, newTask);
    JsonServer.addTask(newTask);

    newTask.id = tasks.length + 1;
    const tasksUpdated = [...tasks, newTask];

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
      {[...tasks].sort((a, b) => b.id - a.id).sort((a, b) => a.done - b.done).map((task) =>
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


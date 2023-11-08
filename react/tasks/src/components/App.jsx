import './App.css';
import { useState } from 'react';
import Task from './Task';

function App() {

  // Déclaration de l'état : tasks qui est un tableau d'objets de task
  const [tasks, setTasks] = useState([
    { name: "Faire la vaisselle" },
    { name: "Essuyer la vaisselle" },
    { name: "Ranger la vaisselle" }
  ]);


  return (
    <div className="App container">
      <h1>Gestions des tâches</h1>
      {tasks.map((task) => <Task name={task.name} />)}

    </div>
  );
}

export default App;


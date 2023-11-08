const Task = ({ task, onClickValidate }) => {
  return (
    <section className="d-flex justify-content-between my-2">

      <h2 className={task.done ? 'text-decoration-line-through' : ""}>{task.name}</h2>
      <div>
        <button
          onClick={() => { onClickValidate(task.id) }}
          className="btn btn-success me-3">
          {task.done ? 'Invalider' : "Valider"}
          </button>
        <button className="btn btn-danger">Supprimer</button>
      </div>
    </section>
  );
}

export default Task;
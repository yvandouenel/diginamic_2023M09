const Task = ({ name }) => {
  return (
    <section className="d-flex justify-content-between my-2">
      <h2>{name}</h2>
      <div>
      <button className="btn btn-success me-3">Valider</button>
      <button className="btn btn-danger">Supprimer</button>
      </div>
    </section>
  );
}

export default Task;
export default class JsonServer {
  static url = "http://localhost:3001/tasks/";

  static async loadTasks() {
    return fetch(JsonServer.url)
    .then(response => {
      console.log(`response status`, response.status);
      return response.json();
    })
    .then(tasks => {
      console.log(`tasks : `, tasks);
      return tasks;
    })
    .catch(error => {
      console.error("Erreur attrapée dans loadTasks" + error);
    })
  }
}
/**
 * Class qui utilise des propriétés et des variables de classe pour récupérer ou modifier ou ajouter des données en utilisant une api REST
 */
export default class JsonServer {
  static url = "http://localhost:3001/tasks/";

  /**
   * 
   * @returns Promise<Task[]>
   */
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
  /**
   * 
   * @returns Promise<Task>
   */
  static async removeTask(id) {
    return fetch(JsonServer.url + id,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "DELETE"
      })
      .then(function (res) { 
        console.log(res.status);
        return res.json();
      })
      .then(function (task) { 
        console.log(`task supprimée : `, task);
        return task;
       })
      .catch(function (error) {
        console.error(error);
      })
  }
  /**
   * 
   * @returns Promise<Task>
   */
  static async addTask(task) {
    return fetch(JsonServer.url,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(task)
      })
      .then(function (res) { 
        console.log(res.status);
        return res.json();
      })
      .then(function (task) { 
        console.log(`task ajoutée : `, task);
        return task;
       })
      .catch(function (error) {
        console.error(error);
      })
  }
}
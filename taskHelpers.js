module.exports = {
  getAllActiveTasks = function (taskList) {
    return taskList.filter(task => !task.deletedAt);
  }
}
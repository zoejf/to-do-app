# To Do List App
Simple Node/Hapi API to support a Trello-like To Do List UI

## How to get started
- `npm install`
- `npm start` to see the server running

## See it working: terminal examples
- `curl http://localhost:3000/1/tasks`
- `curl http://localhost:3000/1/tasks\?groupBy\=dueDate`
- `curl -X POST -H "Content-Type: application/json" -d '{"title": "my task", "description": "some description", "status": "PENDING"}' http://localhost:3000/1/tasks`

## Next Improvements
- Add database and ORM (Postgres, Sequelize)
- Tests
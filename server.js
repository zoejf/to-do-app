'use strict';

const Hapi = require('@hapi/hapi');
const Joi = require('joi');
const constants = require('./constants');
let sampleData = require('./sample-data');

const init = async () => {

  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  });

  server.route({
    method: 'GET',
    path: '/ping',
    handler: (request, h) => {
      return 'Success!'
    }
  });


  // Returns an array of tasks by default.
  // If groupBy query is specified, returns an object with keys for each grouped array of tasks
  server.route({
    method: 'GET',
    path: '/{userId}/tasks',
    handler: (request, h) => {
      const usersTasks = sampleData.tasks.filter(task => task.userId == request.params.userId);

      if (request.query && request.query.groupBy == constants.GROUPINGS.STATUS) {
        const tasksByStatus = {};
        Object.values(constants.STATUSES).forEach(status => {
          console.log('status ' + status);
          const tasksPerStatus = usersTasks.filter(task => task.status == status);
          tasksByStatus[status] = tasksPerStatus;
        });
        return tasksByStatus;
      }

      if (request.query && request.query.groupBy == constants.GROUPINGS.DUEDATE) {
        const tasksByDueDate = {};
        sampleData.tasks.forEach(task => {
          if (!tasksByDueDate[task.dueDate]) {
            tasksByDueDate[task.dueDate] = [];
          }
          tasksByDueDate[task.dueDate].push(task);
        });
        return tasksByDueDate;
      }
      return usersTasks;
    },
    options: {
      validate: {
        params: Joi.object({
          userId: Joi.number().integer().min(1)
        }),
        query: Joi.object({
          groupBy: Joi.string().valid(constants.GROUPINGS.DUEDATE, constants.GROUPINGS.STATUS)
        }).optional()
      },
      response: {
        failAction: 'log'
      }
    }
  });

  // Returns a single task based on requested user and id
  server.route({
    method: 'GET',
    path: '/{userId}/tasks/{taskId}',
    handler: (request, h) => {
      const requestedTask = sampleData.tasks.find(task => 
        task.userId == request.params.userId && task.id == request.params.taskId
      );
      return requestedTask;
    },
    options: {
      validate: {
        params: Joi.object({
          userId: Joi.number().integer().min(1),
          taskId: Joi.number().integer().min(1)
        })
      },
      response: {
        failAction: 'log'
      }
    }
  });

  // 
  server.route({
    method: 'POST',
    path: '/{userId}/tasks',
    handler: (request, h) => {
      const newTask = {
        id: sampleData.tasks.length + 1, // hack to get next number, assuming increasing integers for now
        title: request.payload.title,
        description: request.payload.description,
        dueDate: request.payload.dueDate, // TO DO: add date formatting validation/ normalizition
        userId: request.params.userId,
        createdAt: new Date(),
        deletedAt: null
      };
      sampleData.tasks.push(newTask)
      return sampleData.tasks;
    },
    options: {
      validate: {
        params: Joi.object({
          userId: Joi.number().integer().min(1)
        }),
        payload: Joi.object({
          title: Joi.string().min(1).max(100),
          description: Joi.string().min(1).max(200),
          status: Joi.string().valid(
            constants.STATUSES.PENDING,
            constants.STATUSES.INPROGRESS,
            constants.STATUSES.DONE,
          ),
          dueDate: Joi.date()
        }),
        options: {
          allowUnknown: false
        }
      },
      response: {
        failAction: 'log'
      }
    }
  });

  server.route({
    method: 'PUT',
    path: '/{userId}/tasks/{taskId}',
    handler: (request, h) => {
      // TO DO: find and update requrested task
      return sampleData.tasks;
    },
    options: {
      validate: {
        params: Joi.object({
          userId: Joi.number().integer().min(1),
          taskId: Joi.number().integer().min(1)
        }),
        payload: Joi.object({
          title: Joi.string().min(1).max(100),
          description: Joi.string().min(1).max(200),
          status: Joi.string().valid(
            constants.STATUSES.PENDING,
            constants.STATUSES.INPROGRESS,
            constants.STATUSES.DONE,
          ),
          dueDate: Joi.date()
        }),
        options: {
          allowUnknown: false
        }
      },
      response: {
        failAction: 'log'
      }
    }
  });

  server.route({
      method: 'DELETE',
      path: '/{userId}/tasks/{taskId}',
      handler: (request, h) => {
        // TO DO: find and update deleted_at for requested task
        return sampleData.tasks;
      },
      options: {
        validate: {
          params: Joi.object({
            userId: Joi.number().integer().min(1),
            taskId: Joi.number().integer().min(1)
          })
        },
        response: {
          failAction: 'log'
        }
      }
    });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

  console.log(err);
  process.exit(1);
});

init();
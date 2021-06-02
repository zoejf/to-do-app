const constants = require('../constants');
const tasks = [{
  id: 1,
  title: 'Grocery Shopping',
  description: 'weekly shopping',
  status: constants.STATUSES.DONE,
  dueDate: '2021-05-31',
  createdAt: '2021-05-23 15:10:38',
  deletedAt: null,
  userId: 1
},{
  id: 2,
  title: 'Oil Change',
  description: 'bring car to the shop',
  status: constants.STATUSES.PENDING,
  dueDate: '2021-6-13',
  createdAt: '2021-05-25 10:13:35',
  deletedAt: null,
  userId: 1
}, {
  id: 3,
  title: 'Coding Practice',
  description: 'create to do app',
  status: constants.STATUSES.INPROGRESS,
  dueDate: '2021-06-07',
  createdAt: '2021-05-31 15:47:12',
  deletedAt: null,
  userId: 1
}, {
  id: 4,
  title: 'Renew Gym Membership',
  description: 'renew membership and pay annual fee',
  status: constants.STATUSES.PENDING,
  dueDate: '2021-06-07',
  createdAt: '2021-05-31 15:47:12',
  deletedAt: null,
  userId: 1
}];

module.exports = tasks;
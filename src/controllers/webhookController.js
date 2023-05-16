const clickupService = require('../services/clickupService');
require('dotenv').config();

const BKO = process.env.BKO_LIST_ID;
const DEV = process.env.DEV_LIST_ID;
const MKT = process.env.MKT_LIST_ID;
const QA = process.env.QA_LIST_ID;

const stakeholdersList = ['BKO', 'MKT'];
const desiredStatus = 'DESENVOLVIMENTO';

function createNewActivity(task) {
  return {
    name: task.name,
    description: task.description,
    links_to: task.id,
  };
}

async function handleWebhook(req, res) {
  try {
    const taskId = req.body.payload.id;
    const task = await clickupService.getTask(taskId);

    if (
      stakeholdersList.includes(task.list.name) &&
      task.status.status.toUpperCase() === desiredStatus
    ) {
      await clickupService.createTask(DEV, createNewActivity(task));
      return res.sendStatus(200);
    }

    if (task.list.name === 'DEV' && task.status.status.toUpperCase() === 'QA') {
      await clickupService.createTask(QA, createNewActivity(task));
      return res.sendStatus(200);
    }

    if (
      task.list.name === 'QA' &&
      task.status.status.toUpperCase() === 'APPROVED'
    ) {
      // pegar task pai em dev e chamar funcao updateTask para fazer o put
      await clickupService.updateTask(QA, createNewActivity(task));
      return res.sendStatus(200);
    }

    return res.sendStatus(200);
  } catch (error) {
    console.error('Erro ao manipular webhook:', error.data);
    throw error;
  }
}

module.exports = {
  handleWebhook,
};

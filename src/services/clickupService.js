const axios = require('axios');
require('dotenv').config();
const clickupToken = process.env.CLICKUP_API_KEY;

async function createTask(listId, activity) {
  const url = `https://api.clickup.com/api/v2/list/${listId}/task`;
  const headers = {
    Authorization: clickupToken,
  };

  try {
    await axios.post(url, activity, { headers });
    console.log('Nova atividade criada com sucesso!');
  } catch (error) {
    console.error('Erro ao criar nova atividade:', error.data);
    throw error;
  }
}

async function updateTask(listId, activity) {
  const url = `https://api.clickup.com/api/v2/list/${listId}/task`;
  const headers = {
    Authorization: clickupToken,
  };

  try {
    await axios.put(url, activity, { headers });
    console.log('Atividade atualizada com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar atividade:', error.data);
    throw error;
  }
}

async function getTask(taskId) {
  const url = `https://api.clickup.com/api/v2/task/${taskId}`;
  const headers = {
    Authorization: clickupToken,
  };

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error('Erro ao obter detalhes da tarefa:', error.data);
    throw error;
  }
}

module.exports = {
  createTask,
  updateTask,
  getTask,
};

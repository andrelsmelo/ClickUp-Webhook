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
    console.error('Erro ao criar nova atividade:', error);
    throw error;
  }
}

async function addQATagToDev(taskId, tag_name) {
  const url = `https://api.clickup.com/api/v2/task/${taskId}/tag/${tag_name}`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: clickupToken,
  };

  try {
    await axios.post(url, {}, { headers });
    console.log('Atividade tageada com sucesso!');
  } catch (error) {
    console.error('Erro ao tagear a atividade:', error);
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
    console.error('Erro ao obter detalhes da tarefa:', error);
    throw error;
  }
}

module.exports = {
  createTask,
  addQATagToDev,
  getTask,
};

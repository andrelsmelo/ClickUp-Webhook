const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// Configurações da API do ClickUp
const clickupToken = 'token_do_clickup';
const spaceId = 'id_do_espaco_no_clickup';
const targetListId = 'id_da_lista_dev';

console.log(clickupToken);

// Rota para receber as notificações do ClickUp
app.post('/webhook', async (req, res) => {
  const taskId = req.body.event_data.task_id;
  const task = await getTask(taskId);

  // Verifica se a tarefa passou do status "Documentacao" para o status "Desenvolvimento"
  if (
    task.status === 'Desenvolvimento' &&
    req.body.event_data.previous_status === 'Documentacao'
  ) {
    // Obtém os detalhes da atividade anterior
    const previousActivityId = task.activity_ids[0];
    const previousActivity = await getActivity(previousActivityId);

    // Cria uma nova atividade com os mesmos detalhes
    const newActivity = {
      name: previousActivity.name,
      content: previousActivity.content,
    };

    const createdActivity = await createActivity(targetListId, newActivity);

    // Cria o vínculo entre as duas atividades
    await createLink(previousActivity.id, createdActivity.id);
  }
  // Faça o log dos dados do card
  console.log('Card recebido:', task);

  res.sendStatus(200);
});

// Função para criar um vínculo entre duas atividades no ClickUp
async function createLink(sourceActivityId, targetActivityId) {
  const url = `https://api.clickup.com/api/v2/task/${sourceActivityId}/link/${targetActivityId}`;
  const headers = {
    Authorization: clickupToken,
  };

  try {
    await axios.post(url, null, { headers });
    console.log('Vínculo criado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar vínculo:', error);
    throw error;
  }
}

// Função para obter os detalhes de uma tarefa do ClickUp
async function getTask(taskId) {
  const url = `https://api.clickup.com/api/v2/task/${taskId}`;
  const headers = {
    Authorization: clickupToken,
  };

  try {
    const response = await axios.get(url, { headers });
    return response.data.task;
  } catch (error) {
    console.error('Erro ao obter detalhes da tarefa:', error);
    throw error;
  }
}

async function createActivity(listId, activity) {
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

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});

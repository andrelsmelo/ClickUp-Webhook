# Webhook com ClickUp

Este projeto demonstra como criar um webhook para receber notificações do ClickUp e executar ações com base nessas notificações. Ele utiliza o Node.js e o framework Express para criar o servidor e se integra com a API do ClickUp para realizar operações como criar atividades e vincular tarefas.

## Funcionalidades

- Recebe notificações do ClickUp quando uma tarefa é atualizada.
- Verifica se a tarefa passou de um status específico para outro.
- Cria uma nova atividade na lista destino com base nos detalhes da atividade anterior.
- Cria um vínculo entre a atividade anterior e a nova atividade criada.

## Requisitos

- Node.js (v12 ou superior)
- Conta no ClickUp e token de autenticação da API do ClickUp

## Instalação

1. Clone o repositório para o seu ambiente local:

``git clone <URL_DO_REPOSITÓRIO>``

2. Acesse a pasta do projeto:

``cd ClickUp-Webhook``

3. Instale as dependências do projeto:
npm install

4. Configure as variáveis do ClickUp:

No arquivo `index.js`, atualize as seguintes variáveis com as suas informações do ClickUp:

```javascript
const clickupToken = 'seu_token_do_clickup';
const spaceId = 'id_do_seu_espaco_no_clickup';
const targetListId = 'id_da_lista_destino';
```
# Uso

1. Inicie o servidor:

npm start

2. O servidor estará em execução na porta 3000.

3. Exponha o servidor local usando o Ngrok:

- Baixe e instale o [Ngrok](https://ngrok.com/) em seu ambiente.
- Abra uma nova janela do terminal e execute o seguinte comando para expor o servidor local:

``ngrok http 3000``

3. Crie um webhook no ClickUp:

- Acesse as configurações do espaço no ClickUp.
- Navegue até a seção "Integrações".
- Selecione "Webhooks".
- Clique em "Adicionar Webhook".
- Informe a URL do webhook fornecida pelo ngrok (por exemplo, http://endereco_ngrok:3000/webhook).
- Selecione os eventos desejados.
- Salve as configurações do webhook.

A partir de agora, o webhook receberá as notificações do ClickUp e executará as ações especificadas no código. Verifique o console para ver os logs das atividades.

Lembre-se de substituir `<URL_DO_REPOSITÓRIO>` pelo URL real do repositório, `<seu_token_do_clickup>` pelo seu token de autenticação do ClickUp, `<id_do_seu_espaco_no_clickup>` pelo ID do seu espaço no ClickUp e `<id_da_lista_destino>` pelo ID da lista destino onde as novas atividades serão criadas.
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8000; // Porta em que o servidor irá rodar

// Middleware para analisar o corpo das requisições em JSON
app.use(bodyParser.json());

// Rota para receber as notificações
app.post('/notifications', (req, res) => {
    const notification = req.body;

    // Exibe a notificação recebida no console
    console.log('Notificação recebida:', notification);

    // Aqui você pode fazer o que quiser com as notificações (salvar em banco, etc.)

    // Envia uma resposta ao aplicativo
    res.status(200).send('Notificação recebida com sucesso!');
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

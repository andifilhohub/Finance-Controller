const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 8000; // Porta em que o servidor irá rodar
const pool = new Pool({
    user: 'chatwoot',
    host: 'localhost', // ou IP do seu banco
    database: 'financecontroller',
    password: 'Password1!',
    port: 5432, // Porta padrão do PostgreSQL
});

// Middleware para analisar o corpo das requisições em JSON
app.use(bodyParser.json());

// Rota para receber as notificações
app.post('/notifications', async (req, res) => {
    const { title, message, notify_id } = req.body;

    try {



        const result = await pool.query(
            'INSERT INTO notificationsReceived (title, message, notification_id) VALUES ($1, $2, $3) RETURNING *',
            [title, message, notify_id]
        );
        console.log('Notificação salva:', result.rows[0]);
        res.status(201).send('Notificação salva no banco!');


    } catch (err) {
        console.error('Erro ao salvar notificação:', err);
        res.status(500).send('Erro interno do servidor');
    }
});
// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

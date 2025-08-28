const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, 'SRC', 'Config', '.env') });
const database = require('./src/config/database');
const express = require('express');

const app = express();
const port = process.env.PORT;

async function startServer() {
    try {
        const cliente = await database.pool.connect('SELECT NOW()');
        console.log('conexão com o banco de dados PostgreSQL bem-sucedida!');
    
        app.listen(port, () => {
        console.log(`Servidor rodando e ouvindo na porta ${port}`);
        });
    } catch (error) {
        console.error('Falha ao conectar ao banco de dados:', error);
        process.exit(1);
    }
}
startServer();

app.use(express.json());

app.get('/usuarios', async (req, res) => {
try {
    const resultado = await database.pool.query('SELECT id, nome, email FROM usuarios');
    res.status(200).json(resultado.rows);
}catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({error: 'Erro interno do servidor' });
}
});

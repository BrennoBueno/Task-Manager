const express = require('express')
const app = express()
const port = 3000

app.get ('/', (req, res) => {
    res.send('Olá, o servidor está rodando!!')
})

app.listen(port, () => {
    console.log(`ouvindo a porta ${port}`)
})
const dotenv = require('dotenv');
dotenv.config();

const { SERVICO, PORTA, URL_LOGS } = process.env;
console.log(`[Carregando] serviço ${SERVICO}:${PORTA}`);

const express = require('express')
app = express();
app.use(express.json());

const axios = require('axios');

app.use((req, res, next) => {
  const logar = async () => {
    const { data } = await axios.post(URL_LOGS, {
        servico: req.method,
        evento: req.url,
        data: req.body
    });

    return data
  };

  let data = logar();

  data.then(log => {
      console.log(log)
  });

  next();
})

require("./rotas")

app.listen(PORTA, () => {
    console.log(`[Carregou] ${SERVICO}:${PORTA}`)
});

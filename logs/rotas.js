const moment = require('moment');
const { v4: uuidv4} = require('uuid');

const logs = [];

app.get('/v1/logs', function (req, res) {
    return res.status(200).json(logs);
})

app.post('/v1/logs', function (req, res) {
   const {servico, evento} = req.body;
   if (!servico.length) {
    res.status(422).json(
        {
            mensagem: "Está faltando o nome do serviço!"
        }
    )
}

if (!evento.length) {
    res.status(422).json(
        {
            mensagem: "Está faltando o evento do serviço!"
        }
    )
}

const event = {
    id: uuidv4(),
    ...req.body,
    timestamp: moment().toISOString()
};

    logs.push(event);

    return res.status(201).json(event);
  })
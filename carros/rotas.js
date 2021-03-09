const moment = require('moment');
const { v4: uuidv4 } = require("uuid");
const carros = [];

app.get('/v1/carros/:id', (req, res) => {
  const { id } = req.params;

  const carro = carros.filter(item => item.id == id);

  return res.status(200).json(...carro);
})

app.get('/v1/carros', (req, res) => {
    return res.status(200).json(carros);
})

app.post('/v1/carros', function (req, res) {
    const { nome, marca, tipo, placa, cor } = req.body;

    if (!nome.length) {
        res.status(422).json(
            {
                mensagem: "Está faltando o nome do carro!"
            }
        )
    } else if (!marca.length) {
        res.status(422).json(
            {
                mensagem: "Está faltando a marca do carro!"
            }
        )
    } else if (!tipo.length) {
        res.status(422).json(
            {
                mensagem: "Está faltando o tipo do carro!"
            }
        )
    } else if (!placa.length) {
        res.status(422).json(
            {
                mensagem: "Está faltando a placa do carro!"
            }
        )
    } else if (!cor.length) {
        res.status(422).json(
            {
                mensagem: "Está faltando a cor do carro!"
            }
        )
    }

    const carro = {
        id: uuidv4(),
        ...req.body,
        timestamp: moment().toISOString()
    };

    carros.push(carro);

    return res.status(201).json(carro);
})
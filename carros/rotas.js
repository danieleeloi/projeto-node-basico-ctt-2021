const moment = require('moment');
const { v4: uuidv4 } = require("uuid");
let carros = [];

app.get('/v1/carros/:id', (req, res) => {
  const { id } = req.params;

  const carro = carros.filter(item => item.id == id);

  return res.status(200).json(...carro);
})

app.get('/v1/carros', (req, res) => {
    return res.status(200).json(carros);
})

app.delete('/v1/carros/:id', (req, res) => {
    const { id } = req.params;

    const total = carros.length;
    carros = carros.filter(item => id != item.id);

    if (carros.length < total) {
        return res.status(204).json({});
    } else {
        return res.status(404).json({mensagem: "Este carro não foi localizado!"});
    }
})

app.put(`/v1/carros/:id`, (req, res) => {
    const { id } = req.params;;
    const atualizar = req.body;
    let atualizou = false;
    let objetoAtualizado = {};

    carros = carros.map(item => {
        if (id != item.id) {
            return item;
        }

        atualizou = true;

        objetoAtualizado = {
            id: id,
            ...atualizar,
            timestamp: moment().toISOString()
        };

        return objetoAtualizado;
    });

    if (atualizou) {
        return res.status(200).json(objetoAtualizado);
    } else {
        return res.status(404).json({mensagem: "Este carro não foi localizado!"});
    }
});

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

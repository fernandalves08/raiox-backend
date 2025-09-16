const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Raio-X Pré-Consulta backend rodando!');
});

app.post('/uploads', upload.fields([{ name: 'questionario' }, { name: 'avaliacao' }, { name: 'exames' }]), (req, res) => {
  res.json({
    questionarioId: "fake-questionario-id",
    avaliacaoId: "fake-avaliacao-id",
    examesId: "fake-exames-id"
  });
});

app.post('/extract/triage', (req, res) => {
  const texto = req.body.textoBruto || '';
  res.json({
    objetivo: "emagrecer",
    dificuldades: ["beliscar à tarde"],
    rotina: "acorda às 6h, treino às 7h",
    sinaisSintomas: ["intestino preso"],
    preferencias: ["arroz", "feijão"]
  });
});
app.get('/api/openapi', (req, res) => {
  try {
    const schema = {
      openapi: '3.0.0',
      info: {
        title: 'Raio-X Pré-Consulta',
        version: '1.0.0'
      },
      paths: {
        '/extract/triage': {
          post: {
            summary: 'Extrai dados nutricionais do texto bruto enviado',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      textoBruto: { type: 'string' }
                    },
                    required: ['textoBruto']
                  }
                }
              }
            },
            responses: {
              '200': {
                description: 'Dados extraídos com sucesso',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        objetivo: { type: 'string' },
                        dificuldades: {
                          type: 'array',
                          items: { type: 'string' }
                        },
                        rotina: { type: 'string' },
                        sinaisSintomas: {
                          type: 'array',
                          items: { type: 'string' }
                        },
                        preferencias: {
                          type: 'array',
                          items: { type: 'string' }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };

    res.json(schema);
  } catch (err) {
    console.error('Erro no /api/openapi:', err);
    res.status(500).send('Erro interno no servidor');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});


app.post('/extract/triage', (req, res) => {
  const texto = req.body.textoBruto || '';
  res.json({
    objetivo: "emagrecer",
    dificuldades: ["beliscar à tarde"],
    rotina: "acorda às 6h, treino às 7h",
    sinaisSintomas: ["intestino preso"],
    preferencias: ["arroz", "feijão"]
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

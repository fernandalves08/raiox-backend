
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

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

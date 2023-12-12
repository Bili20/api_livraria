import express from "express";
import conectaDatabase from "./config/dbConect.js";
import ManipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import routes from "./routes/index.js";
import manipulador404 from "./middlewares/manipulador404.js";

const conexao = await conectaDatabase();

conexao.on("error", (erro) => {
  console.error("erro de conexão", erro);
});

conexao.once("open", () => {
  console.log("conexão feita com sucesso");
});

const app = express();
routes(app);

app.use(manipulador404);

app.use(ManipuladorDeErros);

export default app;

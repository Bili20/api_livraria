import express from "express";
import LivroController from "../controllers/livroController.js";
import Paginar from "../middlewares/paginar.js";

const routes = express.Router();

routes.get("/livros", LivroController.listarLivros, Paginar);
routes.get("/livros/busca", LivroController.listarLivrosPorFiltro, Paginar);
routes.get("/livros/:id", LivroController.listarLivroPorId);
routes.post("/livros", LivroController.cadastrarLivro);
routes.put("/livros/:id", LivroController.atualizaLivro);
routes.delete("/livros/:id", LivroController.deletaLivro);

export default routes;

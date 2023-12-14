import express from "express";
import AutorController from "../controllers/autorController.js";
import Paginar from "../middlewares/paginar.js";

const routes = express.Router();

routes.get("/autores", AutorController.listarAutor, Paginar);
routes.get("/autores/:id", AutorController.listarAutorPorId);
routes.post("/autores", AutorController.cadastrarAutor);
routes.put("/autores/:id", AutorController.atualizaAutor);
routes.delete("/autores/:id", AutorController.deletaAutor);

export default routes;

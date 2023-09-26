import { autor } from "../models/Autor.js";

class AutorController {
  static async listarAutor(req, res) {
    try {
      const listarAutor = await autor.find({});
      res.status(200).json(listarAutor);
    } catch (e) {
      res.status(500).json({ message: `${e.message} - falha ao buscar autor` });
    }
  }

  static async listarAutorPorId(req, res) {
    try {
      const id = req.params.id;
      const data = await autor.findById(id);
      res.status(200).json(data);
    } catch (e) {
      res.status(500).json({ message: `${e.message} - falha ao buscar autor` });
    }
  }

  static async cadastrarAutor(req, res) {
    try {
      const novoAutor = await autor.create(req.body);
      res.status(201).json({ message: "criado com sucesso", autor: novoAutor });
    } catch (e) {
      res
        .status(500)
        .json({ message: `${e.message} - falha ao cadastrar autor` });
    }
  }

  static async atualizaAutor(req, res) {
    try {
      const id = req.params.id;
      await autor.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "autor atualizado" });
    } catch (e) {
      res.status(500).json({ message: `${e.message} - falha na atualização` });
    }
  }

  static async deletaAutor(req, res) {
    try {
      const id = req.params.id;
      await autor.findByIdAndDelete(id);
      res.status(200).json({ message: "autor deletado" });
    } catch (e) {
      res.status(500).json({ message: `${e.message} - falha no deletar` });
    }
  }
}

export default AutorController;

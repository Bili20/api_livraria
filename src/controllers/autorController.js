import NaoEncontrado from "../erros/naoEncontrado.js";
import { autor } from "../models/Autor.js";

class AutorController {
  static async listarAutor(req, res) {
    try {
      const listarAutor = await autor.find();
      res.status(200).json(listarAutor);
    } catch (e) {
      res.status(500).json({ message: `${e.message} - falha ao buscar autor` });
    }
  }

  static async listarAutorPorId(req, res, next) {
    try {
      const id = req.params.id;
      const data = await autor.findById(id);
      if (data !== null) {
        res.status(200).json(data);
      } else {
        next(new NaoEncontrado("autor não encontrado"));
      }
    } catch (e) {
      next(e);
    }
  }

  static async cadastrarAutor(req, res, next) {
    try {
      const novoAutor = await autor.create(req.body);
      res.status(201).json({ message: "criado com sucesso", autor: novoAutor });
    } catch (e) {
      next(e);
    }
  }

  static async atualizaAutor(req, res, next) {
    try {
      const id = req.params.id;
      const data = await autor.findByIdAndUpdate(id, req.body);
      if (data !== null) {
        res.status(200).json({ message: "autor atualizado" });
      } else {
        next(new NaoEncontrado("autor não encontrado"));
      }
    } catch (e) {
      next(e);
    }
  }

  static async deletaAutor(req, res, next) {
    try {
      const id = req.params.id;
      const data = await autor.findByIdAndDelete(id);
      if (data !== null) {
        res.status(200).json({ message: "autor deletado" });
      } else {
        next(new NaoEncontrado("autor não encontrado"));
      }
    } catch (e) {
      next(e);
    }
  }
}

export default AutorController;

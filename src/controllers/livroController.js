import NaoEncontrado from "../erros/naoEncontrado.js";
import { autor, livro } from "../models/index.js";

class LivroController {
  static async listarLivros(req, res, next) {
    try {
      const listaLivros = await livro.find();
      res.status(200).json(listaLivros);
    } catch (e) {
      next(e);
    }
  }

  // exemplo usando e reference
  /* static async listarLivros (req, res) {
    try {
      const listaLivros = await livro.find({}).populate("autor").exec();
      res.status(200).json(listaLivros);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição` });
    }
  };
 */

  static async listarLivroPorId(req, res, next) {
    try {
      const id = req.params.id;
      const data = await livro.findById(id);
      if (data !== null) {
        res.status(200).json(data);
      } else {
        next(new NaoEncontrado("autor não encontrado"));
      }
    } catch (e) {
      next(e);
    }
  }

  /* static async cadastrarLivro(req, res, next) {
    const novoLivro = req.body;
    try {
      const autorEncontrado = await autor.findById(novoLivro.autor);
      const livroCompleto = {
        ...novoLivro,
        autor: { ...autorEncontrado._doc },
      };
      const livroCriado = await livro.create(livroCompleto);
      res
        .status(201)
        .json({ message: "criado com sucesso", livro: livroCriado });
    } catch (e) {
      next(e);
    }
  } */
  // exemplo usando reference
  static async cadastrarLivro(req, res, next) {
    try {
      const novoLivro = await livro.create(req.body);
      res.status(201).json({ message: "criado com sucesso", livro: novoLivro });
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizaLivro(req, res, next) {
    try {
      const id = req.params.id;
      const data = await livro.findByIdAndUpdate(id, req.body);
      if (data !== null) {
        res.status(200).json({ message: "livro atualizado" });
      } else {
        next(new NaoEncontrado("autor não encontrado"));
      }
    } catch (e) {
      next(e);
    }
  }

  static async deletaLivro(req, res, next) {
    try {
      const id = req.params.id;
      const data = await livro.findByIdAndDelete(id);
      if (data !== null) {
        res.status(200).json({ message: "livro deletado" });
      } else {
        next(new NaoEncontrado("autor não encontrado"));
      }
    } catch (e) {
      next(e);
    }
  }

  static async listarLivrosPorFiltro(req, res, next) {
    const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = req.query;
    try {
      const data = await autor.findOne({
        nome: nomeAutor,
      });

      const livrosFiltro = await livro.find({
        $or: [
          { editora: { $regex: `${editora}`, $options: "i" } },
          { titulo: { $regex: `${titulo}`, $options: "i" } },
        ],
        $or: [
          { paginas: { $gte: minPaginas } },
          { paginas: { $lte: maxPaginas } },
        ],
        $or: [{ autor: data._id }],
      });
      if (livrosFiltro.length > 0) {
        res.status(200).json(livrosFiltro);
      } else {
        next(new NaoEncontrado("livros não encontrado"));
      }
    } catch (e) {
      next(e);
    }
  }
}

export default LivroController;

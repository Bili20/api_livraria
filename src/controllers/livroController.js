import NaoEncontrado from "../erros/naoEncontrado.js";
import RequisicaoIncorreta from "../erros/requisicaoIncorreta.js";
import { autor, livro } from "../models/index.js";

class LivroController {
  static async listarLivros(req, res, next) {
    try {
      const data = livro.find();

      req.resultado = data;

      next();
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
      let busca = {};
      let data = {};

      if (editora) busca.editora = { $regex: editora };
      if (titulo) busca.titulo = { $regex: titulo };
      if (minPaginas) busca.paginas = { $gte: minPaginas };
      if (maxPaginas) busca.paginas = { $lte: maxPaginas };
      if (nomeAutor) {
        data = await autor.findOne({
          nome: nomeAutor,
        });
        if (data !== null) {
          busca.autor = data._id;
        } else {
          busca = null;
        }
      }
      if (busca !== null) {
        const livrosFiltro = livro.find(busca).populate("autor");

        req.resultado = livrosFiltro;

        next();
      } else {
        res.status(200).send([]);
      }
    } catch (e) {
      next(e);
    }
  }
}

export default LivroController;

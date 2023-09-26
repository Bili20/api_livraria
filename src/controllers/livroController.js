import { autor } from "../models/Autor.js";
import livro from "../models/Livro.js";

class LivroController {
  static async listarLivros(req, res) {
    try {
      const listaLivros = await livro.find({});
      res.status(200).json(listaLivros);
    } catch (e) {
      res
        .status(500)
        .json({ message: `${e.message} - falha ao buscar livros` });
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

  static async listarLivroPorId(req, res) {
    try {
      const id = req.params.id;
      const data = await livro.findById(id);
      res.status(200).json(data);
    } catch (e) {
      res.status(500).json({ message: `${e.message} - falha ao buscar livro` });
    }
  }

  static async cadastrarLivro(req, res) {
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
      res
        .status(500)
        .json({ message: `${e.message} - falha ao cadastrar livro` });
    }
  }
  // exemplo usando reference
  /* static async cadastrarLivro (req, res) {
    try {
      const novoLivro = await livro.create(req.body);
      res.status(201).json({ message: "criado com sucesso", livro: novoLivro });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha ao cadastrar livro` });
    }
  } */

  static async atualizaLivro(req, res) {
    try {
      const id = req.params.id;
      await livro.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "livro atualizado" });
    } catch (e) {
      res.status(500).json({ message: `${e.message} - falha na atualização` });
    }
  }

  static async deletaLivro(req, res) {
    try {
      const id = req.params.id;
      await livro.findByIdAndDelete(id);
      res.status(200).json({ message: "livro deletado" });
    } catch (e) {
      res.status(500).json({ message: `${e.message} - falha no deletar` });
    }
  }

  static async listarLivrosPorEditora(req, res) {
    const editora = req.query.editora;
    try {
      const livrosPorEditora = await livro.find({ editora: editora });
      res.status(200).json(livrosPorEditora);
    } catch (e) {
      res.status(500).json({ message: `${e.message} - falha na busca` });
    }
  }
}

export default LivroController;

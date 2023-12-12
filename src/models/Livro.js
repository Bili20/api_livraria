import mongoose from "mongoose";
import { autorSchema } from "./Autor.js";
// usando o embedding para fazer a encorporação de autor com livro
/* const livroSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: { type: String, require: [true, "O titulo é obrigatório"] },
    editora: { type: String, require: [true, "A editora é obrigatório"] },
    preco: { type: Number, require: [true, "O preço é obrigatório"] },
    paginas: { type: Number },
    autor: autorSchema,
  },
  { versionKey: false }
); */

// usando o reference

const livroSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: { type: String, required: [true, "O titulo é obrigatório"] },
    editora: {
      type: String,
      required: [true, "A editora é obrigatória"],
      enum: {
        values: ["nova", "casa do código"],
        message: "A editora {VALUE} não é um valor permitido",
      },
    },
    preco: { type: Number, required: [true, "O preço é obrigatório"] },
    paginas: {
      type: Number,
      min: [10, "O minimo de de páginas é 10"],
      max: [1000, "O maximo de de páginas é 1000"],
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "autores",
      required: true,
    },
  },
  { versionKey: false }
);

const livro = mongoose.model("livros", livroSchema);

export default livro;

import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";
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
      validate: {
        validator: (valor) => {
          return valor >= 10 && valor <= 5000;
        },
        message: "O numero de páginas deve estar entre 10 e 5000.",
      },
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "autores",
      required: true,
      //autopopulate: true,
      autopopulate: { select: "nome" },
    },
  },
  { versionKey: false }
);

livroSchema.plugin(autopopulate);

const livro = mongoose.model("livros", livroSchema);

export default livro;

import mongoose from "mongoose";

const autorSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    nome: { type: String, required: [true, "O nome do autor é obrigatório"] },
    nacionalidade: { type: String },
  },
  { versionKey: false }
);

const autor = mongoose.model("autores", autorSchema);

export { autor, autorSchema };

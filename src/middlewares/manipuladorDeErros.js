import mongoose from "mongoose";
import ErroBase from "../erros/erroBase.js";
import RequisicaoIncorreta from "../erros/requisicaoIncorreta.js";
import erroValidacao from "../erros/erroValidacao.js";
import NaoEncontrado from "../erros/naoEncontrado.js";

function ManipuladorDeErros(erro, req, res, next) {
  if (erro instanceof mongoose.Error.CastError) {
    new RequisicaoIncorreta().enviarRespostas(res);
  } else if (erro instanceof mongoose.Error.ValidationError) {
    new erroValidacao(erro).enviarRespostas(res);
  } else if (erro instanceof ErroBase) {
    erro.enviarRespostas(res);
  } else {
    new ErroBase().enviarRespostas(res);
  }
}

export default ManipuladorDeErros;

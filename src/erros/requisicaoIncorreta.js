import ErroBase from "./erroBase.js";

class RequisicaoIncorreta extends ErroBase {
  constructor(mensagem = "Um ou mais dados fornecido estão incorretos") {
    super(mensagem, 400);
  }
}

export default RequisicaoIncorreta;

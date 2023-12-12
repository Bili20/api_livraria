class ErroBase extends Error {
  constructor(menssage = "Erro interno do servidor", status = 500) {
    super();
    this.message = menssage;
    this.status = status;
  }

  enviarRespostas(res) {
    res
      .status(this.status)
      .send({ mensagem: this.message, status: this.status });
  }
}

export default ErroBase;

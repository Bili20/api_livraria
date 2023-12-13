import RequisicaoIncorreta from "../erros/requisicaoIncorreta.js";

async function Paginar(req, res, next) {
  try {
    let { limite = 5, pagina = 1, ordenacao = "_id:-1" } = req.query;
    if (limite > 0 && pagina > 0) {
      let [campoOrdenacao, ordem] = ordenacao.split(":");

      const resultado = req.resultado;

      const resultadoPaginado = await resultado
        .find()
        .sort({ [campoOrdenacao]: ordem })
        .limit(limite)
        .skip((pagina - 1) * limite);
      res.status(200).json(resultadoPaginado);
    } else {
      next(new RequisicaoIncorreta());
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
}
export default Paginar;

import "dotenv/config";
import app from "./src/app.js";

app.listen(3005, () => {
  console.log(`Escutando em: http://localhost:3005`);
});

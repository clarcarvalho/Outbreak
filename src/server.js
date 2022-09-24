const routes = require("./routes");

const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000...");
});

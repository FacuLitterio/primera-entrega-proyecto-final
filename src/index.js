const express = require("express");
const { PORT } = require("./constants");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

//Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")))
app.use("/API/productos", require("./Routes/productos.routes"));

app.get("/", (req, res) => {
  //Enviar archivos estaticos con un res.sendFile()
  res.send("It Works!");
});

app.listen(PORT, () => console.log(`Server on Port ${PORT}`));

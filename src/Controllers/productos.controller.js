const { FILENAME_DATABASE } = require("../constants");
const fs = require("fs");

module.exports = {
  getProducts: async (req, res) => {
    try {
      const products = await fs.promises.readFile(FILENAME_DATABASE, "utf-8");
      res.json({ data: JSON.parse(products) });
    } catch (error) {
      res.json({ msg: `Error: ${error.message}` });
    }
  },
  getProductById: async (req, res) => {
    const { id } = req.params;

    try {
      if (!+id) throw new Error("Error. Proporcione un ID");

      const products = await fs.promises.readFile(FILENAME_DATABASE, "utf-8");
      const productsParsed = JSON.parse(products);

      const finded = productsParsed.find((item) => item.id === +id);

      if (finded) res.json({ data: finded });
      else res.json({ msg: "Producto no encontrado" });
    } catch (error) {
      res.json({ msg: `Error: ${error.message}` });
    }
  },
  createProduct: async (req, res) => {
    const { name, description, thumbnail, price } = req.body;

    try {
      if (name && description && thumbnail && price) {
        const products = await fs.promises.readFile(FILENAME_DATABASE, "utf-8");
        const productsParsed = JSON.parse(products);

        const lastProduct = productsParsed.at(-1);

        const newProduct = {
          id: lastProduct.id + 1,
          ...req.body,
        };

        const allProducts = [...productsParsed, newProduct];

        await fs.promises.writeFile(
          FILENAME_DATABASE,
          JSON.stringify(allProducts),
          "utf-8"
        );

        res.json({ msg: `Producto ${name} creado con exito` });
      } else {
        throw new Error("Todos los campos son requeridos");
      }
    } catch (error) {
      res.json({ msg: `Error: ${error.message}` });
    }
  },
};

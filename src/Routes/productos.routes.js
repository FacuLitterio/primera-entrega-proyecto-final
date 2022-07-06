const { Router } = require("express");
const productsController = require("../Controllers/productos.controller");

const router = Router();

// const isAdmin = (req, res, next) => {
//   if (req.isAdmin) {
//     next();
//   } else {
//     res.json({ msg: "Error. No es Admin" });
//   }
// };

router.get("/", productsController.getProducts);
router.get("/:id", productsController.getProductById);
router.post("/", productsController.createProduct);
router.put("/", (req, res) => res.send("Productos/PUT"));
router.delete("/", (req, res) => res.send("Productos/DELETE"));

module.exports = router;

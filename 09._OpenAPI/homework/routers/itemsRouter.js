import { Router } from "express";
const router = Router();

const items = [
  {
    id: 1,
    name: "hat",
    price: 20,
  },
  {
    id: 2,
    name: "hoodie",
    price: 100,
  },
  {
    id: 3,
    name: "mug",
    price: 25,
  },
  {
    id: 4,
    name: "pen",
    price: 10,
  },
];

/**
 * @openapi
 * /api/items:
 *   get:
 *     description: Get all items
 *     responses:
 *       200:
 *         description: Returns all items
 */
router.get("/api/items", (req, res) => {
  res.send({ data: items });
});

/**
 * @openapi
 * /api/items/{id}:
 *   get:
 *     summary: Returns item by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Id (number) of the item to retrieve
 *     responses:
 *       200:
 *         description: The item with the specific ID
 *       404:
 *         description: Item not found
 */

router.get("/api/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find((item) => item.id === id);
  if (item) {
    res.send({ data: item });
  } else {
    res.status(404).send({ error: "Item not found" });
  }
});

/**
 * @openapi
 * /api/items/name/{name}:
 *   get:
 *     summary: Returns item by name
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the item to retrieve
 *     responses:
 *       200:
 *         description: The item with the specific name
 *       404:
 *         description: Item not found
 */
router.get("/api/items/name/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  console.log(name);
  const item = items.find((item) => item.name === name);
  if (item) {
    res.send({ data: item });
  } else {
    res.status(404).send({ error: "Item not found" });
  }
});

/**
 * @openapi
 * /api/items:
 *   post:
 *     description: Create a new items
 *     parameters: []
 *     requestBody: {
 *          content: {
 *              "application/json": {
 *              schema: {
 *                  type: "object",
 *                  }
 *               }
 *           }
 *      }
 *     responses:
 *       200:
 *         description: Returns the item that was created
 */
router.post("/api/items", (req, res) => {
  console.log(req.body);
  let item = { id: items.length + 1, ...req.body };
  res.send({ data: item });
});

export default router;

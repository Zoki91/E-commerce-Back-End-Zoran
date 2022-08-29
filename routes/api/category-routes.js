const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// Homework #26 Literals (routes/api)
router.get('/', async (req, res) => {
  try {
    // find all categories
    const categoryData = await Category.findAll(req.params.id, {
      // be sure to include its associated Products
      include: [{
        model: Product
      }],
    });

    if (!categoryData) {
      res.status(404).json({
        message: 'No category found with that id!'
      });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one category by its `id` value
// Homework #26 Literals (routes/api)
router.get('/:id', async (req, res) => {
  try {
    // find all categories
    const categoryData = await Category.findOne(req.params.id, {
      // be sure to include its associated Products
      include: [{
        model: Product
      }],
    });

    if (!categoryData) {
      res.status(404).json({
        message: 'No category found with that id!'
      });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Homework #26 Literals (routes/api)
// create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Homework #26 Literals (routes/api)
// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Homework #26 Literals (routes/api)
// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({
        message: 'No Category found with that id!'
      });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
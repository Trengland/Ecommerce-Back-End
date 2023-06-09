const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint


router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [Product]
  })
  // categories = argument, I name it myself
  .then((categories) => res.json(categories))
  .catch((err) => res.status(500).json(err))
});


router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [Product]
  })
  .then((category) => res.json(category))
  .catch((err) => res.status(400).json(err))
});


router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((newcategory) => res.json(newcategory))
  .catch((err) => res.status(400).json(err))
});



router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updatedCategory[0]) {
      res.status(404).json({ message: 'No category found with this id :(' });
      return;
    }
    res.status(200).json({ message: 'Category updated succesfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});



router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategory = await Category.destroy({
      where: { id: req.params.id },
    });
    if (!deletedCategory) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Category deleted successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
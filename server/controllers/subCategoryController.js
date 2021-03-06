const slugify = require('slugify');

const SubCategory = require('../models/subCategoryModel');
const Product = require('../models/productModel');

exports.createSubCategory = async (req, res) => {
  try {
    const { name, category } = req.body;

    const newSubCategory = await SubCategory.create({
      name, // new subcategory
      category, // this is a parent category
      slug: slugify(name, { lower: true }),
    });

    res.status(201).json(newSubCategory);
  } catch (error) {
    res.status(400).send('Create subcategory failed!');
  }
};

exports.getSubCategory = async (req, res) => {
  console.log('SERVER  getSubCategory req.params.slug', req.params.slug);
  try {
    const subcategory = await SubCategory.findOne({
      slug: req.params.slug,
    }).exec();

    const products = await Product.find({ subcategory }).populate('category');

    res.status(200).json({ subcategory, products });
  } catch (error) {
    res.status(400).send('Get subcategory failed!');
  }
};

exports.updateSubCategory = async (req, res) => {
  // here category is a parent category of sub
  const { name, category } = req.body;
  try {
    const updatedSubCategory = await SubCategory.findOneAndUpdate(
      { slug: req.params.slug },
      { name, category, slug: slugify(name, { lower: true }) },
      { new: true }
    );
    res.status(200).json(updatedSubCategory);
  } catch (error) {
    res.status(400).send('Update subcategory failed!');
  }
};

exports.deleteSubCategory = async (req, res) => {
  try {
    const deletedSubCategory = await SubCategory.findOneAndDelete({
      slug: req.params.slug,
    });
    res.status(204).json(deletedSubCategory);
  } catch (error) {
    res.status(400).send('Delete subcategory failed!');
  }
};

exports.getAllSubCategories = async (req, res) => {
  try {
    const allSubCategories = await SubCategory.find({})
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).json(allSubCategories);
  } catch (error) {
    res.status(400).send('Get all subcategories failed!');
  }
};

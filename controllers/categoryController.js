const Category = require('../models/category');
const Item = require('../models/item');

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.categoryList = asyncHandler(async (req, res, next) => {
    const categoryList = await Category.find({}, 'name').exec();

    res.render('category/list', {
        title: 'Category List',
        categoryList
    });
});

exports.categoryDetail = asyncHandler(async (req, res, next) => {
    const [category, itemsInCategory] = await Promise.all([
        Category.findById(req.params.id).exec(),
        Item.find({ category: req.params.id }, 'name company inStock').exec()
    ]);

    if (category === null) {
        const err = new Error('Category not found');
        err.status = 404;
        return next(err);
    }

    res.render('category/detail', {
        title: 'Category details',
        category,
        itemsInCategory
    });
});

exports.categoryCreateGet = asyncHandler(async (req, res, next) => {
    res.render('category/form', { title: 'Create category' });
});

exports.categoryCreatePost = [
    body('name', 'Category name must contain at least 2 letters')
        .trim()
        .isLength({ min: 2 })
        .escape(),

    body('description')
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const category = new Category({
            name: req.body.name,
            description: req.body.description,
        });
        console.log(category);
        if (!errors.isEmpty()) {
            res.render('category/form', {
                title: 'Create category',
                category: category,
                errors: errors.array()
            });
            return;
        }

        const existingCategory = await Category.findOne({ name: req.body.name }).collation({ locale: "en", strength: 2 }).exec();
        
        if (existingCategory) {
            res.redirect(existingCategory.url);
        } else {
            await category.save();
            res.redirect(category.url);
        }
    })
];

exports.categoryUpdateGet = asyncHandler(async (req, res, next) => {
    res.send('category update get');
});

exports.categoryUpdatePost = asyncHandler(async (req, res, next) => {
    res.send('category update post');
});

exports.categoryDeleteGet = asyncHandler(async (req, res, next) => {
    res.send('category delete get');
});

exports.categoryDeletePost = asyncHandler(async (req, res, next) => {
    res.send('category delete post');
});
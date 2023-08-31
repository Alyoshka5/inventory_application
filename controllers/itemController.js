const Item = require('../models/item');
const Category = require('../models/category');

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.index = asyncHandler(async (req, res, next) => {
    const [itemCount, categoryCount] = await Promise.all([
        Item.countDocuments({}).exec(),
        Category.countDocuments({}).exec()
    ]);

    res.render('index', {
        title: 'Tech Inventory',
        itemCount,
        categoryCount
    });
});

exports.itemList = asyncHandler(async (req, res, next) => {
    const itemList = await Item.find({}, 'name company inStock').exec();

    res.render('item/list', {
        title: 'Item List',
        itemList
    })
});

exports.itemDetail = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id).populate('category').exec();

    if (item === null) {
        const err = new Error('Item not found');
        err.status = 404;
        return next(err);
    }

    res.render('item/detail', {
        title: 'Item details',
        item
    })
});

exports.itemCreateGet = asyncHandler(async (req, res, next) => {
    const categories = await Category.find({}, 'name').exec();

    res.render('item/form', {
        title: 'Create item',
        categories
    });
});

exports.itemCreatePost = [
    body('name', 'Name must contain at least 3 letters')
        .trim()
        .isLength({ min: 3 })
        .escape(),

    body('company', 'Company must be specified')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    
    body('inStock', 'Ammount in stock must be a number and cannot be negative')
        .isInt({ min: 0 }),
        
    body('category', 'Category must be specified')
        .trim()
        .isLength({ min: 1 })
        .escape(),

    body('price', 'Price must be a decimal number with a minimum value of 0.01')
        .trim()
        .isFloat({ min: 0.01 })
        .escape(),
        
    body('description')
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const itemPrice = isNaN(req.body.price) || req.body.price.length === 0 ? 0.01 : parseFloat(req.body.price);
        const item = new Item({
            name: req.body.name,
            company: req.body.company,
            description: req.body.description,
            category: req.body.category,
            price: itemPrice,
            inStock: req.body.inStock
        });

        if (!errors.isEmpty()) {
            const categories = await Category.find({}, 'name').exec();

            res.render('item/form', {
                title: 'Create item',
                item,
                categories,
                selectedCategory: item.category._id,
                errors: errors.array()
            });
            return;
        }

        item.save();
        res.redirect(item.url);
    })
];

exports.itemUpdateGet = asyncHandler(async (req, res, next) => {
    const [item, categories] = await Promise.all([
        Item.findById(req.params.id).exec(),
        Category.find({}, 'name').exec()
    ]);

    if (item === null) {
        const err = new Error('Item not found');
        err.status = 404;
        return next(err);
    }

    res.render('item/form', {
        title: 'Update item',
        item,
        selectedCategory: item.category._id,
        categories
    });
});

exports.itemUpdatePost = [
    body('name', 'Name must contain at least 3 letters')
        .trim()
        .isLength({ min: 3 })
        .escape(),

    body('company', 'Company must be specified')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    
    body('inStock', 'Ammount in stock must be a number and cannot be negative')
        .isInt({ min: 0 }),
        
    body('category', 'Category must be specified')
        .trim()
        .isLength({ min: 1 })
        .escape(),

    body('price', 'Price must be a decimal number with a minimum value of 0.01')
        .trim()
        .isFloat({ min: 0.01 })
        .escape(),
        
    body('description')
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const itemPrice = isNaN(req.body.price) || req.body.price.length === 0 ? 0.01 : parseFloat(req.body.price);
        const item = new Item({
            name: req.body.name,
            company: req.body.company,
            description: req.body.description,
            category: req.body.category,
            price: itemPrice,
            inStock: req.body.inStock,
            _id: req.params.id
        });

        if (!errors.isEmpty()) {
            const categories = await Category.find({}, 'name').exec();

            res.render('item/form', {
                title: 'Update item',
                item,
                categories,
                selectedCategory: item.category._id,
                errors: errors.array()
            });
            return;
        }

        await Item.findByIdAndUpdate(req.params.id, item, {});
        res.redirect(item.url);
    })
];

exports.itemDeleteGet = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id).populate('category').exec();

    if (item === null) {
        const err = new Error('Item not found');
        err.status = 404;
        return next(err);
    }
    
    res.render('item/delete', {
        title: 'Delete item',
        item
    });
});

exports.itemDeletePost = asyncHandler(async (req, res, next) => {
    await Item.findByIdAndRemove(req.params.id)
    res.redirect('/inventory/items');
});
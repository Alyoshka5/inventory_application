const Item = require('../models/item');
const Category = require('../models/category');

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.index = asyncHandler(async (req, res, next) => {
    res.send('index')
});

exports.itemList = asyncHandler(async (req, res, next) => {
    res.send('item list');
});

exports.itemDetail = asyncHandler(async (req, res, next) => {
    res.send('item detail');
});

exports.itemCreateGet = asyncHandler(async (req, res, next) => {
    res.send('item create get');
});

exports.itemCreatePost = asyncHandler(async (req, res, next) => {
    res.send('item create post');
});

exports.itemUpdateGet = asyncHandler(async (req, res, next) => {
    res.send('item update get');
});

exports.itemUpdatePost = asyncHandler(async (req, res, next) => {
    res.send('item update post');
});

exports.itemDeleteGet = asyncHandler(async (req, res, next) => {
    res.send('item delete get');
});

exports.itemDeletePost = asyncHandler(async (req, res, next) => {
    res.send('item delete post');
});
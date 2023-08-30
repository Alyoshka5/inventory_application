const Category = require('../models/category');

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.categoryList = asyncHandler(async (req, res, next) => {
    res.send('category list');
});

exports.categoryDetail = asyncHandler(async (req, res, next) => {
    res.send('category detail');
});

exports.categoryCreateGet = asyncHandler(async (req, res, next) => {
    res.send('category create get');
});

exports.categoryCreatePost = asyncHandler(async (req, res, next) => {
    res.send('category create post');
});

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
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: { type: String, required: true, minLength: 2, maxLength: 50 },
    description: { type: String, maxLength: 200 }
});

CategorySchema.virtual('url').get(function() {
    return `/inventory/category/${this._id}`;
});

module.exports = mongoose.model('Category', CategorySchema);
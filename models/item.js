const mongoose = require('mongoose');

const Schema = mongoose.Schema

const ItemSchema = new Schema({
    name: { type: String, required: true, minLength: 3, maxLength: 100 },
    company: { type: String, required: true },
    description: { type: String, maxLength: 200 },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    price: { type: Schema.Types.Decimal128, required: true, min: 0.01 },
    inStock: { type: Number, required: true, min: 0 },
    image: { type: String }
});

ItemSchema.virtual('url').get(function() {
    return `/inventory/item/${this._id}`;
});

module.exports = mongoose.model('Item', ItemSchema);

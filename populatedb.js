#! /usr/bin/env node

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Item = require('./models/item');
const Category = require('./models/category');

const items = [];
const categories = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createItems();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}


async function categoryCreate(idx, name, description) {
    const categoryDetail = { name }
    
    if (description)
        categoryDetail.description = description;
    
    const category = new Category(categoryDetail);
    category.save();
    categories[idx] = category;
}

async function itemCreate(idx, name, company, description, category, price, inStock) {
    const itemDetail = {
        name: name,
        company: company,
        category: category,
        price: price,
        inStock: inStock
    }

    if (description)
        itemDetail.description = description;

    const item = new Item(itemDetail);
    await item.save();
    items[idx] = item;
}


async function createCategories() {
    await Promise.all([
        categoryCreate(0, 'phone', 'Explore our range of cutting-edge smartphones designed to keep you connected and entertained on the go.'),
        categoryCreate(1, 'tablet', 'Discover our collection of sleek and powerful tablets, perfect for work and play, wherever you are.'),
        categoryCreate(2, 'laptop', 'Unleash your productivity with our range of high-performance laptops, designed to meet your computing needs.'),
    ]);
}

async function createItems() {
    await Promise.all([
        itemCreate(
          0,
          'Smartphone X',
          'TechCorp',
          'Experience the latest in mobile technology with our Smartphone X. Fast, sleek, and packed with features.',
          categories[0],
          599.99,
          25
        ),
      
        itemCreate(
          1,
          'Tablet Pro',
          'Gadget Innovators',
          'Stay productive and entertained with our Tablet Pro. A powerful device with a stunning display.',
          categories[1],
          449.99,
          18
        ),
      
        itemCreate(
          2,
          'Laptop Elite',
          'TechMaster',
          'Elevate your computing experience with the Laptop Elite. Exceptional performance for both work and play.',
          categories[2],
          1299.99,
          12
        ),
      
        itemCreate(
          3,
          'PhoneTech X1',
          'InnovateTech',
          'Introducing the PhoneTech X1, a flagship device that redefines mobile communication and innovation.',
          categories[0],
          699.99,
          30
        ),
      
        itemCreate(
          4,
          'Tablet Pro Max',
          'Gadget Innovators',
          'The Tablet Pro Max delivers an unparalleled tablet experience with powerful hardware and sleek design.',
          categories[1],
          549.99,
          20
        ),
      
        itemCreate(
          5,
          'Laptop Prestige',
          'TechMaster',
          'Unleash your potential with the Laptop Prestige. A high-performance laptop built for versatility.',
          categories[2],
          1499.99,
          15
        ),
      
        itemCreate(
          6,
          'PhoneTech XR',
          'InnovateTech',
          'Discover the PhoneTech XR, where style meets functionality to offer a superior smartphone experience.',
          categories[0],
          799.99,
          28
        ),
      
        itemCreate(
          7,
          'Tablet Essentials',
          'Gadget Innovators',
          'The Tablet Essentials is designed for everyday tasks, offering a balance of performance and affordability.',
          categories[1],
          299.99,
          22
        ),
      
        itemCreate(
          8,
          'Laptop ZenBook',
          'TechMaster',
          'Immerse yourself in creativity and productivity with the Laptop ZenBook, a masterpiece of design and power.',
          categories[2],
          1699.99,
          10
        ),
      
        itemCreate(
          9,
          'PhoneTech XS',
          'InnovateTech',
          'Experience the compact power of the PhoneTech XS, a device that redefines pocket-sized performance.',
          categories[0],
          899.99,
          33
        )
    ]);
}
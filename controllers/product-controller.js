const Product = require('../models/Product');

// ✅ Insert sample products
const insertSampleProducts = async (req, res) => {
  try {
    const sampleProducts = [
      {
        name: "iPhone 15",
        price: 999,
        category: "Electronics",
        inStock: true,
        tags: ["smartphone", "bestseller"]
      },
      {
        name: "MacBook Pro",
        price: 2999,
        category: "Electronics",
        inStock: true,
        tags: ["laptop", "premium"]
      },
      {
        name: "Samsung Galaxy S23",
        price: 899,
        category: "Electronics",
        inStock: false,
        tags: ["smartphone", "android"]
      },
      {
        name: "Sony WH-1000XM5",
        price: 349,
        category: "Electronics",
        inStock: true,
        tags: ["headphones", "wireless"]
      },
      {
        name: "Nike Air Max 270",
        price: 150,
        category: "Footwear",
        inStock: true,
        tags: ["shoes", "sportswear"]
      },
      {
        name: "Levi's 501 Original Jeans",
        price: 70,
        category: "Clothing",
        inStock: true,
        tags: ["denim", "casual"]
      },
      {
        name: "The Great Gatsby",
        price: 20,
        category: "Books",
        inStock: true,
        tags: ["fiction", "classic"]
      },
      {
        name: "Atomic Habits",
        price: 25,
        category: "Books",
        inStock: false,
        tags: ["self-help", "bestseller"]
      },
      {
        name: "LG 4K OLED TV",
        price: 1499,
        category: "Electronics",
        inStock: true,
        tags: ["tv", "smart"]
      },
      {
        name: "Adidas Ultraboost",
        price: 180,
        category: "Footwear",
        inStock: true,
        tags: ["running", "popular"]
      }
    ];

    const result = await Product.insertMany(sampleProducts);
    res.status(201).json({
      success: true,
      data: `Inserted ${result.length} sample products`
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred"
    });
  }
};

// ✅ Get product stats by category
const getProductStats = async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $match: {
          inStock: true,
          price: { $gte: 100 }
        }
      },
      {
        $group: {
          _id: "$category",
          avgPrice: { $avg: "$price" },
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred"
    });
  }
};

// ✅ Get product analysis for Electronics category
const getProductAnalysis = async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $match: {
          category: 'Electronics'
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$price"
          },
          averagePrice: {
            $avg: "$price"
          },
          maxProductPrice: {
            $max: "$price"
          },
          minProductPrice: {
            $min: "$price"
          }
        }
      },
      {
        $project: {
          _id: 0,
          totalRevenue: 1,
          averagePrice: 1,
          maxProductPrice: 1,
          minProductPrice: 1,
          priceRange: {
            $subtract: ["$maxProductPrice", "$minProductPrice"]
          }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred"
    });
  }
};

// ✅ Export controllers
module.exports = { 
  insertSampleProducts, 
  getProductStats, 
  getProductAnalysis 
};

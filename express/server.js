const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongoDBUrl = "mongodb://127.0.0.1:27017/mydatabase";
const jwt = require("jsonwebtoken");

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

mongoose
  .connect(mongoDBUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// User model
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

app.post("/user/signup", (req, res) => {
  // Add code to create a new user in the database
  const newUser = new User({
    email: req.body.email,
    password: req.body.password,
  });

  newUser
    .save()
    .then(() => {
      res
        .status(200)
        .json({ code: "success", message: "User created successfully" });
    })
    .catch((error) => {
      res.status(200).json({ code: "error", error: error });
    });
});

app.post("/user/signin", (req, res) => {
  // Add code to handle user sign in
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        res.status(200).json({ code: "error", message: "User not found" });
      } else {
        if (user.password === password) {
          // Generate JWT token
          const token = jwt.sign({ userId: user._id }, "secretKey", {
            expiresIn: "3h",
          });

          res.status(200).json({
            code: "success",
            id: user._id,
            email: user.email,
            token: token,
          });
        } else {
          res
            .status(200)
            .json({ code: "error", message: "Incorrect password" });
        }
      }
    })
    .catch((error) => {
      res.status(200).json({ code: "error", error: error });
    });
});

app.get("/user/get_user_info", (req, res) => {
  const token = req.query.token;
  if (!token) {
    res.status(200).json({ code: "error", message: "Unauthorized" });
  } else {
    jwt.verify(token, "secretKey", (err, decoded) => {
      if (err) {
        res.status(200).json({ code: "error", message: "Invalid token" });
      } else {
        const userId = decoded.userId;
        User.findById(userId)
          .then((user) => {
            if (!user) {
              res
                .status(404)
                .json({ code: "error", message: "User not found" });
            } else {
              res
                .status(200)
                .json({ code: "success", userId: user._id, email: user.email });
            }
          })
          .catch((error) => {
            res.status(500).json({ code: "error", error: error });
          });
      }
    });
  }
});

// Product model
const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  product_description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  in_stock_quantity: {
    type: Number,
    required: true,
  },
  image_link: {
    type: String,
    required: true,
  },
  add_time: {
    type: Date,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

app.post("/product/add", (req, res) => {
  // Add code to create the product in the database
  const newProduct = new Product({
    product_name: req.body.product_name,
    product_description: req.body.product_description,
    category: req.body.category,
    price: req.body.price,
    in_stock_quantity: req.body.in_stock_quantity,
    image_link: req.body.image_link,
    add_time: new Date(),
  });

  newProduct
    .save()
    .then(() => {
      res.status(200).json({ message: "Product created successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

app.get("/product/list", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.pageSize) || 10;
  const order = req.query.orderBy || "";
  const search = req.query.search || "";

  let sortOption = {};
  if (order === "add_time") {
    sortOption = { add_time: -1 };
  } else if (order === "price") {
    sortOption = { price: 1 };
  } else if (order === "price_minus") {
    sortOption = { price: -1 };
  }

  Promise.all([
    Product.find({ product_name: { $regex: search, $options: "i" } })
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit),
    Product.countDocuments({ product_name: { $regex: search, $options: "i" } }),
  ])
    .then(([products, total]) => {
      res.status(200).json({
        data: products,
        total: total,
      });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});
app.get("/product/get", (req, res) => {
  const productId = req.query.id;

  Product.findById(productId)
    .then((product) => {
      if (!product) {
        res.status(404).json({ message: "Product not found" });
      } else {
        res.status(200).json({ data: product });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

app.put("/product/update", (req, res) => {
  const productId = req.body.id;
  const updatedProduct = {
    product_name: req.body.product_name,
    product_description: req.body.product_description,
    category: req.body.category,
    price: req.body.price,
    in_stock_quantity: req.body.in_stock_quantity,
    image_link: req.body.image_link,
  };

  Product.findByIdAndUpdate(productId, updatedProduct)
    .then(() => {
      res.status(200).json({ message: "Product updated successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

app.delete("/product/delete", (req, res) => {
  const productId = req.query.id;

  Product.findByIdAndDelete(productId)
    .then(() => {
      res.status(200).json({ message: "Product deleted successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

// Cart model
const cartSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

app.post("/cart/updatecart", (req, res) => {
  const userId = req.body.userId;
  const productId = req.body.productId;
  const quantity = req.body.quantity;
  const price = req.body.price;

  // Add code to update the cart in the database
  if (quantity === 0) {
    Cart.findOneAndDelete({ userId: userId, productId: productId })
      .then(() => {
        res
          .status(200)
          .json({ code: "success", message: "Cart item deleted successfully" });
      })
      .catch((error) => {
        res.status(200).json({ code: "error", error: error });
      });
  } else {
    Cart.findOneAndUpdate(
      { userId: userId, productId: productId },
      { quantity: quantity, price: price },
      { new: true, upsert: true }
    )
      .then((cart) => {
        res.status(200).json({ code: "success", cart: cart });
      })
      .catch((error) => {
        res.status(200).json({ code: "error", error: error });
      });
  }
});

app.get("/cart/getcart", (req, res) => {
  const userId = req.query.userId;
  // Add code to get the cart for the specified userId from the database
  Cart.find({ userId: userId })
    .then((cart) => {
      res.status(200).json({ code: "success", cart: cart });
    })
    .catch((error) => {
      res.status(200).json({ code: "error", error: error });
    });
});

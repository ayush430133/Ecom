import Cart from "../models/Cart.js";


// Add product to cart //

export const addToCart = async (req, res) => {
    
}
 

 {
  try {
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {

    }
  } catch (error) {
    return res.status(500).json({ message: "Failed to add product to cart" });
  }
}

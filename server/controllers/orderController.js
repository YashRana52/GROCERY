import Order from "../models/order.js";
import Product from "../models/product.js";
import stripe from 'stripe';

// placeOrderCOD
export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    if (!address || items.length === 0) {
      return res.json({ success: false, message: "Invalid data" });
    }

    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.json({ success: false, message: `Product not found: ${item.product}` });
      }
      amount += product.offerPrice * item.quantity;
    }

    amount += Math.floor(amount * 0.02); // Add 2% tax

    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD"
    });

    return res.json({
      success: true,
      message: "Order placed successfully",
    });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// placeOrderStripe
export const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    const { origin } = req.headers;

    if (!address || !items || items.length === 0) {
      return res.json({ success: false, message: "Invalid data" });
    }

    let productData = [];
    let amount = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.json({ success: false, message: `Product not found: ${item.product}` });
      }

      productData.push({
        name: product.name,
        price: product.offerPrice,
        quantity: item.quantity
      });

      amount += product.offerPrice * item.quantity;
    }

    amount += Math.floor(amount * 0.02); // Add 2% tax

    const order = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "Online",
      isPaid: true 
    });

    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    const line_items = productData.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name
        },
        unit_amount: item.price * 100
      },
      quantity: item.quantity
    }));

    const session = await stripeInstance.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/loader?next=my-orders`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: order._id.toString(),
        userId: userId.toString()
      }
    });

    res.json({ success: true, url: session.url });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// getUserOrder
export const getUserOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({
      userId,
      $or: [{ paymentType: 'COD' }, { isPaid: true }]
    }).populate("items.product address").sort({ createdAt: -1 });

    res.json({ success: true, orders });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// getAllOrders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: 'COD' }, { isPaid: true }]
    }).populate("items.product address").sort({ createdAt: -1 });

    res.json({ success: true, orders });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

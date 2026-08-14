import prisma from "../../config/prismaClient.js";

// create product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, slug, image, category } = req.body;

    if (!name || !description || !price || !stock || !slug || !image) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingProduct = await prisma.product.findUnique({
      where: {
        slug: slug,
      },
    });

    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: "Product with this slug already exists",
      });
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price,
        stock,
        image,
        category,
      },
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message,
    });
  }
};

// find product by id and delete it
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
        error: error.message,
      });
    }

    await prisma.product.delete({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: error.message,
    });
  }
};

// update product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, slug, image, category } = req.body;

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
        error: error.message,
      });
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        stock,
        slug,
        image,
        category,
      },
    });

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
};

// get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();

    res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve products",
      error: error.message,
    });
  }
};

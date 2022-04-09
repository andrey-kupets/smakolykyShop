import { IProduct } from '../../models';
import { ProductModel } from '../../database';

class ProductService {
  createProduct(product: IProduct) {
    const productToSave = new ProductModel(product);

    return productToSave.save();
  }

  findProductById(productId: string): Promise<IProduct | null> {
    return ProductModel.findById(productId) as any;
  }

  updateProductById(_id: string, updatedStockCount: Partial<IProduct>): Promise<IProduct> {
    return ProductModel.findByIdAndUpdate(_id, updatedStockCount, {new: true}) as any;
  }
}

export const productService = new ProductService();

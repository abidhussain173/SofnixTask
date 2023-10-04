interface Product {
    productId: string;
    timeInSeconds: number;
}

export interface ProductListProps {
    data: Product;
}
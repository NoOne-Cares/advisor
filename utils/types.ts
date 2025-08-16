export type Product = {
    brand: string;
    product_name: string;
    price: number;
    category: string;
    description: string;
};

export type GeminiCategoryResponse = {
    matchedCategory: string | null;
};

export type GeminiProductRecommendation = {
    product_name: string;
    price: number;
    reason: string;
};
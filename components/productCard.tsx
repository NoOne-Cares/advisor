import React from 'react';
import { Image, Text, View } from 'react-native';
import type { GeminiProductRecommendation } from '../utils/types';
type ProductCardProps = {
    data: GeminiProductRecommendation;
};
const ProductCard = ({ data }: ProductCardProps) => {
    return (
        <View className='items-center'>
            <View className='bg-slate-200 rounded-lg p-5'>
                <View>
                    <Text className='text-slate-400'>{data.cetegory}</Text>
                </View>

                <Text className='font-bold text-lg py-3'>{data.product_name}</Text>

                <View>
                    <Text className='text-pretty'>{data.reason}</Text>
                </View>
                {
                    data.product_name !== "No Product found" && (
                        <>
                            <View className='border-t border-gray-400 my-4'></View>
                            <View className='flex-row items-center justify-between'>
                                <Text className='text-xl font-medium'>{data.price}</Text>
                                <Image
                                    className='ml-2'
                                    source={require('./../assets/icons/arrow-square-right_48.png')}
                                    style={{ width: 24, height: 24 }}
                                    resizeMode="contain"
                                />
                            </View>
                        </>
                    )
                }
            </View>
        </View>

    )
}

export default ProductCard
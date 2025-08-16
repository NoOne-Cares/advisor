import React from 'react'
import { Image, Text, View } from 'react-native'

const Hero = () => {
    return (
        <View className='flex-col items-center'>
            <Image
                source={require('./../assets/icons/virtualassistant.png')}
                style={{ width: 100, height: 100 }}
                className='opacity-70'
                resizeMode="contain"
            />
            <Text className='py-6 font-bold'>Discover the perfect product instantly.</Text>
            <Text className='py-1'>✔ Personalized suggestions</Text>
            <Text className='py-1'>✔ No endless scrolling</Text>
            <Text className='py-1'>✔ Handpicked for you</Text>
        </View>

    )
}

export default Hero
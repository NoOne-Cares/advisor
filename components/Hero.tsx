import React from 'react'
import { Image, Text, View } from 'react-native'

const Hero = () => {
    return (
        <View>
            <Image
                className='ml-2'
                source={require('./../assets/icons/virtualassistant.png')}
                style={{ width: 24, height: 24 }}
                resizeMode="contain"
            />
            <Text>Hero</Text>
        </View>
    )
}

export default Hero
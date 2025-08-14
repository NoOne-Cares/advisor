import React, { useState } from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';
type InputProps = {
    query: () => void;
    setInput: React.Dispatch<React.SetStateAction<string>>;
};
export default function InputBox({ query, setInput }: InputProps) {
    const [inputHeight, setInputHeight] = useState(40);
    const MIN_HEIGHT = 40;
    const MAX_HEIGHT = 100;

    return (
        <View className="flex w-3/4 rounded-2xl border border-gray-600 flex-row items-center pr-1">
            <TextInput
                multiline
                scrollEnabled={inputHeight >= MAX_HEIGHT}
                onContentSizeChange={(e) => {
                    const height = e.nativeEvent.contentSize.height;
                    setInputHeight(Math.min(Math.max(height, MIN_HEIGHT), MAX_HEIGHT));
                }}
                onChangeText={newText => setInput(newText)}
                style={{ height: inputHeight, outlineWidth: 0 }}
                className={`grow px-3 py-2 text-base text-black '
                    }`}
                placeholder="Type here..."
                textAlignVertical="top"
            />
            <TouchableOpacity
                onPress={() => query()}
            // disabled={disabled}
            // style={{ opacity: disabled ? 0.5 : 1 }} // visual feedback for disabled state
            >
                <Image
                    className='ml-2'
                    source={require('./../assets/icons/message.png')}
                    style={{ width: 24, height: 24 }}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        </View>
    );
}

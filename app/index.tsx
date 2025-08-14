
import InputBox from "@/components/InputBox";
import { main } from "@/utils/GeminiHelper";
import { useState } from "react";
import { Text, View } from "react-native";
export default function Index() {
  const [input, setInput] = useState<string>("")

  const query = () => {
    main(input);

  }

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="bg-red-800">Working Starter with Tailwind css</Text>
      <InputBox query={query} setInput={setInput} />
    </View>

  );
}


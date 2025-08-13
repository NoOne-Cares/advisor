
import Hero from "@/components/Hero";
import InputBox from "@/components/InputBox";
import { useProductRecommender } from "@/utils/useFecth";
import { useState } from "react";
import { Text, View } from "react-native";
export default function Index() {
  const [input, setInput] = useState<string>("")
  const { recommend, recommendation, loading, error } = useProductRecommender();
  const [showHero, setShowHero] = useState<boolean>(true);

  const handleInput = () => {
    // if (input.trim() && !loading) {
    if (!loading) {
      setShowHero(false)
      // recommend(input);
      console.log("hide hero")
    }
  }

  return (
    <><View className="items-center bg-orange-500">
      {showHero && (
        <Hero />
      )}
    </View>
      <View className="flex-1 justify-center items-center">
        <InputBox query={handleInput} setInput={setInput} />
        {recommendation && (
          <>
            <Text>{recommendation.product_name}</Text>
            <Text>{recommendation.reason}</Text>
          </>
        )}
      </View>
    </>
  );
}
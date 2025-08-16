
import { Hero, InputBox, ProductCard } from "@/components";
import { useProductRecommender } from "@/utils/useFecth";
import { useState } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform, Text, View } from "react-native";

export default function Index() {
  const [input, setInput] = useState<string>("")
  const { recommend, recommendation, loading, error } = useProductRecommender();
  const [showHero, setShowHero] = useState<boolean>(true);

  const handleInput = () => {
    if (input.trim() && !loading) {
      // if (!loading) {
      setShowHero(false)
      recommend(input);
      console.log("hide hero")
    }
  }

  return (
    <>
      <View className="flex-1 items-center">
        <View className="justify-center basis-4/5 w-3/4">
          {!showHero ? (
            loading ? (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="self-center"
              />
            ) : error ? (
              <>
                <Text>{error}</Text>
              </>
            ) : recommendation ? (<ProductCard data={recommendation} />) : null
          ) : (
            <Hero />
          )}
        </View>
        <KeyboardAvoidingView
          className="w-3/4 flex-col justify-center basis-1/5"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <InputBox query={handleInput} setInput={setInput} />
        </KeyboardAvoidingView>
      </View>
    </>
  );
}
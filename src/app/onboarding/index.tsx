import React, { useCallback, useMemo } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Initialize Material Icons
Ionicons.loadFont();

const OnboardingScreen = () => {
  const router = useRouter();
  const sliderRef = React.useRef<AppIntroSlider>(null);

  const slides = useMemo(
    () => [
      {
        id: "1",
        title: "Choose Products",
        description:
          "Select your favorite categories to see personalized recommendations.",
        image: require("../../assets/Onboarding/1.png"),
      },
      {
        id: "2",
        title: "Make Secure Payments",
        description:
          "Your transactions are protected with encryption and trusted payment methods.",
        image: require("../../assets/Onboarding/2.png"),
      },
      {
        id: "3",
        title: "Get your Orders Fast",
        description:
          "Get your orders delivered quickly with real-time tracking.",
        image: require("../../assets/Onboarding/3.png"),
      },
    ],
    []
  );

  const handleNext = useCallback(() => {
    if (sliderRef.current) {
      const nextIndex = sliderRef.current.state.activeIndex + 1;
      sliderRef.current.goToSlide(nextIndex);
    }
  }, []);

  const handleDone = useCallback(() => {
    router.replace("./(main)/(tabs)/home");
  }, [router]);

  const renderItem = useCallback(
    ({ item }: any) => (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} resizeMode="contain" />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.divider} />
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    ),
    []
  );

  const renderNextButton = useCallback(
    () => (
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Ionicons name="arrow-forward" size={24} color="white" />
      </TouchableOpacity>
    ),
    [handleNext]
  );

  const renderDoneButton = useCallback(
    () => (
      <TouchableOpacity style={styles.button} onPress={handleDone}>
        <Ionicons name="checkmark" size={24} color="white" />
      </TouchableOpacity>
    ),
    [handleDone]
  );

  return (
    <AppIntroSlider
      ref={sliderRef}
      data={slides}
      renderItem={renderItem}
      renderNextButton={renderNextButton}
      renderDoneButton={renderDoneButton}
      onDone={handleDone}
      renderSkipButton={() => null}
      dotStyle={styles.dot}
      activeDotStyle={styles.activeDot}
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFF",
    paddingHorizontal: 24,
    paddingBottom: 80,
  },
  image: {
    width: "80%",
    height: 300,
    marginBottom: 40,
  },
  textContainer: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 16,
  },
  divider: {
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#F83758",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  dot: {
    backgroundColor: "#ccc",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#F83758",
    width: 20,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default OnboardingScreen;

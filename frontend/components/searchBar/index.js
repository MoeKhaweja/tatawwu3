import React, { useState, useRef } from "react";
import { Animated } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";

const AnimatedSearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const animatedController = useRef(new Animated.Value(0)).current;
  const [searchQuery, setSearchQuery] = useState("");

  const handlePress = () => {
    setIsExpanded(!isExpanded);
    Animated.timing(animatedController, {
      toValue: isExpanded ? 0 : 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const searchBarWidth = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: ["10%", "100%"], // change outputRange values as per your needs
  });

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <Animated.View style={{ width: searchBarWidth }}>
      {isExpanded ? (
        <Searchbar
          placeholder='Search'
          onChangeText={onChangeSearch}
          value={searchQuery}
          icon='arrow-left'
          onIconPress={handlePress}
        />
      ) : (
        <IconButton icon='magnify' onPress={handlePress} />
      )}
    </Animated.View>
  );
};

export default AnimatedSearchBar;

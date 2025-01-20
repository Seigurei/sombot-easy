import { FlatList, Image, View, Dimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";

const Carousel = () => {
  const flatlistRef = useRef();
  const screenWidth = Dimensions.get("window").width;
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselData = [
    {
      id: 1,
      image:
        "https://th.bing.com/th/id/OIP.SEw2ky0v-k9Hb8ssNj1U2QHaEw?rs=1&pid=ImgDetMain",
    },
    {
      id: 2,
      image:
        "https://th.bing.com/th/id/OIP.hvLnolQxX2o5u9pvO_hjHwHaFi?rs=1&pid=ImgDetMain",
    },
    {
      id: 3,
      image:
        "https://th.bing.com/th/id/R.b9f817c9f2438a49a1e8146283ea93bf?rik=BVUOGaU935kBbA&pid=ImgRaw&r=0",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % carouselData.length;
      flatlistRef.current.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setActiveIndex(nextIndex);
    }, 2000);

    return () => clearInterval(interval);
  }, [activeIndex, carouselData.length]);

  const getItemLayout = (_, index) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index,
  });

  const renderItem = ({ item }) => (
    <View>
      <Image
        source={{ uri: item.image }}
        style={{ height: 200, width: screenWidth, borderRadius: 12 }}
      />
    </View>
  );

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setActiveIndex(index);
  };

  return (
    <View>
      <FlatList
        data={carouselData}
        ref={flatlistRef}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Carousel;

import { FlatList, Image, View, Dimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";

const Carousel = () => {
  const flatlistRef = useRef();
  const screenWidth = Dimensions.get("window").width;
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselData = [
    {
      id: 1,
      image: "https://i.ytimg.com/vi/cbP9rRtfwZw/maxresdefault.jpg",
    },
    {
      id: 2,
      image:
        "https://angkorpass-production.s3.ap-southeast-1.amazonaws.com/attachments/VDMW406G-1701407912.png",
    },
    {
      id: 3,
      image:
        "https://cdn.oneesports.gg/cdn-data/2021/11/MLBB_M3WorldChampionship_HowToGetTickets.jpg",
    },
    {
      id: 4,
      image:
        "https://www.khmertimeskh.com/wp-content/uploads/2018/05/Anchor-Beach-1st-International-Beach-Volleyball_Pre-PR-750x393.jpg",
    },
    {
      id: 5,
      image:
        "https://www.khmertimeskh.com/wp-content/uploads/2018/12/TSFF-2019-001-708x440.jpg",
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
        keyExtractor={(item) => item.id.toString()}
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

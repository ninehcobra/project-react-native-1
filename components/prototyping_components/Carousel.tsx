import { Colors } from "@/constants/colors";
import { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  ViewToken,
} from "react-native";
import CarouselItem from "./CarouselItem";
import Paginator from "./Paginator";

export interface CarouselItemData {
  key: string;
  title: string;
  image: any;
  description: string;
}

export default function Carousel({
  data,
  onEnd = () => {},
}: {
  data: CarouselItemData[];
  onEnd?: () => void;
}): {
  carouselComponent: React.ReactNode;
  moveNext: () => void;
  movePrevious: () => void;
} {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slideRef = useRef<FlatList | null>(null);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  ).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const moveNext = () => {
    if (currentIndex < data.length - 1) {
      slideRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      onEnd();
    }
  };

  const movePrevious = () => {
    if (currentIndex > 0) {
      slideRef.current?.scrollToIndex({ index: currentIndex - 1 });
    }
  };

  return {
    carouselComponent: (
      <View style={styles.container}>
        <View style={{ flex: 3 }}>
          <FlatList
            renderItem={({ item }) => <CarouselItem item={item} />}
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={32}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewConfig}
            ref={slideRef}
          />
        </View>

        <Paginator data={data} scrollX={scrollX} />
      </View>
    ),
    moveNext,
    movePrevious,
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.neutralColor_5,
  },
});

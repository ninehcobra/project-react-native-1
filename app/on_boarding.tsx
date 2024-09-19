import Carousel, {
  CarouselItemData,
} from "@/components/prototyping_components/Carousel";
import ContainerWrapper from "@/components/prototyping_components/ContainerWrapper";
import CustomButton from "@/components/prototyping_components/CustomButton";

import { View } from "react-native";

export default function OnBoarding({ navigation }: { navigation: any }) {
  const data: CarouselItemData[] = [
    {
      key: "1",
      title: "Albert Schweitzer",
      image: require("../assets/images/on_boarding/thumbnail.png"),
      description:
        "Thành công không phải là chìa khóa dẫn đến hạnh phúc. Hạnh phúc mới là chìa khóa dẫn đến thành công. Nếu bạn yêu thích những gì bạn đang làm, bạn sẽ thành công",
    },
    {
      key: "2",
      title: "Robert Louis Stevenson",
      image: require("../assets/images/on_boarding/thumbnail1.jpg"),
      description:
        "Đừng đánh giá mỗi ngày bằng vụ mùa bạn gặt hái được, mà hãy đánh giá bằng những hạt giống bạn đã gieo trồng",
    },
    {
      key: "3",
      title: "Robert Frost",
      image: require("../assets/images/on_boarding/thumbnail2.jpg"),
      description:
        "Hai con đường tách ra trong khu rừng, và tôi - tôi chọn con đường ít người đi, và điều đó đã tạo nên tất cả sự khác biệt.",
    },
  ];

  const handleOnEnd = (): void => {
    navigation.navigate("sign_in");
  };

  const { carouselComponent, moveNext } = Carousel({
    data: data,
    onEnd: handleOnEnd,
  });
  return (
    <ContainerWrapper>
      {/* <ImageBackground
        style={{ flex: 1 }}
        source={require("../assets/images/on_boarding/thumbnail.png")}
      ></ImageBackground> */}
      {carouselComponent}
      <View style={{ padding: 12, marginBottom: 8 }}>
        <CustomButton
          type="primary"
          title="Tiếp Theo"
          onClick={() => {
            moveNext();
          }}
        />
      </View>
    </ContainerWrapper>
  );
}

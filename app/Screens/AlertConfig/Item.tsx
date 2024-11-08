import { Text, Toggle, View } from "@/Components";
import { StyleSheet } from "react-native";

interface IProp {
  type: "big" | "small";
  title: string;
  value: boolean;
  onPress: () => void;
}

export const Item = ({ type, title, value, onPress }: IProp) => {
  return (
    <View style={styles.container}>
      <Text
        colorType="normal"
        colorLevel="black"
        fontType="subTitle"
        fontLevel={type === "big" ? 1 : 2}
      >
        {title}
      </Text>
      <Toggle value={value} onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
});

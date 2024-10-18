import { View as AnimView, NativeInput } from "./AnimatedComponents";
import { TextInputProps, View, StyleSheet } from "react-native";
import { useColor } from "@/hooks";
import { Hidden } from "./Hidden";
import { useState } from "react";
import { Icon } from "./Icon";
import { Text } from "./Text";

interface IProp extends Omit<TextInputProps, "onChange"> {
  value?: string;
  onChange: (text: string, id?: string) => void;
  placeholder: string;
  multiLine?: number;
  password?: boolean;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  label?: string;
  id?: string;
}

export const TextInput = ({
  value,
  onChange,
  placeholder,
  multiLine,
  password,
  disabled,
  required,
  error,
  label,
  id,
  ...props
}: IProp) => {
  const [visible, setVisible] = useState(false);
  const [focus, setFocus] = useState(false);
  const { color } = useColor();
  const height = !!multiLine ? multiLine * 30 : 40;

  return (
    <View style={styles.container}>
      <Hidden data={label}>
        <Text color="normal" level="black" type="label" fontLevel={1}>
          {label}
          <Hidden data={required}>
            <Text color="error" type="label" fontLevel={1}>
              *
            </Text>
          </Hidden>
        </Text>
      </Hidden>
      <AnimView
        style={{
          ...styles.inputContainer,
          height,
          backgroundColor: color("gray", 50),
          alignItems: !!multiLine ? "flex-start" : "center",
        }}
      >
        <Hidden data={error || focus}>
          <AnimView
            pointerEvents="none"
            style={{
              ...styles.border,
              height,
              borderColor: !!error ? color("error") : focus && color("main", 500),
            }}
          />
        </Hidden>
        <NativeInput
          {...props}
          onBlur={() => setFocus(false)}
          onFocus={() => setFocus(true)}
          secureTextEntry={!!password && !visible}
          value={value}
          onChangeText={(text) => onChange(text, id)}
          placeholder={placeholder}
          multiline={!!multiLine}
          numberOfLines={!!multiLine ? multiLine : 1}
          editable={!!!disabled}
          style={[props.style, styles.input, { color: color("normal", "black") }]}
          placeholderTextColor={color("gray", 400)}
        />
        <Hidden data={password}>
          <Icon
            name={visible ? "Eye" : "EyeOff"}
            size={24}
            onPress={() => setVisible((prev) => !prev)}
          />
        </Hidden>
      </AnimView>
      <Hidden data={error}>
        <Text color="error" type="body" fontLevel={1} style={{ alignSelf: "flex-end" }}>
          {error}
        </Text>
      </Hidden>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 4,
    width: "100%",
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    position: "relative",
  },
  border: {
    zIndex: 40,
    borderWidth: 1,
    top: 0,
    left: 0,
    width: "110%",
    borderRadius: 8,
    position: "absolute",
  },
  input: {
    verticalAlign: "top",
    fontSize: 14,
    fontFamily: "Regular",
    width: "100%",
    height: "100%",
    flexShrink: 1,
  },
});
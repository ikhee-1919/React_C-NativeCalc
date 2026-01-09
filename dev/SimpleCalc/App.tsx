import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  StyleSheet,
  Platform,
} from "react-native";

type Operator = "+" | "-" | "×" | "÷" | null;

function safeNumber(s: string) {
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
}

function format(n: number) {
  if (!Number.isFinite(n)) return "Error";
  // 너무 길면 간단히 줄이기
  const s = n.toString();
  if (s.length <= 14) return s;
  return n.toPrecision(10).replace(/\.?0+$/, "");
}

export default function App() {
  const [display, setDisplay] = useState("0");
  const [stored, setStored] = useState<number | null>(null);
  const [op, setOp] = useState<Operator>(null);
  const [shouldReset, setShouldReset] = useState(false);

  const onDigit = (d: string) => {
    setDisplay((prev) => {
      if (shouldReset) {
        setShouldReset(false);
        return d;
      }
      if (prev === "0") return d;
      return prev + d;
    });
  };

  const onDot = () => {
    setDisplay((prev) => {
      if (shouldReset) {
        setShouldReset(false);
        return "0.";
      }
      if (prev.includes(".")) return prev;
      return prev + ".";
    });
  };

  const onClear = () => {
    setDisplay("0");
    setStored(null);
    setOp(null);
    setShouldReset(false);
  };

  const onBack = () => {
    setDisplay((prev) => {
      if (shouldReset) {
        setShouldReset(false);
        return "0";
      }
      if (prev.length <= 1) return "0";
      const next = prev.slice(0, -1);
      return next === "-" ? "0" : next;
    });
  };

  const onSign = () => {
    setDisplay((prev) => {
      if (prev === "0") return prev;
      return prev.startsWith("-") ? prev.slice(1) : "-" + prev;
    });
  };

  const onPercent = () => {
    const v = safeNumber(display);
    setDisplay(format(v / 100));
    setShouldReset(true);
  };

  const calc = (a: number, b: number, o: Exclude<Operator, null>) => {
    switch (o) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "×":
        return a * b;
      case "÷":
        return b === 0 ? NaN : a / b;
    }
  };

  const onOp = (next: Exclude<Operator, null>) => {
    const v = safeNumber(display);
    if (!Number.isFinite(v)) {
      setDisplay("Error");
      setShouldReset(true);
      return;
    }

    // 연산자만 바꾸는 경우
    if (stored !== null && op !== null && shouldReset) {
      setOp(next);
      return;
    }

    // 첫 연산자
    if (stored === null || op === null) {
      setStored(v);
      setOp(next);
      setShouldReset(true);
      return;
    }

    // 누적 계산
    const r = calc(stored, v, op);
    if (!Number.isFinite(r)) {
      setDisplay("Error");
      setStored(null);
      setOp(null);
      setShouldReset(true);
      return;
    }
    setDisplay(format(r));
    setStored(r);
    setOp(next);
    setShouldReset(true);
  };

  const onEq = () => {
    if (stored === null || op === null) return;

    const v = safeNumber(display);
    const r = calc(stored, v, op);
    if (!Number.isFinite(r)) {
      setDisplay("Error");
      setStored(null);
      setOp(null);
      setShouldReset(true);
      return;
    }
    setDisplay(format(r));
    setStored(null);
    setOp(null);
    setShouldReset(true);
  };

  const Btn = ({
    label,
    onPress,
    kind = "num",
    wide = false,
  }: {
    label: string;
    onPress: () => void;
    kind?: "num" | "op" | "func";
    wide?: boolean;
  }) => (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.btn,
        wide && styles.btnWide,
        kind === "op" && styles.btnOp,
        kind === "func" && styles.btnFunc,
        pressed && { opacity: 0.75 },
      ]}
    >
      <Text
        style={[
          styles.btnText,
          kind === "op" && styles.btnTextOp,
          kind === "func" && styles.btnTextFunc,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.displayWrap}>
          <Text style={styles.subLine}>
            {stored !== null && op ? `${format(stored)} ${op}` : " "}
          </Text>
          <Text style={styles.displayText}>{display}</Text>
        </View>

        <View style={styles.pad}>
          <View style={styles.row}>
            <Btn label="C" kind="func" onPress={onClear} />
            <Btn label="⌫" kind="func" onPress={onBack} />
            <Btn label="%" kind="func" onPress={onPercent} />
            <Btn label="÷" kind="op" onPress={() => onOp("÷")} />
          </View>

          <View style={styles.row}>
            <Btn label="7" onPress={() => onDigit("7")} />
            <Btn label="8" onPress={() => onDigit("8")} />
            <Btn label="9" onPress={() => onDigit("9")} />
            <Btn label="×" kind="op" onPress={() => onOp("×")} />
          </View>

          <View style={styles.row}>
            <Btn label="4" onPress={() => onDigit("4")} />
            <Btn label="5" onPress={() => onDigit("5")} />
            <Btn label="6" onPress={() => onDigit("6")} />
            <Btn label="-" kind="op" onPress={() => onOp("-")} />
          </View>

          <View style={styles.row}>
            <Btn label="1" onPress={() => onDigit("1")} />
            <Btn label="2" onPress={() => onDigit("2")} />
            <Btn label="3" onPress={() => onDigit("3")} />
            <Btn label="+" kind="op" onPress={() => onOp("+")} />
          </View>

          <View style={styles.row}>
            <Btn label="+/-" kind="func" onPress={onSign} />
            <Btn label="0" wide onPress={() => onDigit("0")} />
            <Btn label="." onPress={onDot} />
            <Btn label="=" kind="op" onPress={onEq} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0b0b0d" },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 12, paddingBottom: 18 },

  displayWrap: { flex: 1, justifyContent: "flex-end", paddingBottom: 16 },
  subLine: { color: "#9aa0a6", fontSize: 16, textAlign: "right", marginBottom: 6 },
  displayText: {
    color: "#fff",
    fontSize: Platform.select({ ios: 56, android: 52, default: 52 }),
    fontWeight: "600",
    textAlign: "right",
  },

  pad: { gap: 10 },
  row: { flexDirection: "row", gap: 10 },

  btn: {
    flex: 1,
    height: 64,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1c1c1f",
  },
  btnWide: { flex: 2.05 },
  btnOp: { backgroundColor: "#2f6fed" },
  btnFunc: { backgroundColor: "#2a2a2e" },

  btnText: { color: "#fff", fontSize: 22, fontWeight: "600" },
  btnTextOp: { color: "#fff" },
  btnTextFunc: { color: "#e8eaed" },
});

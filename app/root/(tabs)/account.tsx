import React, {
  useMemo,
  forwardRef,
  PropsWithChildren,
  useImperativeHandle,
  useRef,
} from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

export type BottomModalRef = BottomSheetModal;

type BottomModalProps = PropsWithChildren<{
  title?: string;
  snapPoints?: (string | number)[];
  onConfirm?: () => void;
  onCancel?: () => void;
}>;

const BottomModal = forwardRef<BottomModalRef, BottomModalProps>(
  ({ children, title, snapPoints = ["40%"], onConfirm, onCancel }, ref) => {
    const bottomSheetRef = useRef<BottomSheetModal>(null);

    useImperativeHandle(ref, () => bottomSheetRef.current as BottomSheetModal);

    const memoizedSnapPoints = useMemo(() => snapPoints, [snapPoints]);

    return (
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={memoizedSnapPoints}
      >
        <View style={styles.container}>
          {title && <Text style={styles.title}>{title}</Text>}
          <View style={styles.content}>{children}</View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={onCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={onConfirm}
            >
              <Text style={styles.confirmText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheetModal>
    );
  }
);

export default BottomModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  content: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 8,
  },
  confirmButton: {
    backgroundColor: "#000",
  },
  cancelText: {
    color: "#888",
  },
  confirmText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

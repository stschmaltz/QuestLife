import React from "react";
import { View, Text } from "react-native";
import {
  Modal,
  TextInput,
  Portal,
  useTheme,
  ModalProps,
} from "react-native-paper";

import ThemedButton from "./ThemedButton";
import { CustomTheme } from "../../theme/theme.types";

interface FeedbackModalProps {
  onSubmit: () => void;
  modalContent: React.ReactNode;
  submitDisabled?: boolean;
}

export const ThemedModal: React.FC<FeedbackModalProps & ModalProps> = ({
  visible,
  onDismiss,
  onSubmit,
  modalContent,
  submitDisabled,
}) => {
  const { colors } = useTheme<CustomTheme>();
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        dismissableBackButton
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 40,
          backgroundColor: colors.surface,
          margin: 20,
          borderRadius: 10,
          borderWidth: 1,
        }}
      >
        <Text>
          Please submit your feedback on this quest, we are learning. Your
          feedback helps us improve, thank you!
        </Text>

        {modalContent}
        <ThemedButton
          mode="contained"
          disabled={submitDisabled}
          onPress={() => {
            onSubmit();
          }}
          style={{ marginTop: 20 }}
        >
          Submit
        </ThemedButton>
      </Modal>
    </Portal>
  );
};

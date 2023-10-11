import React from "react";
import { View } from "react-native";
import { TextInput, useTheme } from "react-native-paper";

import { UserRatingOptions } from "../../services/firestore/quests/quest.types";
import { CustomTheme } from "../../theme/theme.types";
import ThemedButton from "../themed/ThemedButton";
import { ThemedModal } from "../themed/ThemedModal";

interface FeedbackModalProps {
  visible: boolean;
  onDismiss: () => void;
  onSubmit: (rating: UserRatingOptions, comment: string) => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  visible,
  onDismiss,
  onSubmit,
}) => {
  const [rating, setRating] = React.useState<UserRatingOptions | null>(null);
  const [comment, setComment] = React.useState("");

  const { colors } = useTheme<CustomTheme>();
  return (
    <ThemedModal
      modalContent={
        <>
          <View
            style={{
              paddingTop: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            {[1, 2, 3, 4, 5].map((number) => (
              <ThemedButton
                key={number}
                style={{
                  backgroundColor: rating === number ? colors.primary : "white",
                  borderWidth: 1,
                  borderColor: "black",
                  width: 50,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 50,
                }}
                onPress={() => setRating(number as UserRatingOptions)}
              >
                {number}
              </ThemedButton>
            ))}
          </View>
          <TextInput
            label="Enter your feedback"
            value={comment}
            onChangeText={setComment}
            placeholder="Your feedback helps us improve! What did you like about this quest? What could be improved?"
            multiline
            mode="outlined"
            style={{ marginTop: 20, height: 100 }}
          />
        </>
      }
      onDismiss={onDismiss}
      visible={visible}
      onSubmit={() => {
        if (!rating) {
          console.log("rating is required");
          return;
        }

        onSubmit(rating, comment);
      }}
      submitDisabled={!rating || !comment}
    >
      <ThemedButton
        mode="contained"
        disabled={!rating || !comment}
        onPress={() => {
          if (!rating) {
            console.log("rating is required");
            return;
          }

          onSubmit(rating, comment);
        }}
        style={{ marginTop: 20 }}
      >
        Submit
      </ThemedButton>
    </ThemedModal>
  );
};

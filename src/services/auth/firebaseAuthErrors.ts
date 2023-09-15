const mapFirebaseError = (errorCode: string): string => {
  const errorMessages: { [key: string]: string } = {
    "auth/email-already-in-use":
      "This email is already in use by another account.",
    "auth/invalid-email": "The email address provided is not valid.",
    "auth/user-disabled": "This user account has been disabled.",
    "auth/user-not-found": "No user found with the provided email.",
    "auth/wrong-password": "Incorrect password. Please try again.",
  };

  return (
    errorMessages[errorCode] ||
    "An unexpected error occurred. Please try again."
  );
};

export { mapFirebaseError };

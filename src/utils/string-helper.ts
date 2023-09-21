const formatEnumValue = (interest: string) => {
  return interest
    .split("_")
    .map((word) => word[0] + word.slice(1).toLowerCase())
    .join(" ");
};

export { formatEnumValue };

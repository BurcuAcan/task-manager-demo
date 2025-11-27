export const formatRelativeTime = (date: string): string => {
  if (date === "Just now") return date;
  return date;
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};


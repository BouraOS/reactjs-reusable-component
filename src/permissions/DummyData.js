export const currentUser = {
  id: 1,
  name: "John Doe",
  role: "user", // Try "admin", "user", or "moderator"
};

export const tasks = [
  { id: 1, title: "Admin Task", userId: 0, status: "pending" },
  { id: 2, title: "User Task 1", userId: 1, status: "completed" },
  { id: 3, title: "User Task 2", userId: 1, status: "pending" },
  { id: 4, title: "Other User Task", userId: 2, status: "pending" },
];

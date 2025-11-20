export const USERS_API_URL = "https://jsonplaceholder.typicode.com/users";

export type Mode = "add" | "edit";

export const MODE = {
  ADD: "add",
  EDIT: "edit",
} as const satisfies Record<string, Mode>;

import { authClient } from "./auth-client";

export const getTokenFromClient = async () => {
  const { data, error } = await authClient.token();
  const token = data?.token;

  if (error || !data?.token) {
    console.error("Failed to get JWT:", error);
    return null;
  }
  return token;
};
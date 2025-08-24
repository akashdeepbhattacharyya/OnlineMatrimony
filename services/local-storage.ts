import { Token } from "@/models/Authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const KEYS = {
  USER_ID: "USER_ID",
  ACCESS_TOKEN: "ACCESS_TOKEN",
  REFRESH_TOKEN: "REFRESH_TOKEN",
  TOKEN_TYPE: "TOKEN_TYPE",
  EXPIRES_IN: "EXPIRES_IN",
};

export const setUserIdAndToken = async (id: string, token?: Token) => {
  await AsyncStorage.setItem(KEYS.USER_ID, id);
  if (token) {
    const tokenData = {
      [KEYS.ACCESS_TOKEN]: token.accessToken,
      [KEYS.REFRESH_TOKEN]: token.refreshToken,
      [KEYS.TOKEN_TYPE]: token.tokenType,
      [KEYS.EXPIRES_IN]: token.expiresIn,
    };
    console.log("Setting token data for user:", id);
    console.log("tokenData:", tokenData);
    await AsyncStorage.setItem(id, JSON.stringify(tokenData));
  }
};

// export const setUserId = async (id: string) => {
//   await AsyncStorage.setItem(KEYS.USER_ID, id);
// };

export const getUserId = async () => {
  return await AsyncStorage.getItem(KEYS.USER_ID) || null;
};

export const setToken = async (token: {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}) => {
  await setItem("ACCESS_TOKEN", token.accessToken);
  await setItem("REFRESH_TOKEN", token.refreshToken);
  await setItem("TOKEN_TYPE", token.tokenType);
  await setItem("EXPIRES_IN", token.expiresIn.toString());
};

export const getToken = async () => {
  const accessToken: string | null = await getItem("ACCESS_TOKEN");
  const refreshToken: string | null = await getItem("REFRESH_TOKEN");
  const tokenType: string | null = await getItem("TOKEN_TYPE");
  const expiresInStr: string | null = await getItem("EXPIRES_IN");
  const expiresIn: number | null = expiresInStr ? parseInt(expiresInStr, 10) : null;

  if (accessToken && refreshToken && tokenType && expiresIn !== null) {
    return {
      accessToken,
      refreshToken,
      tokenType,
      expiresIn,
    };
  }
  return null;
};

const getExistingUserValues = async () => {
  const userId = await AsyncStorage.getItem(KEYS.USER_ID) || "";
  if (!userId) {
    return {};
  }
  return JSON.parse(await AsyncStorage.getItem(userId) || '""') || {}
}

export const setItem = async <T>(key: keyof typeof KEYS, value: T) => {
  const userId = await AsyncStorage.getItem(KEYS.USER_ID) || ""
  if (!userId) {
    throw new Error("No user is logged in. Cannot set item.");
  }
  const newValues = {
    ...(await getExistingUserValues()),
    [key]: value
  }
  await AsyncStorage.setItem(userId, JSON.stringify(newValues));
};

export const getItem = async <T>(key: keyof typeof KEYS): Promise<T | null> => {
  return (await getExistingUserValues())[key] || null;
};

export const removeItem = async (key: keyof typeof KEYS) => {
  const userId = await AsyncStorage.getItem(KEYS.USER_ID) || ""
  const existingValues = await getExistingUserValues()
  delete existingValues[key]
  return await AsyncStorage.setItem(userId, JSON.stringify(existingValues));
};

export const clear = async () => {
  return await AsyncStorage.clear();
};

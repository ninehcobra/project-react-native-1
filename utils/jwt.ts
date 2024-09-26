import AsyncStorage from "@react-native-async-storage/async-storage";

// Lưu token
export const storeToken = async (token: string) => {
  try {
    await AsyncStorage.setItem("jwt_token", token);
  } catch (error) {
    console.error("Error saving token", error);
  }
};

// Lấy token
export const getToken = async () => {
  try {
    return await AsyncStorage.getItem("jwt_token");
  } catch (error) {
    console.error("Error retrieving token", error);
  }
};

// Xóa token
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("jwt_token");
  } catch (error) {
    console.error("Error removing token", error);
  }
};

import {
  createNavigationContainerRef,
  ParamListBase,
  NavigationAction,
} from "@react-navigation/native";

// Tạo reference cho navigation
export const navigationRef = createNavigationContainerRef<ParamListBase>();

// Hàm điều hướng
export function navigate(name: string, params?: object) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

// Hàm dispatch nếu cần sử dụng các hành động điều hướng khác
export function dispatch(action: NavigationAction) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(action);
  }
}

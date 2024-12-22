import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { IUser } from "../interfaces/User";
import userReducer from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";
import instance from "../apis/api";

export interface AuthContextType {
  user: IUser | null;
  login: (token: string, user: IUser) => void;
  logout: () => void;
  handleUser: (data: IUser) => void;
  dispatch: React.Dispatch<any>;
  isAdmin: boolean;
  isLoggedIn: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Hàm kiểm tra thời hạn của token
export const isTokenExpired = (): boolean => {
  const expiryTime = localStorage.getItem("token_expiry");
  if (!expiryTime) return true;

  const currentTime = new Date().getTime();
  return currentTime > parseInt(expiryTime, 10);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, { users: [] });
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const nav = useNavigate();

  const getToken = (): string | null => {
    if (isTokenExpired()) {
      // Xóa token và user nếu token đã hết hạn
      localStorage.removeItem("access_token");
      localStorage.removeItem("token_expiry");
      localStorage.removeItem("user");
      return null;
    }
    return localStorage.getItem("access_token");
  };

  const getUser = (): IUser | null => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };

  const login = (token: string, user: IUser) => {
    if (!token || !user || !user.role_id) {
      console.error("Invalid login data");
      return;
    }

    try {
      // Set thời gian tồn tại cho Token
      const expiryTime = Date.now() + 60 * 60 * 1000; // 1 giờ

      // Lưu token và thời gian hết hạn vào localStorage
      localStorage.setItem("access_token", token);
      localStorage.setItem("token_expiry", expiryTime.toString());

      // Lưu thông tin người dùng
      localStorage.setItem("user", JSON.stringify(user));

      // Cập nhật state
      setUser(user);

      // Điều hướng dựa trên role_id
      const targetRoute =
        user.role_id === 1 || user.role_id === 2 ? "/admin" : "/";
      nav(targetRoute);
    } catch (error) {
      console.error("Error during login process:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("token_expiry");
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
    nav("/login");
  };

  // Lấy token & user và set dữ liệu
  useEffect(() => {
    const token = getToken();
    const storedUser = getUser();

    // Lấy đường dẫn hiện tại
    const currentPath = window.location.pathname;

    // Các đường dẫn không cần kiểm tra token
    const excludedPaths = ["/", "/forgot-password", "/reset-password"];

    if (token && storedUser) {
      setUser(storedUser); // Lưu thông tin người dùng vào state
      setIsLoggedIn(true); // Đánh dấu người dùng đã đăng nhập
    } else if (!excludedPaths.includes(currentPath)) {
      // Chỉ logout và điều hướng nếu không nằm trong danh sách các trang loại trừ
      setIsLoggedIn(false);
      logout();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        dispatch,
        isLoggedIn,
        isAdmin: user?.role_id === 1 || user?.role_id === 2,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

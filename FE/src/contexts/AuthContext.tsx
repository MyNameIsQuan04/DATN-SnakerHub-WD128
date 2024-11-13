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
  isLoggedIn: any;
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

  // useEffect(() => {
  //   const token = localStorage.getItem("access_token");
  //   if (token) {
  //     const user = JSON.parse(localStorage.getItem("user") || "null");
  //     setUser(user);
  //   }
  // }, []);

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
    // Set thời gian tồn tại cho Token
    const expiryTime = new Date().getTime() + 60 * 60 * 1000;

    // Lưu token và thời gian hết hạn vào localStorage
    localStorage.setItem("access_token", token);
    localStorage.setItem("token_expiry", expiryTime.toString());

    // Lưu thông tin người dùng
    localStorage.setItem("user", JSON.stringify(user));

    // Cập nhật state và điều hướng
    setUser(user);
    nav(user.type === "admin" ? "/admin" : "/");
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("token_expiry");
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
    nav("/login");
  };

  const handleUser = async (user: IUser) => {
    try {
      const { data } = await instance.put(`/users/updateme/${user.id}`, user);
      dispatch({ type: "UPDATE_USER", payload: data });
      alert(data.message);
      nav("/admin/users");
    } catch (error) {
      console.log(error);
    }
  };

  // Lấy token & user và set dữ liệu
  useEffect(() => {
    const token = getToken();
    const storedUser = getUser();

    // Lấy đường dẫn hiện tại
    const currentPath = window.location.pathname;

    // Các đường dẫn không cần kiểm tra token
    const excludedPaths = ["/forgot-password", "/reset-password"];

    if (token && storedUser) {
      setUser(storedUser);
      setIsLoggedIn(true);
    } else if (!excludedPaths.includes(currentPath)) {
      // Chỉ logout nếu người dùng không nằm trong danh sách các trang loại trừ
      logout();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        handleUser,
        dispatch,
        isLoggedIn,
        isAdmin: user?.type === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: React.Dispatch<any>;
  isAdmin: boolean;
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

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, dispatch] = useReducer(userReducer, { users: [] });
  const [user, setUser] = useState<IUser | null>(null);
  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      setUser(user);
    }
  }, []);

  const login = (token: string, user: IUser) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    nav(user.type === "admin" ? "/admin" : "/");
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
    nav("/login");
  };

  const handleUser = async (user: IUser) => {
    try {
      const { data } = await instance.put(`/users/updateme/${user._id}`, user);
      dispatch({ type: "UPDATE_USER", payload: data });
      alert(data.message);
      nav("/admin/users");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        handleUser,
        dispatch,
        isAdmin: user?.type === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

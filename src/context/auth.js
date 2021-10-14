import { createContext, useEffect, useReducer } from "react";
import { useContext } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: (userData) => null,
  logout: () => null,
});

let initialState = { user: null, isAuthenticated: false };
const getInitialState = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      initialState = { user, isAuthenticated: true };
    }
  } catch (error) {
    localStorage.removeItem("user");
  }
  return initialState;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGOUT":
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    null,
    getInitialState
  );

  const login = (userData) => dispatch({ type: "LOGIN", payload: userData });
  const logout = () => dispatch({ type: "LOGOUT" });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ login, logout, user, isAuthenticated }}
      {...props}
    />
  );
};

const useAuthState = () => useContext(AuthContext);

export { useAuthState, AuthProvider };

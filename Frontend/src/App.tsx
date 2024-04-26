import { useEffect } from "react";
import AppRouter from "./router"
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "./slice/authSlice";
import { RootState } from "./store/store";

function App() {
  const dispatch = useDispatch();
  const reduxToken = useSelector((state: RootState) => state.auth.token);
  useEffect(() => {
    // Retrieve Token from Cookie
    const cookieToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('STAGE='))
      ?.split('=')[1];

    if (cookieToken !== reduxToken) {
      dispatch(clearUser());
    }

  }, []);

  return (
    <AppRouter />
  )
}

export default App




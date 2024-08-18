import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

function IsUserLoggedIn() {
    const user = useSelector((state: RootState) => state.auth.user);

    if (user) {
        window.location.href = '/';
    }

    return;
}

export default IsUserLoggedIn
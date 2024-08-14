import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

function IsUserLoggedIn() {
    const user = useSelector((state: RootState) => state.auth.user);

    if (user) {
        window.location.href = '/';
    } else {
        window.location.href = '/signin';
    }

    return;
}

export default IsUserLoggedIn
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect } from "react";
import { clearUser } from "../../slice/authSlice";

export function IsUserLoggedIn() {
    const user = useSelector((state: RootState) => state.auth.user);

    if (user) {
        window.location.href = '/';
    }

    return;
}

export function IsCookie() {
    const dispatch = useDispatch();
    const reduxToken = useSelector((state: RootState) => state.auth.token);
    const reduxTokene = useSelector((state: RootState) => state.auth);

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

    return;
}
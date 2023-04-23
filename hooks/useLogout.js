import useUserData from "./useUserData";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";

function useLogout() {
    const router = useRouter();

    async function logoutUser() {
        try {
            deleteCookie('user_data');
            router.push('/');
        }
        catch (err) {
            console.error(err);
        }
    }

    return logoutUser;
}

export default useLogout
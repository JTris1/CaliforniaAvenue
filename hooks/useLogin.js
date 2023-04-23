import useUserData from "./useUserData";
import axios from "axios";

function useLogin() {
    const [data, setData] = useUserData()

    async function loginUser(credentials) {
        try {
            let res = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/users/login', credentials);
            console.log(res);
            setData(res.data);
            return true
        }
        catch (err) {
            console.error(err);
            return false;
        }
    }


    return loginUser;
}

export default useLogin
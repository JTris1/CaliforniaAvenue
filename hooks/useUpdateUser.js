import useLogin from "./useLogin";
import useUserData from "./useUserData";
import axios from "axios";

function useUpdateUser() {
    const [data, setData] = useUserData()
    const login = useLogin();

    async function updateUser(fields) {
        try {
            const config = { headers: { Authorization: `Bearer ${data.accessToken}` } }
            axios.post(process.env.NEXT_PUBLIC_API_URL + '/users/update', fields, config)
                .then((res) => {
                    setData(res.data)
                    return res.updateTime;

                })
                .catch((e) => {
                    console.log(e);
                    return null;
                })
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }

    return updateUser;
}

export default useUpdateUser
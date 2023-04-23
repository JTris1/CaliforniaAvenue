import useUserData from "./useUserData";
import axios from "axios";

function useUpdateUser() {
    const [data, setData] = useUserData()

    async function updateUser(fields) {
        try {
            const config = { headers: { Authorization: `Bearer ${data.accessToken}` } }
            axios.post(process.env.NEXT_PUBLIC_API_URL + '/users/update', fields, config)
                .then((res) => {
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
import axios from "axios"

export const usernameCheck = async (username: string): Promise<boolean> => {
    const checkUsername = await axios.get("http://localhost:8080/api/auth/verifyUsername", {
        params: {
            username: username
        }
    })
    if(!checkUsername.data.available){
        return false;
    }
    return true;
}
import { useQuery } from "@tanstack/react-query"
import { API } from "../../api/API"

const Profile = () => {

    const { data: userData } = useQuery({
        queryKey: ["userData"],
        queryFn: async () => {
            const res = await API.get("/api/v1/auth/profile/")

            return res.data
        }
    })
    return (
        <div>
            {userData?.user?.name}
        </div>
    )
}

export default Profile

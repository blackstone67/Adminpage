import { axiosWithCache } from "../../components/Utility/AxiosWithCache";

export const listColors = async (userInfo) => {
    try {
        
        const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
        };

        let { data } = await axiosWithCache.get(`/api/colors`, config);

        data = data.map(({id, name, codeColor, priorityNumber}) => ({value: id, label: name, color: codeColor, priorityNumber: priorityNumber}));

        return data;

    } catch (error) {
        console.log(error);
    }
};
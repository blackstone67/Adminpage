import { axiosWithCache } from "../../components/Utility/AxiosWithCache";

export const listSizes = async (userInfo) => {
    try {
        
        const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
        };

        let { data } = await axiosWithCache.get(`/api/sizes`, config);

        data = data.map(({id, name}) => ({value: id, label: name}));

        return data;

    } catch (error) {
        console.log(error);
    }
};
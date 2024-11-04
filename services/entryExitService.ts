import axios from "axios";


const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getEntriesExits = async () => {
    const response = await axios.get(`${apiUrl}/entries-exits`);
    return response.data;
}

export const createEntryExit = async (entryExitData: any) => {
    const response = await axios.post(`${apiUrl}/entries-exits`, entryExitData);
    return response.data;
};

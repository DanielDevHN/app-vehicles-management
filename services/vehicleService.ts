import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getVehicles = async () => {
    const response = await axios.get(`${apiUrl}/vehicles`);
    return response.data;
};

export const createVehicle = async (vehicle: { marca: string; modelo: string; placa: string }) => {
    const response = await axios.post(`${apiUrl}/vehicles`, vehicle);
    return response.data;
};

export const updateVehicle = async (id: string, vehicle: { marca: string; modelo: string; placa: string }) => {
    const response = await axios.put(`${apiUrl}/vehicles/${id}`, vehicle);
    return response.data;
};

export const deleteVehicle = async (id: string) => {
    const response = await axios.delete(`${apiUrl}/vehicles/${id}`);
    return response.data;
};

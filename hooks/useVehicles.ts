import { useState, useEffect } from 'react';
import { getVehicles, createVehicle, updateVehicle, deleteVehicle } from '../services/vehicleService';

export const useVehicles = () => {
    const [vehicles, setVehicles] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        loadVehicles();
    }, []);

    const loadVehicles = async () => {
        setLoading(true);
        try {
            const data = await getVehicles();
            setVehicles(data);
        } catch (error) {
            console.error('Error loading vehicles:', error);
        } finally {
            setLoading(false);
        }
    };

    const addVehicle = async (vehicle: { marca: string; modelo: string; placa: string }) => {
        try {
            await createVehicle(vehicle);
            loadVehicles();
        } catch (error) {
            console.error('Error creating vehicle:', error);
        }
    };

    const editVehicle = async (id: string, vehicle: { marca: string; modelo: string; placa: string }) => {
        try {
            await updateVehicle(id, vehicle);
            loadVehicles();
        } catch (error) {
            console.error('Error updating vehicle:', error);
        }
    };

    const removeVehicle = async (id: string) => {
        try {
            await deleteVehicle(id);
            loadVehicles();
        } catch (error) {
            console.error('Error deleting vehicle:', error);
        }
    };

    return { vehicles, loading, addVehicle, editVehicle, removeVehicle };
};

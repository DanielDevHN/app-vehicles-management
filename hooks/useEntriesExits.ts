import { useState, useEffect } from 'react';
import { getEntriesExits, createEntryExit } from '@/services/entryExitService';
import { getVehicles } from '@/services/vehicleService';

export const useEntriesExits = () => {
    const [entriesExits, setEntriesExits] = useState<any[]>([]);
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEntriesExits();
        fetchVehicles();
    }, []);

    const fetchEntriesExits = async () => {
        try {
            const data = await getEntriesExits();
            setEntriesExits(data);
        } finally {
            setLoading(false);
        }
    };

    const fetchVehicles = async () => {
        try {
            const data = await getVehicles();
            setVehicles(data);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        }
    };

    const createNewEntryExit = async (entryExitData: any) => {
        const newEntryExit = await createEntryExit(entryExitData);
        setEntriesExits((prev) => [...prev, newEntryExit]);
    };

    return {
        entriesExits,
        vehicles,
        loading,
        createNewEntryExit
    };
};

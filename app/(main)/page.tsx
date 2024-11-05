/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { getVehicles } from '@/services/vehicleService';
import { getEntriesExits } from '@/services/entryExitService';
import { LayoutContext } from '../../layout/context/layoutcontext';
import Link from 'next/link';

const Dashboard = () => {
    const [vehicles, setVehicles] = useState<any[]>([]);
    const [entriesExits, setEntriesExits] = useState<any[]>([]);
    const [dateTime, setDateTime] = useState<Date | null>(null);
    const { layoutConfig } = useContext(LayoutContext);

    useEffect(() => {
        getVehicles().then((data) => setVehicles(data));
        getEntriesExits().then((data) => setEntriesExits(data));
    }, []);

    useEffect(() => {
        // Actualizar fecha y hora solo en el cliente
        setDateTime(new Date());
        const timer = setInterval(() => setDateTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Bienvenido (a)</h5>
                    <p>
                    <p>{dateTime && dateTime.toLocaleDateString()} {dateTime && dateTime.toLocaleTimeString()}</p>
                    </p>
                </div>
            </div>

            <div className="col-12 xl:col-6">
                <div className="card">
                    <h5>Lista de Vehículos Recientes</h5>
                    <DataTable value={vehicles} rows={5} paginator responsiveLayout="scroll">
                        <Column field="marca" header="Marca" sortable style={{ width: '35%' }} />
                        <Column field="modelo" header="Modelo" sortable style={{ width: '35%' }} />
                        <Column field="placa" header="Placa" sortable style={{ width: '20%' }} />
                        <Column
                            header="Ver"
                            style={{ width: '10%' }}
                            body={() => (
                                <Link href="/pages/list-vehicles">
                                    <Button icon="pi pi-search" text />
                                </Link>
                            )}
                        />
                    </DataTable>
                </div>
            </div>

            <div className="col-12 xl:col-6">
                <div className="card">
                    <h5>Lista de Entradas y Salidas Recientes</h5>
                    <DataTable value={entriesExits} rows={5} paginator responsiveLayout="scroll">
                        <Column field="tipo" header="Tipo" />
                        <Column field="fecha" header="Fecha" />
                        <Column field="vehicleId" header="Vehículo" />
                        <Column
                            header="Ver"
                            style={{ width: '10%' }}
                            body={() => (
                                <Link href="/pages/list-entries-exits">
                                    <Button icon="pi pi-search" text />
                                </Link>
                            )}
                        />
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

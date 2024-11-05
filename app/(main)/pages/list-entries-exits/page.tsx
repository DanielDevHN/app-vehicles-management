/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { Calendar } from 'primereact/calendar';
import { useEntriesExits } from '@/hooks/useEntriesExits';

const EntryExit = () => {
    const { entriesExits, vehicles, loading, addNewEntryExit } = useEntriesExits() as unknown as {
        entriesExits: any[];
        vehicles: { id: string; marca: string }[];
        loading: boolean;
        addNewEntryExit: (entryExit: any) => void;
    };
    const [entryExitDialog, setEntryExitDialog] = useState(false);
    const [entryExit, setEntryExit] = useState({ id: '', fecha: '', hora: '', kilometraje: '', motorista: '', tipo: '', vehicleId: '' });
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const [selectedDate, setSelectedDate] = useState<Date | Date[] | null>(null);
    const [selectedVehicle, setSelectedVehicle] = useState('');
    const [selectedMotorista, setSelectedMotorista] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);

    const entryTypes = [
        { label: 'Entrada', value: 'entrada' },
        { label: 'Salida', value: 'salida' }
    ];

    const openNew = () => {
        setEntryExit({ id: '', fecha: '', hora: '', kilometraje: '', motorista: '', tipo: '', vehicleId: '' });
        setSubmitted(false);
        setEntryExitDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setEntryExitDialog(false);
    };

    const saveEntryExit = () => {
        setSubmitted(true);

        if (entryExit.fecha && entryExit.hora && entryExit.kilometraje && entryExit.motorista && entryExit.tipo && entryExit.vehicleId) {
            addNewEntryExit(entryExit);
            toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Entrada/Salida creada', life: 3000 });
            setEntryExitDialog(false);
            setEntryExit({ id: '', fecha: '', hora: '', kilometraje: '', motorista: '', tipo: '', vehicleId: '' });
        }
    };

    const onDateFilterChange = (e: { value: Date | null }) => {
        setSelectedDate(e.value);
        if (e.value) {
            const formattedDate = e.value.toISOString().split('T')[0];
            dt.current?.filter(formattedDate, 'fecha', 'contains');
        } else {
            dt.current?.filter('', 'fecha', 'contains');
        }
    };

    const onVehicleFilterChange = (e: { value: React.SetStateAction<string> }) => {
        setSelectedVehicle(e.value);
        dt.current?.filter(e.value, 'vehicleId', 'equals');
    };

    const onMotoristaFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMotorista(e.target.value);
        dt.current?.filter(e.target.value, 'motorista', 'contains');
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex align-items-center gap-3">
                <Button label="Exportar Data" icon="pi pi-upload" className="p-button-help" onClick={() => dt.current?.exportCSV()} style={{ minWidth: '180px' }} />
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-calendar" />
                    </span>
                    <Calendar value={selectedDate as Date | null} onChange={(e) => onDateFilterChange({ value: e.value as Date | null })} placeholder="Filtrar por Fecha" dateFormat="yy-mm-dd" />
                </div>
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-car" />
                    </span>
                    <Dropdown value={selectedVehicle} options={vehicles.map((v) => ({ label: v.marca, value: v.id }))} onChange={onVehicleFilterChange} placeholder="Filtrar por Vehículo" showClear />
                </div>
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-user" />
                    </span>
                    <InputText value={selectedMotorista} onChange={(e) => onMotoristaFilterChange(e)} placeholder="Filtrar por Motorista" />
                </div>
            </div>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Registro de Entradas y Salidas</h5>
        </div>
    );

    return (
        <div className="datatable-crud">
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} />

                <DataTable
                    ref={dt}
                    value={entriesExits}
                    paginator
                    rows={10}
                    loading={loading}
                    rowsPerPageOptions={[5, 10, 25]}
                    className="datatable-responsive"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} entradas/salidas"
                    globalFilter={globalFilter}
                    emptyMessage="No se encontraron entradas/salidas."
                    header={header}
                    responsiveLayout="scroll"
                >
                    <Column field="fecha" header="Fecha" sortable />
                    <Column field="hora" header="Hora" />
                    <Column field="kilometraje" header="Kilometraje" />
                    <Column field="motorista" header="Motorista" />
                    <Column field="tipo" header="Tipo" />
                    <Column field="vehicleId" header="Vehículo" body={(rowData) => vehicles.find((v) => v.id === rowData.vehicleId)?.marca || ''} />
                </DataTable>

                <Dialog
                    visible={entryExitDialog}
                    header="Detalles de Entrada/Salida"
                    modal
                    className="p-fluid"
                    onHide={hideDialog}
                    footer={
                        <>
                            <Button label="Cancelar" icon="pi pi-times" onClick={hideDialog} className="p-button-text" />
                            <Button label="Guardar" icon="pi pi-check" onClick={saveEntryExit} autoFocus />
                        </>
                    }
                >
                    <div className="field">
                        <label htmlFor="fecha">Fecha</label>
                        <InputText id="fecha" value={entryExit.fecha} onChange={(e) => setEntryExit({ ...entryExit, fecha: e.target.value })} required />
                    </div>
                    <div className="field">
                        <label htmlFor="hora">Hora</label>
                        <InputText id="hora" value={entryExit.hora} onChange={(e) => setEntryExit({ ...entryExit, hora: e.target.value })} required />
                    </div>
                    <div className="field">
                        <label htmlFor="kilometraje">Kilometraje</label>
                        <InputText id="kilometraje" value={entryExit.kilometraje} onChange={(e) => setEntryExit({ ...entryExit, kilometraje: e.target.value })} required />
                    </div>
                    <div className="field">
                        <label htmlFor="motorista">Motorista</label>
                        <InputText id="motorista" value={entryExit.motorista} onChange={(e) => setEntryExit({ ...entryExit, motorista: e.target.value })} required />
                    </div>
                    <div className="field">
                        <label htmlFor="tipo">Tipo</label>
                        <Dropdown id="tipo" value={entryExit.tipo} options={entryTypes} onChange={(e) => setEntryExit({ ...entryExit, tipo: e.value })} placeholder="Seleccione el tipo" />
                    </div>
                    <div className="field">
                        <label htmlFor="vehicleId">Vehículo</label>
                        <Dropdown id="vehicleId" value={entryExit.vehicleId} options={vehicles.map((v) => ({ label: v.marca, value: v.id }))} onChange={(e) => setEntryExit({ ...entryExit, vehicleId: e.value })} placeholder="Seleccione el vehículo" />
                    </div>
                </Dialog>
            </div>
        </div>
    );
};

export default EntryExit;

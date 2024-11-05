/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { useEntriesExits } from '@/hooks/useEntriesExits';

const EntryExit = () => {
    const { entriesExits, vehicles, loading, createNewEntryExit } = useEntriesExits() as unknown as {
        entriesExits: any[];
        vehicles: { id: string; marca: string }[];
        loading: boolean;
        createNewEntryExit: (entryExit: any) => void;
    };
    const [entryExitDialog, setEntryExitDialog] = useState(false);
    const [entryExit, setEntryExit] = useState<{ id: string; fecha: Date | null; hora: string; kilometraje: string; motorista: string; tipo: string; vehicleId: string }>({ id: '', fecha: null, hora: '', kilometraje: '', motorista: '', tipo: '', vehicleId: '' });
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);

    const entryTypes = [
        { label: 'Entrada', value: 'entrada' },
        { label: 'Salida', value: 'salida' }
    ];

    const openNew = () => {
        setEntryExit({ id: '', fecha: null, hora: '', kilometraje: '', motorista: '', tipo: '', vehicleId: '' });
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
            createNewEntryExit(entryExit);
            toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Entrada/Salida creada', life: 3000 });
            setEntryExitDialog(false);
            setEntryExit({ id: '', fecha: null, hora: '', kilometraje: '', motorista: '', tipo: '', vehicleId: '' });
        }
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Nueva Entrada/Salida" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Gestión de Entradas y Salidas</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    return (
        <div className="datatable-crud">
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} />

                <DataTable
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
                        <Calendar
                            id="fecha"
                            value={entryExit.fecha}
                            onChange={(e) => setEntryExit({ ...entryExit, fecha: e.value || null })}
                            dateFormat="yy-mm-dd"
                            placeholder="Seleccione la fecha"
                            required
                        />
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

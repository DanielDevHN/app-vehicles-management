/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { FileUpload } from 'primereact/fileupload';
import { useVehicles } from '@/hooks/useVehicles';

const ListVehicles = () => {
    const { vehicles, loading, addVehicle, editVehicle, removeVehicle } = useVehicles();
    const [vehicleDialog, setVehicleDialog] = useState(false);
    const [deleteVehicleDialog, setDeleteVehicleDialog] = useState(false);
    const [deleteVehiclesDialog, setDeleteVehiclesDialog] = useState(false);
    const [vehicle, setVehicle] = useState({ id: '', marca: '', modelo: '', placa: '', created_at: '', updated_at: '' });
    const [selectedVehicles, setSelectedVehicles] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);

    // const openNew = () => {
    //     setVehicle({ id: '', marca: '', modelo: '', placa: '', created_at: '', updated_at: '' });
    //     setSubmitted(false);
    //     setVehicleDialog(true);
    // };

    // const hideDialog = () => {
    //     setSubmitted(false);
    //     setVehicleDialog(false);
    // };

    // const hideDeleteVehicleDialog = () => {
    //     setDeleteVehicleDialog(false);
    // };

    // const hideDeleteVehiclesDialog = () => {
    //     setDeleteVehiclesDialog(false);
    // };

    const saveVehicle = () => {
        setSubmitted(true);

        if (vehicle.marca.trim() && vehicle.modelo.trim() && vehicle.placa.trim()) {
            if (vehicle.id) {
                editVehicle(vehicle.id, vehicle);
                toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Vehículo actualizado', life: 3000 });
            } else {
                addVehicle(vehicle);
                toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Vehículo creado', life: 3000 });
            }
            setVehicleDialog(false);
            setVehicle({ id: '', marca: '', modelo: '', placa: '', created_at: '', updated_at: '' });
        }
    };

    const editVehicleData = (vehicleData: any) => {
        setVehicle({ ...vehicleData });
        setVehicleDialog(true);
    };

    const confirmDeleteVehicle = (vehicleData: any) => {
        setVehicle(vehicleData);
        setDeleteVehicleDialog(true);
    };

    // const deleteVehicle = () => {
    //     removeVehicle(vehicle.id);
    //     setDeleteVehicleDialog(false);
    //     setVehicle({ id: '', marca: '', modelo: '', placa: '', created_at: '', updated_at: '' });
    //     toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Vehículo eliminado', life: 3000 });
    // };

    // const confirmDeleteSelected = () => {
    //     setDeleteVehiclesDialog(true);
    // };

    // const deleteSelectedVehicles = () => {
    //     let _vehicles = vehicles.filter((val) => !(selectedVehicles as any)?.includes(val));
    //     setSelectedVehicles(null);
    //     setDeleteVehiclesDialog(false);
    //     toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Vehículos eliminados', life: 3000 });
    // };

    // const leftToolbarTemplate = () => {
    //     return (
    //         <React.Fragment>
    //             <div className="my-2">
    //                 <Button label="Nuevo Vehículo" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
    //                 <Button label="Eliminar" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedVehicles || !(selectedVehicles as any).length} />
    //             </div>
    //         </React.Fragment>
    //     );
    // };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                {/* <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseLabel="Importar" className="mr-2 inline-block" /> */}
                <Button label="Exportar Data" icon="pi pi-upload" className="p-button-help" onClick={() => dt.current?.exportCSV()} />
            </React.Fragment>
        );
    };

    const actionBodyTemplate = (rowData: any) => {
        return (
            <>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editVehicleData(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteVehicle(rowData)} />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Registro de Vehículos</h5>
            {/* <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Buscar..." />
            </span> */}
        </div>
    );

    return (
        <div className="datatable-crud">
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={""}></Toolbar>

                <DataTable
                    ref={dt}
                    value={vehicles}
                    selection={selectedVehicles}
                    onSelectionChange={(e) => setSelectedVehicles(e.value as any)}
                    dataKey="id"
                    paginator
                    rows={10}
                    loading={loading}
                    rowsPerPageOptions={[5, 10, 25]}
                    className="datatable-responsive"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} vehículos"
                    globalFilter={globalFilter}
                    emptyMessage="No se encontraron vehículos."
                    header={header}
                    responsiveLayout="scroll"
                >
                    {/* <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column> */}
                    <Column field="id" header="Id" sortable />
                    <Column field="marca" header="Marca" />
                    <Column field="modelo" header="Modelo"  />
                    <Column field="placa" header="Placa"  />
                    <Column field="created_at" header="Creado"  />
                    <Column field="updated_at" header="Actualizado"  />
                    {/* <Column body={actionBodyTemplate}></Column> */}
                </DataTable>

                {/* <Dialog
                    visible={vehicleDialog}
                    header="Detalles del Vehículo"
                    modal
                    className="p-fluid"
                    onHide={hideDialog}
                    footer={
                        <>
                            <Button label="Cancelar" icon="pi pi-times" onClick={hideDialog} className="p-button-text" />
                            <Button label="Guardar" icon="pi pi-check" onClick={saveVehicle} autoFocus />
                        </>
                    }
                >
                    <div className="field">
                        <label htmlFor="marca">Marca</label>
                        <InputText id="marca" value={vehicle.marca} onChange={(e) => setVehicle({ ...vehicle, marca: e.target.value })} required />
                    </div>
                    <div className="field">
                        <label htmlFor="modelo">Modelo</label>
                        <InputText id="modelo" value={vehicle.modelo} onChange={(e) => setVehicle({ ...vehicle, modelo: e.target.value })} required />
                    </div>
                    <div className="field">
                        <label htmlFor="placa">Placa</label>
                        <InputText id="placa" value={vehicle.placa} onChange={(e) => setVehicle({ ...vehicle, placa: e.target.value })} required />
                    </div>
                </Dialog> */}

                {/* <Dialog
                    visible={deleteVehicleDialog}
                    header="Confirmar"
                    modal
                    onHide={hideDeleteVehicleDialog}
                    footer={
                        <>
                            <Button label="No" icon="pi pi-times" onClick={hideDeleteVehicleDialog} className="p-button-text" />
                            <Button label="Sí" icon="pi pi-check" onClick={deleteVehicle} autoFocus />
                        </>
                    }
                >
                    <div className="flex align-items-center justify-content-center">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        {vehicle && (
                            <span>
                                ¿Está seguro de que desea eliminar <b>{vehicle.marca}</b>?
                            </span>
                        )}
                    </div>
                </Dialog>

                <Dialog
                    visible={deleteVehiclesDialog}
                    header="Confirmar"
                    modal
                    onHide={hideDeleteVehiclesDialog}
                    footer={
                        <>
                            <Button label="No" icon="pi pi-times" onClick={hideDeleteVehiclesDialog} className="p-button-text" />
                            <Button label="Sí" icon="pi pi-check" onClick={deleteSelectedVehicles} autoFocus />
                        </>
                    }
                >
                    <div className="flex align-items-center justify-content-center">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        {selectedVehicles && <span>¿Está seguro de que desea eliminar los vehículos seleccionados?</span>}
                    </div>
                </Dialog> */}
            </div>
        </div>
    );
};

export default ListVehicles;

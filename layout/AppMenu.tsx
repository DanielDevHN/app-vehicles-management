/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';
import { AppMenuItem } from '@/types';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);

    const model: AppMenuItem[] = [
        {
            label: 'Home',
            items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
        },
        {
            label: 'Vehiculos',
            items: [
                { label: 'Registrar Vehiculos', icon: 'pi pi-fw pi-car', to: '/pages/crud' },
                { label: 'Ver Lista de Vehiculos', icon: 'pi pi-fw pi-check-square', to: '/uikit/input' }
            ]
        },
        {
            label: 'Entradas / Salidas',
            icon: 'pi pi-fw pi-briefcase',
            to: '/pages',
            items: [
                {
                    label: 'Registrar Entrada / Salida',
                    icon: 'pi pi-fw pi-ticket',
                    to: '/pages/crud'
                },
                {
                    label: 'Ver Registro Entradas / Salidas',
                    icon: 'pi pi-fw pi-check-square',
                    to: '/pages/crud'
                }
            ]
        },
        {
            label: 'Filtros',
            items: [
                {
                    label: 'Documentation',
                    icon: 'pi pi-fw pi-filter',
                    to: '/documentation'
                },
                {
                    label: 'Figma',
                    to: '',
                    icon: 'pi pi-fw pi-pencil'
                },
                {
                    label: 'View Source',
                    icon: 'pi pi-fw pi-search',
                    to: ''
                }
            ]
        }
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}

                {/* <Link href="https://samsahn.com/" target="_blank" style={{ cursor: 'pointer' }}>
                    <img alt="Samsa" className="w-full mt-3" src={"https://samsahn.com/wp-content/uploads/2022/06/samsa-logo-h.svg"} />
                </Link> */}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;

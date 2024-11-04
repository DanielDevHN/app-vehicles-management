'use client';
import React, { useState, createContext, useCallback, useContext } from 'react';
import { LayoutState, ChildContainerProps, LayoutConfig, LayoutContextProps } from '@/types';
import { PrimeReactContext } from 'primereact/api';

export const LayoutContext = createContext({} as LayoutContextProps);

export const LayoutProvider = ({ children }: ChildContainerProps) => {
    const { changeTheme } = useContext(PrimeReactContext);
    const [layoutConfig, setLayoutConfig] = useState<LayoutConfig>({
        menuMode: 'static',
        colorScheme: 'light',
        theme: 'lara-light-indigo',
        scale: 14
    });

    const [layoutState, setLayoutState] = useState<LayoutState>({
        staticMenuDesktopInactive: false,
        overlayMenuActive: false,
        configSidebarVisible: false,
        staticMenuMobileActive: false,
        menuHoverActive: false
    });

    const onMenuToggle = () => {
        if (isOverlay()) {
            setLayoutState((prevLayoutState) => ({ ...prevLayoutState, overlayMenuActive: !prevLayoutState.overlayMenuActive }));
        }

        if (isDesktop()) {
            setLayoutState((prevLayoutState) => ({ ...prevLayoutState, staticMenuDesktopInactive: !prevLayoutState.staticMenuDesktopInactive }));
        } else {
            setLayoutState((prevLayoutState) => ({ ...prevLayoutState, staticMenuMobileActive: !prevLayoutState.staticMenuMobileActive }));
        }
    };

    const isOverlay = () => {
        return layoutConfig.menuMode === 'overlay';
    };

    const isDesktop = () => {
        return window.innerWidth > 991;
    };

    const toggleTheme = useCallback(() => {
        const newTheme = layoutConfig.colorScheme === 'light' ? 'viva-dark' : 'lara-light-indigo';
        const newColorScheme = layoutConfig.colorScheme === 'light' ? 'dark' : 'light';

        changeTheme?.(layoutConfig.theme, newTheme, 'theme-css', () => {
            setLayoutConfig((prevConfig) => ({
                ...prevConfig,
                theme: newTheme,
                colorScheme: newColorScheme,
            }));
        });
    }, [layoutConfig, changeTheme]);

    const value: LayoutContextProps = {
        layoutConfig,
        setLayoutConfig,
        layoutState,
        setLayoutState,
        onMenuToggle,
        toggleTheme
    };

    return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
};

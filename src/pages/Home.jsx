import React from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-column justify-content-center align-items-center text-center gap-4 w-full h-full">
            <h1 className="text-5xl font-bold">Bienvenido a la plataforma</h1>
            <p className="text-xl">Elegí una sección para comenzar la gestión</p>

            <div className="flex gap-4 flex-wrap justify-content-center">
                <Button
                    label="Gestión de productos"
                    icon="pi pi-box"
                    className="p-button-lg p-button-raised p-button-secondary"
                    onClick={() => navigate('/productos')}
                />
                <Button
                    label="Gestión de personas"
                    icon="pi pi-users"
                    className="p-button-lg p-button-raised p-button-secondary"
                    onClick={() => navigate('/personas')}
                />
            </div>
        </div>
    );
}

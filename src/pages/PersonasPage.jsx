import React from 'react';
import { Card } from 'primereact/card';
import UsuariosView from '../components/UsuariosView';

export default function PersonasPage() {
    return (
        <Card title="Gestión de Personas">
            <UsuariosView />
        </Card>
    );
}

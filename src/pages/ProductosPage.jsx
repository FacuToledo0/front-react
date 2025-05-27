import React from 'react';
import { Card } from 'primereact/card';
import ProductosView from '../components/ProductosView';

export default function ProductosPage() {
    return (
        <Card title="Gestión de Productos">
            <ProductosView />
        </Card>
    );
}

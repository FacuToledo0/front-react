import React, { useEffect, useState } from 'react';
import { getProductos, createProducto, updateProducto, deleteProducto } from '../services/productos_API';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import ExportPDF from './ExportPDF';

export default function ProductosView() {
    const [productos, setProductos] = useState([]);
    const [form, setForm] = useState({ nombre: '', precio: '' });
    const [editandoId, setEditandoId] = useState(null);

    const cargarDatos = async () => {
        const res = await getProductos();
        setProductos(res.data);
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones
        if (!form.nombre.trim()) {
            alert('El nombre es obligatorio.');
            return;
        }

        if (!form.precio || isNaN(form.precio)) {
            alert('El precio debe ser un número válido.');
            return;
        }

        if (editandoId) {
            await updateProducto(editandoId, form);
        } else {
            await createProducto(form);
            alert('Producto creado correctamente.');
        } 

        setForm({ nombre: '', precio: '' });
        setEditandoId(null);
        cargarDatos();
    };


    const handleEdit = (producto) => {
        setForm({ nombre: producto.nombre, precio: producto.precio });
        setEditandoId(producto.id);
    };

    const handleDelete = async (id) => {
        await deleteProducto(id);
        cargarDatos();
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
                <InputText placeholder="Nombre" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} />
                <InputText placeholder="Precio" value={form.precio} onChange={e => setForm({ ...form, precio: e.target.value })} />
                <Button label={editandoId ? "Actualizar" : "Crear"} icon="pi pi-check" type="submit" />
            </form>

            <ExportPDF data={productos} title="Productos" columns={['nombre', 'precio']} />

            <ul className="mt-4">
                {productos.map(p => (
                    <li key={p.id} className="mb-2">
                        {p.nombre} - ${p.precio} &nbsp;
                        <Button icon="pi pi-pencil" onClick={() => handleEdit(p)} className="p-button-sm p-button-text" />
                        <Button icon="pi pi-trash" onClick={() => handleDelete(p.id)} className="p-button-sm p-button-text p-button-danger" />
                    </li>
                ))}
            </ul>
        </div>
    );
}

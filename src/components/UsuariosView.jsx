import React, { useEffect, useState } from 'react';
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario } from '../services/usuarios_API';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import ExportPDF from './ExportPDF';

export default function UsuariosView() {
    const [usuarios, setUsuarios] = useState([]);
    const [form, setForm] = useState({ nombre: '', email: '', edad: '' });
    const [editandoId, setEditandoId] = useState(null);

    const cargarDatos = async () => {
        const res = await getUsuarios();
        setUsuarios(res.data);
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!form.email || !emailRegex.test(form.email)) {
            alert('Por favor ingresa un email válido.');
            return;
        }
        
        if (!form.nombre.trim()) {
            alert('El nombre es obligatorio.');
            return;
        }

        if (!form.edad || isNaN(form.edad)) {
            alert('La edad debe ser un número válido.');
            return;
        }

        if (editandoId) {
            await updateUsuario(editandoId, form);
        } else {
            await createUsuario(form);
            alert('Persona creada correctamente.');
        }

        setForm({ nombre: '', email: '', edad: '' });
        setEditandoId(null);
        cargarDatos();
    };


    const handleEdit = (usuario) => {
        setForm({ nombre: usuario.nombre, email: usuario.email, edad: usuario.edad });
        setEditandoId(usuario.id);
    };

    const handleDelete = async (id) => {
        await deleteUsuario(id);
        cargarDatos();
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
                <InputText placeholder="Nombre" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} />
                <InputText placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                <InputText placeholder="Edad" value={form.edad} onChange={e => setForm({ ...form, edad: e.target.value })} />
                <Button label={editandoId ? "Actualizar" : "Crear"} icon="pi pi-check" type="submit" />
            </form>

            <ExportPDF data={usuarios} title="Personas" columns={['nombre', 'email', 'edad']} />

            <ul className="mt-4">
                {usuarios.map(u => (
                    <li key={u.id} className="mb-2">
                        {u.nombre} - {u.email} - {u.edad} años &nbsp;
                        <Button icon="pi pi-pencil" onClick={() => handleEdit(u)} className="p-button-sm p-button-text" />
                        <Button icon="pi pi-trash" onClick={() => handleDelete(u.id)} className="p-button-sm p-button-text p-button-danger" />
                    </li>
                ))}
            </ul>
        </div>
    );
}

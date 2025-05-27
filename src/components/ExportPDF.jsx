import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Button } from 'primereact/button';

export default function ExportPDF({ data, title, columns }) {
    const exportar = () => {
        const doc = new jsPDF();
        doc.text(`Listado de ${title}`, 14, 15);

        autoTable(doc, {
            startY: 20,
            head: [columns],
            body: data.map(item => columns.map(c => item[c])),
        });

        doc.save(`${title}.pdf`);
    };

    return (
        <Button label="Exportar PDF" icon="pi pi-file-pdf" className="mb-3" onClick={exportar} />
    );
}

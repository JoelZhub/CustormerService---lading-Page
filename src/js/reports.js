document.addEventListener('DOMContentLoaded', () => {
    const reportMenuItems = document.querySelectorAll('#reports-menu li');
    const reportTitle = document.getElementById('report-title');
    const reportDateSpan = document.getElementById('report-date');
    const tableBody = document.getElementById('report-table-body');
    const tableHeadersRow = document.getElementById('table-headers');

    const tableData = {
        'ticket': [
            { num: 'E-12', type: 'Experience', customer: 'Juan', state: 'Pendiente', date: '08/12/2025', agent: 'Juan' },
            { num: 'E-13', type: 'Soporte', customer: 'Maria', state: 'Cerrado', date: '08/12/2025', agent: 'Ana' },
            { num: 'E-14', type: 'Consulta', customer: 'Pedro', state: 'En Proceso', date: '07/12/2025', agent: 'Carlos' },
            { num: 'E-15', type: 'Experience', customer: 'Laura', state: 'Pendiente', date: '06/12/2025', agent: 'Juan' },
            { num: 'E-16', type: 'Soporte', customer: 'David', state: 'Cerrado', date: '05/12/2025', agent: 'Maria' }
        ],
        'complaint': [
            { num: 'C-01', type: 'Servicio Lento', customer: 'Elena', state: 'Abierta', date: '04/12/2025', agent: 'Ana' },
            { num: 'C-02', type: 'Producto Defectuoso', customer: 'Miguel', state: 'Resuelta', date: '03/12/2025', agent: 'Carlos' }
        ],
        'suggestion': [
            { num: 'S-10', type: 'Mejora UX App', customer: 'Sofía', state: 'Revisión', date: '02/12/2025', agent: 'Maria' },
            { num: 'S-11', type: 'Nueva Función Chat', customer: 'Jorge', state: 'Aceptada', date: '01/12/2025', agent: 'Ana' }
        ]
    };
    
    const tableHeaders = {
        'ticket': ['# Num', 'Type', 'Customer', 'State', 'Creation Date', 'Agent in charge'],
        'complaint': ['# Num', 'Type', 'Customer', 'State', 'Creation Date', 'Agent in charge'],
        'suggestion': ['# Num', 'Type', 'Customer', 'State', 'Creation Date', 'Agent in charge']
    };

    const generateTableRows = (data) => {
        return data.map(item => `
            <tr>
                <td>${item.num}</td>
                <td>${item.type}</td>
                <td>${item.customer}</td>
                <td>${item.state}</td>
                <td>${item.date}</td>
                <td>${item.agent}</td>
            </tr>
        `).join('');
    };

    const updateReportContent = (reportType) => {
        const titleText = reportType.charAt(0).toUpperCase() + reportType.slice(1) + ' Report';
        if (reportTitle) reportTitle.textContent = titleText;
        
        const headers = tableHeaders[reportType] || tableHeaders['ticket'];
        if (tableHeadersRow) {
            tableHeadersRow.innerHTML = headers.map(header => `<th>${header}</th>`).join('');
        }

        const newData = tableData[reportType] || tableData['ticket'];
        if (tableBody) {
            if (newData && newData.length > 0) {
                tableBody.innerHTML = generateTableRows(newData);
            } else {
                tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px;">No hay datos de reporte disponibles.</td></tr>';
            }
        }
        
        const tableWrapper = document.querySelector('.table-wrapper');
        if (tableWrapper) tableWrapper.scrollTop = 0;
    };

    reportMenuItems.forEach(li => {
        li.addEventListener('click', () => {
            const reportType = li.getAttribute('data-report-type');
            reportMenuItems.forEach(item => item.classList.remove('active'));
            li.classList.add('active');
            updateReportContent(reportType);
        });
    });

    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
    if (reportDateSpan) reportDateSpan.textContent = formattedDate;

    updateReportContent('ticket');
});

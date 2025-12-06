document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('#main-menu li');
    const widgetContainers = document.querySelectorAll('.widgets-container .widgets');
    const tableBody = document.getElementById('tickets-table-body');
    const tableTitle = document.getElementById('table-title');
    const tableWrapper = document.querySelector('.table-wrapper');
    const customScrollbar = document.querySelector('.custom-scrollbar');
    
    const tableData = {
        'tickets-widget': [
            { num: 'E-12', type: 'Soporte', customer: 'Juan', state: 'Pendiente', date: '05/12/2025 9:33 A.M.', time: '5:00 m' },
            { num: 'E-13', type: 'Reclamo', customer: 'Ana', state: 'Cerrado', date: '04/12/2025 10:15 A.M.', time: '1h 20m' },
            { num: 'E-14', type: 'Consulta', customer: 'Pedro', state: 'En Proceso', date: '05/12/2025 1:00 P.M.', time: '2:00 m' },
            { num: 'E-15', type: 'Soporte', customer: 'Laura', state: 'Pendiente', date: '05/12/2025 2:30 P.M.', time: '1:00 m' },
            { num: 'E-16', type: 'Soporte', customer: 'Juan', state: 'Pendiente', date: '05/12/2025 9:33 A.M.', time: '5:00 m' },
            { num: 'E-17', type: 'Soporte', customer: 'María', state: 'Pendiente', date: '05/12/2025 10:00 A.M.', time: '4:30 m' }
        ],
        'complaints-widget': [
            { num: 'C-01', type: 'Servicio', customer: 'Carlos', state: 'Abierta', date: '01/12/2025 8:00 A.M.', time: '5d 1h' },
            { num: 'C-02', type: 'Producto', customer: 'Elena', state: 'Resuelta', date: '30/11/2025 3:00 P.M.', time: '6d 2h' },
            { num: 'C-03', type: 'Factura', customer: 'Miguel', state: 'Pendiente', date: '02/12/2025 11:45 A.M.', time: '4d' }
        ],
        'suggestions-widget': [
            { num: 'S-10', type: 'Mejora UX', customer: 'David', state: 'Revisión', date: '25/11/2025 9:00 A.M.', time: '10d' },
            { num: 'S-11', type: 'Nueva Función', customer: 'Sofía', state: 'Aceptada', date: '20/11/2025 1:00 P.M.', time: '15d' }
        ]
    };
    
    const generateTableRows = (data) => {
        return data.map(item => `
            <tr>
                <td>${item.num}</td>
                <td>${item.type}</td>
                <td>${item.customer}</td>
                <td>${item.state}</td>
                <td>${item.date}</td>
                <td>${item.time}</td>
                <td class="actions">
                    <i class="fa-solid fa-pen-to-square edit-icon"></i>
                    <i class="fa-solid fa-ticket ticket-icon"></i>
                    <i class="fas fa-trash delete-icon"></i>
                </td>
            </tr>
        `).join('');
    };

    const widgetMap = {
        'dashboard': 'tickets-widget',
        'complaints': 'complaints-widget',
        'suggestions': 'suggestions-widget'
    };
    
    
    const updateDashboard = (targetId, title) => {
    
        const tabKey = Object.keys(widgetMap).find(key => widgetMap[key] === targetId) || 'dashboard';
        localStorage.setItem('activeDashboardTab', tabKey); 

        menuItems.forEach(item => item.classList.remove('active'));
        const activeMenuItem = document.querySelector(`#main-menu li[data-target="${targetId}"]`);
        if (activeMenuItem) {
            activeMenuItem.classList.add('active');
        }

        
        widgetContainers.forEach(widget => widget.classList.remove('active'));
        const activeWidget = document.getElementById(targetId);
        if (activeWidget) {
            activeWidget.classList.add('active');
        }

        
        if (tableTitle) tableTitle.textContent = title;

        const newData = tableData[targetId];
        if (tableBody) {
            if (newData && newData.length > 0) {
                tableBody.innerHTML = generateTableRows(newData);
            } else {
                tableBody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 20px;">No hay datos para esta sección.</td></tr>';
            }
        }

        if (tableWrapper) tableWrapper.scrollTop = 0;
        if (typeof updateScrollThumb === 'function') updateScrollThumb(); 
    };

    
    menuItems.forEach(li => {
        li.addEventListener('click', (e) => {
            const targetId = li.getAttribute('data-target');
            
            
            if (targetId) {
                
              
                if (targetId === 'tickets-widget') {
                    
                    e.preventDefault(); 
                    const title = li.getAttribute('data-title');
                    updateDashboard(targetId, title);
                    
                    
                    window.history.pushState({}, '', 'dashboard.html');
                    localStorage.setItem('activeDashboardTab', 'dashboard');
                
                } else {
                   
                    const tabKey = li.querySelector('a')?.getAttribute('href')?.split('?tab=')[1];
                    if (tabKey) {
                        localStorage.setItem('activeDashboardTab', tabKey); 
                    }
                    
                    return; 
                }
            } else {
                localStorage.setItem('activeDashboardTab', 'reports-page'); 
            }
        });
    });

    const urlParams = new URLSearchParams(window.location.search);
    let initialTab = 'dashboard';
    const isReportsPage = window.location.pathname.includes('reports.html');
    
    if (isReportsPage) {
     
        initialTab = 'reports-page'; 
    } else {
        
        const urlTab = urlParams.get('tab');
        
        if (urlTab) {
            
            initialTab = urlTab;
        } else {
       initialTab = localStorage.getItem('activeDashboardTab') || 'dashboard';
        
            if (initialTab === 'reports-page') {
                initialTab = 'dashboard';
            }
        }
    }


    if (!isReportsPage) {
    
        let targetWidgetId = widgetMap[initialTab] || 'tickets-widget';
        let targetTitle = document.querySelector(`li[data-target="${targetWidgetId}"]`)?.getAttribute('data-title') || 'Recent Tickets';
        
       
        updateDashboard(targetWidgetId, targetTitle);
      
        if (urlParams.get('tab')) {
             window.history.replaceState({}, '', 'dashboard.html');
        }

    } else {
      
        menuItems.forEach(item => item.classList.remove('active'));
        const reportLink = document.querySelector('a[href="reports.html"]');
        if (reportLink) {
             reportLink.closest('li').classList.add('active');
        }
      
        localStorage.setItem('activeDashboardTab', 'reports-page'); 
    }

    if (!tableWrapper || !customScrollbar) return;

    const scrollThumb = document.createElement('div');
    scrollThumb.classList.add('scroll-thumb');
    customScrollbar.appendChild(scrollThumb);

    scrollThumb.style.width = '100%';
    scrollThumb.style.backgroundColor = '#8D7EB8';
    scrollThumb.style.borderRadius = '4px';
    scrollThumb.style.position = 'absolute';
    scrollThumb.style.cursor = 'grab';

    const updateScrollThumb = () => {
        const visibleHeight = tableWrapper.clientHeight;
        const contentHeight = tableWrapper.scrollHeight;
        
        if (contentHeight <= visibleHeight) {
            customScrollbar.style.display = 'none';
            return;
        } else {
            customScrollbar.style.display = 'block';
        }

        const scrollPercent = tableWrapper.scrollTop / (contentHeight - visibleHeight);
        const thumbHeight = Math.max(visibleHeight * (visibleHeight / contentHeight), 30);
        const thumbTop = (customScrollbar.clientHeight - thumbHeight) * scrollPercent;

        scrollThumb.style.height = `${thumbHeight}px`;
        scrollThumb.style.transform = `translateY(${thumbTop}px)`;
    };

    tableWrapper.addEventListener('scroll', updateScrollThumb);
    
});
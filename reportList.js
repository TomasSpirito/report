function loadResource(type, url, callback) {
  if (type === "css") {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    document.head.appendChild(link);
  } else if (type === "js") {
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.onload = callback;
    document.body.appendChild(script);
  }
}

// Cargar CSS
loadResource("css", "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css");
loadResource("css", "https://cdn.jsdelivr.net/npm/ag-grid-community/styles/ag-grid.css");
loadResource("css", "https://cdn.jsdelivr.net/npm/ag-grid-community/styles/ag-theme-alpine.css");
loadResource("css", "https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css");
loadResource("css", "https://fonts.googleapis.com/css?family=Inter");
loadResource("js", "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js");
loadResource("js", "https://cdn.jsdelivr.net/npm/ag-grid-community/dist/ag-grid-community.min.js");
loadResource("js", "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");
loadResource("js", "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js");


document.head.insertAdjacentHTML(
  "beforeend",
  `<style>
    body {
        font-family: Inter, sans-serif;
        margin: 50px 80px;
      }
      
      /* Aseguramos que la subtabla AG Grid se muestre correctamente */
      .ag-theme-alpine {
        height: 400px; /* Altura de la subtabla */
        width: 100%;
      }
  </style>`
);

// Crear el contenedor de la tabla
const tableContainer = document.createElement("div");
tableContainer.id = "table-container";
tableContainer.className = "table-responsive main-table-container";

document.body.appendChild(tableContainer);

//------------------------------------------------------------------H1------------------------------------------------------------------------
function createAndStyleH1() {
  // Crear el elemento h1
  const h1 = document.createElement('h1');
  
  // Establecer el texto del h1
  h1.textContent = 'NGAUS 2024 - REPORTS';
  
  // Aplicar estilos directamente al h1
  h1.style.fontFamily = "'Inter', sans-serif"; // Fuente
  h1.style.fontWeight = '700'; // Peso
  h1.style.fontSize = '24px'; // Tamaño
  h1.style.lineHeight = '29.05px'; // Altura de línea
  h1.style.letterSpacing = '0.1em'; // Espaciado entre letras
  
  // Insertar el h1 al inicio del body
  document.body.insertBefore(h1, document.body.firstChild);
}
//------------------------------------------------------------------NAV---------------------------------------------------------------------------------//
function createNav() {
  const nav = document.createElement('div');
  nav.style.display = 'flex'; // Asegura que los elementos estén alineados en fila
  nav.style.alignItems = 'center'; // Centra verticalmente los elementos
  nav.style.justifyContent = 'space-between'; // Separa menú e íconos
  nav.style.padding = '0'; // Quita el espaciado lateral
  nav.style.marginBottom = '20px'; // Separación con la tabla
  nav.style.width = '100%'; // Ocupa todo el ancho disponible
  nav.style.flexWrap = 'wrap'; // Permite que los elementos se ajusten en pantallas pequeñas

  // Crear lista de navegación
  const navList = document.createElement('ul');
  navList.style.display = 'flex';
  navList.style.listStyle = 'none';
  navList.style.padding = '0';
  navList.style.margin = '0';
  navList.style.width = 'fit-content'; // Asegura que la línea abarque solo el contenido
  navList.style.borderBottom = '1px solid #6E6893'; // Línea continua bajo los elementos del menú
  navList.style.flexWrap = 'wrap'; // Permite que los ítems del menú se apilen en pantallas pequeñas

  // Estilos dinámicos para los ítems del nav
  const navItemStyle = `
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 19.36px;
    text-align: left;
    text-underline-position: from-font;
    color: #6E6893;
    text-decoration: none;
    padding: 10px 15px;
    display: inline-block;
    border-bottom: 1px solid transparent;
    cursor: pointer;
  `;

  // Pestañas del menú de navegación
  const menuItems = [
    'Delegate Reports List',
    'Delegate Summary Report',
    'Committee Reports List',
    'Delegate Reports Detailed',
    'Committee Reports Detailed',
  ];
  let activeTab = 0; // Variable global para rastrear la pestaña activa

  menuItems.forEach((text, index) => {
    const listItem = document.createElement('li');
    listItem.style.margin = '0';

    const link = document.createElement('a');
    link.textContent = text;
    link.style.cssText = navItemStyle;

    link.addEventListener('click', function () {
      // Resetea el estilo de todos los links
      const allLinks = navList.querySelectorAll('a');
      allLinks.forEach((item) => {
        item.style.color = '#6E6893';
        item.style.borderBottom = '1px solid transparent';
      });
    
      // Aplica el estilo seleccionado
      this.style.color = '#12385C';
      this.style.borderBottom = '2px solid #12385C';
      // Actualiza la pestaña activa
      activeTab = index;
      // Muestra la tabla correspondiente
      switch (index) {
        case 0:
          loadDelegates(); // Muestra la tabla de delegados
          break;
        case 1:
          showDelegateSummary(); // Mostrar la tabla Resumen de delegados
          break;
        case 2:
          loadCommittee(); // Mostrar la tabla Informes de comités
          break;
        case 3:
          showDelegateReportsDetailed(); // Mostrar tabla de detalles de informes de delegados
          break;
        case 4:
          showCommitteeReportsDetailed(); // Mostrar tabla de detalles de informes de comités
          break;
      }
      toggleButtonsVisibility(); // Actualiza la visibilidad de los botones después del cambio de pestaña
    });
    listItem.appendChild(link);
    navList.appendChild(listItem);

    // Si es el primer elemento, aplicamos el estilo seleccionado
    if (index === 0) {
      link.style.color = '#12385C'; // Estilo del texto
      link.style.borderBottom = '2px solid #12385C'; // Estilo del borde
    }
  });

  // ---------------------------------------------Botones (imprimir y exportar CSV)--------------------------------------------------------

  // Contenedor para los botones
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');
  buttonContainer.style.display = 'flex';
  buttonContainer.style.gap = '10px';
  buttonContainer.style.marginLeft = 'auto'; // Empuja el contenedor de botones hacia la derecha
  buttonContainer.style.flexWrap = 'wrap'; // Permite que los botones se acomoden en pantallas pequeñas

  const buttons = [
    { icon: 'bi bi-printer-fill', label: 'Print', isPrint: true },
    { icon: 'bi bi-filetype-csv', label: 'Export CSV', isPrint: false },
  ];

  buttons.forEach((button) => {
    const btn = document.createElement('button');
    btn.innerHTML = `<i class="${button.icon}" style="font-size: 16px; padding: 5px;"></i>`;
    
    // Estilo predeterminado
    btn.style.cssText = `
      border: 2px solid #6D5BD0;
      color: white;
      border-radius: 5px;
      cursor: pointer;
    `;
    
    // Si es el botón de Print, le quitamos el color de fondo
    if (button.isPrint) {
      btn.style.backgroundColor = 'transparent'; // Fondo transparente para Print
      btn.style.color = '#6D5BD0'; // Mantener el texto en el color morado
    } else {
      btn.style.backgroundColor = '#6D5BD0'; // Fondo morado para Export CSV
    }

    btn.addEventListener('click', function () {
      // Resetea el estilo de todos los botones
      const allButtons = buttonContainer.querySelectorAll('button');
      allButtons.forEach((b) => {
        b.style.color = 'white';
        b.style.backgroundColor = '#6D5BD0';
        b.style.borderBottom = 'none';
      });

      // Aplica el estilo seleccionado
      this.style.color = '#12385C';
      this.style.backgroundColor = 'white';
      this.style.borderBottom = '2px solid #12385C';

      // Si es el botón de Export CSV, llama a la función downloadCSV
      if (button.isPrint) {
        downloadPDF();  // Llamada a la función de exportar CSV
      }else{
        // Llamada a la función de exportar PDF
        downloadCSV();  // Llamada a la función de exportar PDF
      }

    });

    buttonContainer.appendChild(btn);
  });
  
  // Añadir la lista de navegación y botones al contenedor principal
  nav.appendChild(navList);
  nav.appendChild(buttonContainer);

  // Insertar el nav después del título
  const title = document.querySelector('h1');
  title.insertAdjacentElement('afterend', nav);

//---------------------------------------------------------BUTTON CSV-----------------------------------------------------------

function downloadCSV() {
  let data;

  // Determina qué función llamar según la pestaña activa
  if (activeTab === 0) {
    data = getVisibleNestedTableData(); // Caso Delegados
  } else if (activeTab === 2) {
    data = getVisibleNestedTablecommitteesData(); // Caso Comités
  } else {
    alert('La exportación CSV no está disponible para esta pestaña.');
    return;
  }

  if (!data || data.length === 0) {
    alert('No hay datos para exportar.');
    return;
  }

  const csvRows = [];

  // Obtener las cabeceras
  const headers = getHeadersCsv(data);
  csvRows.push(headers.join(',')); // Añade las cabeceras al CSV

  // Procesar cada fila de datos
  data.forEach(row => {
    const values = headers.map(header => {
      // Si la propiedad es parte de 'caucuses'
      if (header.startsWith('caucuses.')) {
        const caucusKey = header.split('.')[1]; // Extraemos la clave del caucus
        return row.caucuses && row.caucuses[caucusKey] !== undefined
          ? `"${row.caucuses[caucusKey]}"`
          : '""'; // Valor vacío si no existe
      } else {
        return row[header] !== undefined ? `"${row[header]}"` : '""'; // Valor vacío si no existe
      }
    });
    csvRows.push(values.join(',')); // Añadir fila al CSV
  });

  const csvContent = "data:text/csv;charset=utf-8," + csvRows.join('\n');

  // Crear un enlace para descargar el CSV
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "data.csv");

  // Añadir el enlace al DOM y simular un clic para descargar
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Función para obtener las cabeceras
function getHeadersCsv(data) {
  const headers = new Set();

  data.forEach(row => {
    Object.keys(row).forEach(key => {
      if (key !== 'caucuses') {
        headers.add(key);
      } else if (row.caucuses) {
        // Solo agrega las claves de 'caucuses' si existe
        Object.keys(row.caucuses).forEach(caucusKey => {
          headers.add(`caucuses.${caucusKey}`);
        });
      }
    });
  });

  return Array.from(headers);
}

function downloadPDF() {
  let data;

  // Determina qué función llamar según la pestaña activa
  if (activeTab === 0) {
    data = getVisibleNestedTableData(); // Caso Delegados
  } else if (activeTab === 2) {
    data = getVisibleNestedTablecommitteesData(); // Caso Comités
  } else {
    alert('La exportación CSV no está disponible para esta pestaña.');
    return;
  }

  if (!data || data.length === 0) {
    alert('No hay datos para exportar.');
    return;
  }

  // Crear una instancia de jsPDF en orientación horizontal
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'landscape' });

  // Obtener las cabeceras
  const headers = getHeaders(data).map(header => {
    // Si es una clave de 'caucuses', eliminamos el prefijo 'caucuses.'
    return header.startsWith('caucuses.') ? header.replace('caucuses.', '') : header;
  });

  // Crear las filas de datos
  const rows = data.map(row => {
    return headers.map(header => {
      if (header in row) {
        return row[header] || ''; // Valores directos
      } else if (row.caucuses && header in row.caucuses) {
        return row.caucuses[header] || ''; // Valores del objeto 'caucuses'
      } else {
        return ''; // Valores faltantes
      }
    });
  });

  // Configurar anchos específicos para las columnas
  const columnStyles = {};
  headers.forEach((header, index) => {
    if (header in (data[0]?.caucuses || {})) {
      columnStyles[index] = { cellWidth: 10 }; // Ancho reducido para columnas de caucuses
    }
  });

  // Agregar la tabla al PDF con los estilos personalizados
  doc.autoTable({
    head: [headers], // Cabeceras de la tabla
    body: rows,      // Filas de la tabla
    startY: 10,      // Margen superior
    styles: { fontSize: 7 }, // Ajustar el tamaño de la fuente
    columnStyles,     // Aplicar los estilos de las columnas
  });

  // Descargar el PDF
  doc.save('data.pdf');
}

// Función para obtener las cabeceras
function getHeaders(data) {
  const headers = new Set();

  data.forEach(row => {
    Object.keys(row).forEach(key => {
      if (key !== 'caucuses') {
        headers.add(key);
      } else {
        Object.keys(row.caucuses).forEach(caucusKey => {
          headers.add(caucusKey); // Sin el prefijo 'caucuses.'
        });
      }
    });
  });

  return Array.from(headers);
}

//---------------------------------------------------------RESPONSIVE MOBILE-------------------------------------------------------------
  // Estilos responsivos
  const style = document.createElement('style');
  style.innerHTML = `
    @media (max-width: 768px) {
      ul {
        flex-direction: column;
        align-items: flex-start;
      }
      nav {
        flex-direction: column;
        align-items: stretch;
      }
      button {
        margin-left: auto;
      }
    }
    @media (max-width: 480px) {
      a {
        font-size: 14px;
        padding: 8px;
      }
    }
  `;
  document.head.appendChild(style);
}
//---------------------------------------------------------MOSTRAR TABLAS -----------------------------------------------------------
function loadDelegates() {
  const tableContainer = document.getElementById('table-container');
  tableContainer.innerHTML = ''; // Limpiar contenido previo
  // Aquí iría la lógica para cargar la tabla de delegados
  createMainTable(delegates);
}

//funcion para mostrar la tabla summary report
function showDelegateSummary() {
  const tableContainer = document.getElementById('table-container');
  tableContainer.innerHTML = ''; // Limpiar contenido previo
  // Lógica para cargar el resumen de delegados
  createDelegateSummaryTable(delegates);
}

function showCommitteeReports() {
  const tableContainer = document.getElementById('table-container');
  tableContainer.innerHTML = ''; // Limpiar contenido previo
  // Lógica para cargar la tabla de informes de comités
  createCommitteeReportsTable();
}

function showDelegateReportsDetailed() {
  const tableContainer = document.getElementById('table-container');
  tableContainer.innerHTML = ''; // Limpiar contenido previo
  // Lógica para cargar la tabla detallada de informes de delegados
  createDelegateReportsDetailedTable();
}

function showCommitteeReportsDetailed() {
  const tableContainer = document.getElementById('table-container');
  tableContainer.innerHTML = ''; // Limpiar contenido previo
  // Lógica para cargar la tabla detallada de informes de comités
  createCommitteeReportsDetailedTable();
}

function toggleButtonsVisibility() {
  const buttonContainer = document.querySelector('.button-container');
  if (!buttonContainer) return; // Si no existe el contenedor de botones, no hacemos nada

  // Obtener la pestaña activa verificando los estilos aplicados
  const navLinks = document.querySelectorAll('ul a');
  const activeTabIndex = Array.from(navLinks).findIndex((link) => 
    link.style.borderBottom === '2px solid rgb(18, 56, 92)'
  );

  // Mostrar los botones solo en las páginas 1 y 3 (índices 0 y 2)
  if (activeTabIndex === 0 || activeTabIndex === 2) {
    buttonContainer.style.display = 'flex'; // Muestra los botones
  } else {
    buttonContainer.style.display = 'none'; // Oculta los botones
  }
}

document.addEventListener('DOMContentLoaded', () => {
  toggleButtonsVisibility(); // Oculta o muestra los botones dependiendo de la vista inicial
});

//------------------------------------------------------------------TABLES---------------------------------------------------------------------------------
let delegates = []; // Variable global para almacenar los datos de los delegados

// Variable global para almacenar las opciones de las cuadrículas
const gridOptionsArray = [];

// Función para cargar los delegados y crear la tabla principal
async function loadDelegates() {
  try {
    const response = await fetch('delegates.json');
    if (!response.ok) {
      throw new Error('Error al cargar el JSON');
    }
    const data = await response.json();
    delegates = data.delegates; // Asigna los delegados a la variable global

    // Renderiza la tabla principal con los datos obtenidos
    createMainTable(delegates);
  } catch (error) {
    console.error('Error al cargar los datos:', error);
  }
}

// Función para obtener los datos de las subtablas visibles
function getVisibleNestedTableData() {
  const allData = [];

  gridOptionsArray.forEach((gridOptions, index) => {
    const nestedTable = document.getElementById(`nested-table-${index}`);
    if (nestedTable && nestedTable.style.display !== 'none') {
      const rowData = [];
      gridOptions.api.forEachNode((node) => {
        rowData.push(node.data);
      });
      allData.push(...rowData);
    }
  });

  return allData;
}

// Clase personalizada para las cabeceras
class CustomHeader {
  init(params) {
    this.params = params;

    // Crear el contenedor del encabezado
    const eGui = document.createElement('div');
    eGui.classList.add('custom-header');

    // Estilo del encabezado con truncado
    eGui.innerHTML = `
      <div style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        white-space: nowrap; /* Evita el salto de línea */
        overflow: hidden; /* Oculta el contenido que desborda */
        text-overflow: ellipsis; /* Agrega puntos suspensivos al contenido desbordado */
      ">
        <span style="flex-grow: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${params.displayName}</span>
        <span class="sort-icon" style="flex-shrink: 0;"></span>
      </div>
    `;

    // Manejador de clic para activar el ordenamiento
    eGui.addEventListener('click', () => {
      const nextSortOrder = this.getNextSortOrder(params.column.getSort());
      params.setSort(nextSortOrder, params.shiftKey);
    });

    this.eGui = eGui;
    this.updateSortIcon(); // Actualiza el ícono de orden inicial
  }

  getGui() {
    return this.eGui;
  }

  // Obtiene el próximo estado de ordenamiento (ascendente, descendente, ninguno)
  getNextSortOrder(currentSort) {
    if (currentSort === 'asc') return 'desc';
    if (currentSort === 'desc') return null;
    return 'asc';
  }

  // Actualiza el ícono de orden en el encabezado
  updateSortIcon() {
    const sortOrder = this.params.column.getSort();
    const sortIcon = this.eGui.querySelector('.sort-icon');

    if (!sortIcon) return;

    sortIcon.innerHTML = ''; // Limpia el ícono actual
    if (sortOrder === 'asc') {
      sortIcon.innerHTML = '&#9650;'; // Triángulo hacia arriba
    } else if (sortOrder === 'desc') {
      sortIcon.innerHTML = '&#9660;'; // Triángulo hacia abajo
    }
  }

  // Evento para actualizar el encabezado cuando cambia el orden
  onSortChanged() {
    this.updateSortIcon();
  }
}

// Función para los estilos de los botones (Activo/Retirado)
function getButtonStyles(status) {
  const baseStyle = {
    width: '53px',
    height: '19px',
    padding: '2px 8px',
    gap: '8px',
    borderRadius: '100px',
    fontFamily: 'Inter, sans-serif', 
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '15px', 
    textAlign: 'center', 
    cursor: 'default',
    border: '1px solid transparent',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',  // Asegura el centrado vertical dentro del botón
  };

  if (status === 'Active') {
    return { ...baseStyle, backgroundColor: '#CDFFCD', color: '#007F00', textContent: 'Active' };
  } else if (status === 'Retired') {
    return { ...baseStyle, backgroundColor: '#FFECCC', color: '#CE8500', textContent: 'Retired' };
  }
  return baseStyle;
}

// Función para icono del botón de check
function iconRenderer(params) {
  return params.value
    ? '<i class="bi bi-check-circle-fill" style="color: green; font-size: 16px;"></i>'
    : ''; // Ícono si es true o vacío si es false
}

//----------------------------------------------------------------DELEGATE REPORT LIST----------------------------------------------------------------------

//Función para crear la tabla Delegate Report List
function createMainTable() {
  const tableContainer = document.getElementById('table-container');
  tableContainer.innerHTML = ''; // Limpia cualquier contenido previo

  const table = document.createElement('table');
  table.classList.add('table', 'table-bordered', 'table-striped', 'table-responsive');

  table.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; 
  
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  delegates.forEach((delegate, index) => {
    const row = document.createElement('tr');
    //Estilo de las celdas de la tabla principal
    const cellStyle = `
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      font-weight: 400;
      line-height: 1.2; /* Ajusta el espacio vertical dentro de la celda */
      text-align: left;
      color: #6E6893;
      box-shadow: none;
      padding: 2px 2px; /* Reduce el relleno dentro de la celda */
      height: 2px; /* Define una altura fija para las filas */
      border:none;
      border-bottom: 1px solid #C6C2DE; /* Solo borde inferior */
    `;
  
    // Botón expand/collapse y nombre del delegado
    row.innerHTML = `
      <td style="${cellStyle}">
        <button 
          class="btn btn-link expand-btn" 
          onclick="toggleNestedTable(${index})" 
          style="color: inherit; text-decoration: none; transition: transform 0.3s ease; padding: 1px; margin: 1px 8px;">
          <i class="bi bi-arrow-right-circle" id="expand-icon-${index}" style="transition: transform 0.3s ease;"></i>
        </button>   
        ${delegate.delegateName}
      </td>
    `;

    // Fila secundaria para la tabla interna (subtabla)
    const nestedRow = document.createElement('tr');
    nestedRow.style.display = 'none'; // Oculta la fila por defecto
    nestedRow.innerHTML = `
      <td colspan="2" style="padding: 0; margin: 0;"> <!-- Elimina los márgenes y el relleno -->
        <div class="nested-table" 
          id="nested-table-${index}" 
          style="
            display: none; 
            overflow: hidden; 
            max-height: 0; 
            transition: max-height 0.3s ease-out;
            width: 100%; /* Asegura que ocupe el ancho completo */
          ">
          <div class="ag-theme-alpine" id="ag-grid-${index}" style="width: 100%; height: 200px;"></div>
        </div>
      </td>
    `;

    tbody.appendChild(row);
    tbody.appendChild(nestedRow);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  tableContainer.appendChild(table);
}
// Función para alternar la visibilidad de la subtabla y cambiar la flecha con transición
function toggleNestedTable(index) {
  const nestedTable = document.getElementById(`nested-table-${index}`);
  const nestedRow = nestedTable.closest('tr'); // Obtiene la fila secundaria
  const allNestedTables = document.querySelectorAll('.nested-table');
  const expandButton = document.querySelector(`#expand-icon-${index}`);

  // Ocultar todas las subtablas excepto la actual
  allNestedTables.forEach((table, idx) => {
    const otherRow = table.closest('tr');
    if (idx !== index) {
      table.style.maxHeight = '0'; // Colapsa las subtablas
      table.style.display = 'none'; 
      if (otherRow) otherRow.style.display = 'none'; // Oculta la fila secundaria
      const otherButton = document.querySelector(`#expand-icon-${idx}`);
      if (otherButton) {
        otherButton.classList.remove('bi-arrow-down-circle');
        otherButton.classList.add('bi-arrow-right-circle'); // Restaurar flecha hacia la derecha
      }
    }
  });

  // Si la subtabla no está visible, la mostramos y creamos la subtabla
  if (nestedTable.style.display === 'none') {
    nestedRow.style.display = ''; // Muestra la fila secundaria
    nestedTable.style.display = 'block';
    nestedTable.style.maxHeight = '1000px'; // Expande la subtabla con animación
    expandButton.classList.remove('bi-arrow-right-circle');
    expandButton.classList.add('bi-arrow-down-circle'); // Cambia la flecha hacia abajo
    createNestedTable(delegates[index].details, index);
  } else {
    nestedTable.style.maxHeight = '0'; // Colapsa la subtabla con animación
    setTimeout(() => {
      nestedTable.style.display = 'none'; // Oculta completamente tras la animación
      nestedRow.style.display = 'none'; // Oculta la fila secundaria
    }, 300); 
    expandButton.classList.remove('bi-arrow-down-circle');
    expandButton.classList.add('bi-arrow-right-circle'); // Cambia la flecha hacia la derecha
  }
}

// Función para crear subtabla
function createNestedTable(details, index) {
  const backgroundColors = ['#4F378A14', '#4F378A29', '#4F378A1F'];
  const style = document.createElement('style');
  style.innerHTML = `
  .header-background {
    background-color: ${backgroundColors[0]};
    padding: 20px 10px 20px 15px; /* Ajusta los márgenes */
    text-align: left;
    line-height: 1;
    font-family: Inter, sans-serif;
    font-weight: normal;
    color: #12385C;
    display: flex;
    align-items: center; /* Alinea el contenido verticalmente */
    justify-content: flex-start; /* Alinea el texto a la izquierda */
    white-space: nowrap; /* Evita el salto de línea */
    overflow: hidden; /* Oculta el contenido desbordado */
    text-overflow: ellipsis; /* Agrega puntos suspensivos si el contenido no cabe */
  }
  .header-background-2 {
    background-color: ${backgroundColors[1]};
    padding: 20px 10px 20px 15px;
    text-align: left;
    line-height: 1;
    font-family: Inter, sans-serif;
    font-weight: normal;
    color: #12385C;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .header-background-3 {
    background-color: ${backgroundColors[2]};
    padding: 20px 10px 20px 15px;
    text-align: left;
    line-height: 1;
    font-family: Inter, sans-serif;
    font-weight: normal;
    color: #12385C;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  /* Estilo para los bordes de las filas y celdas */
    .ag-theme-alpine .ag-row {
      border-bottom: 1px solid #C6C2DE; /* Bordes entre las filas */
    }
    .ag-theme-alpine .ag-root-wrapper {
      border: none; /* Borde externo de la tabla */
    }
    .ag-theme-alpine .ag-header-row {
      border-bottom: none; /* Borde inferior del encabezado */
    }
    .ag-theme-alpine .ag-header {
      border-bottom: 1px solid #C6C2DE !important; /* Elimina el borde predeterminado del header */
    }
    .ag-theme-alpine .ag-header-cell {
      border: none !important; /* Elimina los bordes de las celdas del encabezado */
    }
    .ag-theme-alpine .ag-header-row {
      border-bottom: none !important; /* Elimina el borde de la fila de encabezado */
    }
`;
  document.head.appendChild(style);

  const MIN_ROWS = 8;
  const ROW_HEIGHT = 43;
  const HEADER_HEIGHT = 40;

  const adjustedDetails = Array.isArray(details) ? [...details] : [];
  while (adjustedDetails.length < MIN_ROWS) {
    adjustedDetails.push({});
  }

  const gridOptions = {
    columnDefs: [
      {
        headerName: 'Full Name',
        field: 'fullName',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { backgroundColor: backgroundColors[0] },
        headerComponent: CustomHeader,
        width: 200,
        minWidth: 175,
        maxWidth: 225,
        headerClass: 'header-background', 
      },
      {
        headerName: 'NGAUS Member <br> ID Number',
        field: 'ngausMemberId',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { backgroundColor: backgroundColors[1] },
        headerComponent: CustomHeader,
        width: 150,
        minWidth: 125,
        maxWidth: 175,
        headerClass: 'header-background-2', 
      },
      {
        headerName: 'Pay <br> Grade',
        field: 'payGrade',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { textAlign: 'center', backgroundColor: backgroundColors[2] },
        headerComponent: CustomHeader,
        width: 70,
        minWidth: 55,
        maxWidth: 95,
        headerClass: 'header-background-3', 
      },
      {
        headerName: 'Captain',
        field: 'rank',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { backgroundColor: backgroundColors[0] },
        headerComponent: CustomHeader,
        width: 100,
        minWidth: 85,
        maxWidth: 200,
        headerClass: 'header-background', 
      },
      {
        headerName: 'Branch',
        field: 'branch',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { backgroundColor: backgroundColors[1] },
        headerComponent: CustomHeader,
        width: 100,
        minWidth: 85,
        maxWidth: 125,
        headerClass: 'header-background-2', 
      },
      {
        headerName: 'Duty <br> Status',
        field: 'dutyStatus',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { 
          backgroundColor: backgroundColors[2],
          display: 'flex',            // Aplicar flexbox a la celda
          justifyContent: 'center',   // Centrado horizontal
          alignItems: 'center',       // Centrado vertical
        },
        headerComponent: CustomHeader,
        cellRenderer: function (params) {
          if (!params.value) {
            // Si no hay valor, no renderiza nada
            return '';
          }
          const button = document.createElement('button');
          const styles = getButtonStyles(params.value);
          Object.assign(button.style, styles);  // Aplicar estilos al botón
          button.textContent = styles.textContent; // Establecer el texto del botón
          return button;
        },
        width: 90,
        minWidth: 90,
        maxWidth: 100,
        headerClass: 'header-background-3',
      },
      {
        headerName: 'Warrant <br> Officer <br> Caucus Army',
        field: 'caucuses.warrantOfficerCaucusArmy',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { textAlign: 'center', backgroundColor: backgroundColors[0] },
        headerComponent: CustomHeader,
        width: 100,
        minWidth: 80,
        maxWidth: 125,
        headerClass: 'header-background', 
        cellRenderer: iconRenderer,
      },
      {
        headerName: 'Area III <br> Army <br> Caucus',
        field: 'caucuses.areaIIIArmyCaucus',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { textAlign: 'center', backgroundColor: backgroundColors[1] },
        headerComponent: CustomHeader,
        width: 100,
        minWidth: 80,
        maxWidth: 125,
        headerClass: 'header-background-2', 
        cellRenderer: iconRenderer,
      },
      {
        headerName: 'Retired <br> Air Force',
        field: 'caucuses.retiredAirForce',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { textAlign: 'center', backgroundColor: backgroundColors[2] }, // Centra el texto en las celdas
        headerComponent: CustomHeader,
        width: 100, // Ancho inicial de la columna
        minWidth: 80, // Ancho mínimo de la columna
        maxWidth: 125, // Ancho maximo de la columna
        cellRenderer: iconRenderer,
        headerClass: 'header-background-3', 
      },
      {
        headerName: 'Committee <br> On Joint <br> Resolutions',
        field: 'caucuses.committeeOnJointResolutions',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { textAlign: 'center', backgroundColor: backgroundColors[0] }, // Centra el texto en las celdas
        headerComponent: CustomHeader,
        width: 100, // Ancho inicial de la columna         
        minWidth: 80, // Ancho mínimo de la columna
        maxWidth: 125, // Ancho maximo de la columna
        cellRenderer: iconRenderer,
        headerClass: 'header-background', 
      },
      {
        headerName: 'Retired <br> Army',
        field: 'caucuses.retiredArmy',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { textAlign: 'center', backgroundColor: backgroundColors[1] }, // Centra el texto en las celdas
        headerComponent: CustomHeader,
        width: 100, // Ancho inicial de la columna
        minWidth: 80, // Ancho mínimo de la columna
        maxWidth: 125, // Ancho maximo de la columna
        cellRenderer: iconRenderer,
        headerClass: 'header-background-2', 
      },
      {
        headerName: 'Area III <br> Air Force <br> Caucus',
        field: 'caucuses.areaIIIAirForceCaucus',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { textAlign: 'center', backgroundColor: backgroundColors[2] }, // Centra el texto en las celdas
        headerComponent: CustomHeader,
        width: 100, // Ancho inicial de la columna
        minWidth: 80, // Ancho mínimo de la columna
        maxWidth: 125, // Ancho maximo de la columna
        cellRenderer: iconRenderer,
        headerClass: 'header-background-3', 
      },
      {
        headerName: 'Committee <br> On Air <br> Force Resolutions',
        field: 'caucuses.committeeOnAirForceResolutions',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { textAlign: 'center', backgroundColor: backgroundColors[0] }, // Centra el texto en las celdas
        headerComponent: CustomHeader,
        width: 100, // Ancho inicial de la columna
        minWidth: 90, // Ancho mínimo de la columna
        maxWidth: 125, // Ancho maximo de la columna
        cellRenderer: iconRenderer,
        headerClass: 'header-background', 
      },
      {
        headerName: 'Company <br> Grade Air <br> Force',
        field: 'caucuses.companyGradeAirForce',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { textAlign: 'center', backgroundColor: backgroundColors[1] }, // Centra el texto en las celdas
        headerComponent: CustomHeader,
        width: 100, // Ancho inicial de la columna
        minWidth: 80, // Ancho mínimo de la columna
        maxWidth: 125, // Ancho maximo de la columna
        cellRenderer: iconRenderer,
        headerClass: 'header-background-2', 
      },
      {
        headerName: 'Company <br> Grade <br> Army',
        field: 'caucuses.companyGradeArmy',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { textAlign: 'center', backgroundColor: backgroundColors[2] }, // Centra el texto en las celdas
        headerComponent: CustomHeader,
        width: 100, // Ancho inicial de la columna
        minWidth: 80, // Ancho mínimo de la columna
        maxWidth: 125, // Ancho maximo de la columna
        cellRenderer: iconRenderer,
        headerClass: 'header-background-3', 
      },
      {
        headerName: 'Committee <br> On <br> Nominations',
        field: 'caucuses.committeeOnNominations',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { textAlign: 'center' , backgroundColor: backgroundColors[0]}, // Centra el texto en las celdas
        headerComponent: CustomHeader,
        width: 100, // Ancho inicial de la columna
        minWidth: 80, // Ancho mínimo de la columna
        maxWidth: 125, // Ancho maximo de la columna
        cellRenderer: iconRenderer,
        headerClass: 'header-background', 
      },
      { 
        headerName: 'Committee <br> On Army <br> Resolutions',
        field: 'caucuses.committeeOnArmyResolutions',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { textAlign: 'center' , backgroundColor: backgroundColors[1]}, // Centra el texto en las celdas
        headerComponent: CustomHeader,
        width: 100, // Ancho inicial de la columna
        minWidth: 80, // Ancho mínimo de la columna
        maxWidth: 125, // Ancho maximo de la columna
        cellRenderer: iconRenderer,
        headerClass: 'header-background-2', 
      } 
    ],
    rowData: adjustedDetails,
    pagination: false,
    domLayout: 'normal',
    defaultColDef: {
      resizable: true,
      tooltipField: 'headerName', // Agrega un tooltip para mostrar el texto completo al pasar el ratón
    },
    getRowStyle: () => ({
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '16.94px',
      letterSpacing: '0.05em',
      textAlign: 'left',
      color: '#6E6893',
      border: 'none',
    }),
    onGridReady: (params) => {
      const gridDiv = document.querySelector(`#ag-grid-${index}`);
      const rowCount = params.api.getDisplayedRowCount();
      const totalHeight = Math.max(rowCount, MIN_ROWS) * ROW_HEIGHT + HEADER_HEIGHT;

      console.log(`Altura calculada: ${totalHeight}px`);
      gridDiv.style.height = `${totalHeight}px`;

      setTimeout(() => params.api.sizeColumnsToFit(), 0);
    },
  };

  const gridDiv = document.querySelector(`#ag-grid-${index}`);
  if (!gridDiv) {
    console.error(`No se encontró el contenedor para la tabla con ID: ag-grid-${index}`);
    return;
  }

  gridDiv.style.height = `${MIN_ROWS * ROW_HEIGHT + HEADER_HEIGHT}px`;
  gridDiv.style.width = '100%';
  gridDiv.style.border = 'none';
  gridDiv.classList.add('ag-theme-alpine');

  if (!gridDiv.innerHTML.trim()) {
    new agGrid.Grid(gridDiv, gridOptions);
  } else {
    gridDiv.innerHTML = '';
    new agGrid.Grid(gridDiv, gridOptions);
  }

  const resizeObserver = new ResizeObserver(() => {
    if (gridOptions.api) gridOptions.api.sizeColumnsToFit();
  });
  resizeObserver.observe(gridDiv);
  gridOptionsArray[index] = gridOptions; // Almacena las opciones de la cuadrícula
}

//----------------------------------------------------------------DELEGATE SUMMARY REPORT---------------------------------------------------------------------

  //Funcion para crear tabla summary report
function createDelegateSummaryTable() {
  const tableContainer = document.getElementById('table-container');
  tableContainer.innerHTML = ''; // Limpia cualquier contenido previo

  const table = document.createElement('table');
  table.classList.add('table', 'table-bordered', 'table-striped', 'table-responsive');

  // Estilo de la tabla
  table.style.backgroundColor = 'white';
  table.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
  table.style.borderRadius = '8px';
  table.style.border = 'none';
  table.style.borderBottom = '1px solid #C6C2DE';
  table.style.borderCollapse = 'collapse';
  table.style.tableLayout = 'fixed'; // Evita cambios en el tamaño de las columnas
  table.style.width = '100%'; // Asegura que la tabla ocupe el ancho completo

  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  const style = document.createElement('style');
  style.innerHTML = `
    tbody, td, tfoot, th, thead, tr {
      border-color: inherit;
      border-style: solid;
      border-width: 0;
      border-top: none;
    }
  `;
  document.head.appendChild(style); // Agrega el estilo al <head> del documento

  thead.style.borderTop = 'none'; // Elimina el borde superior de la fila del encabezado
  // Encabezado con botón a la izquierda del texto "State Affiliate"
  thead.innerHTML = `
  <tr>
    <th style="background-color: #F2F0F9; border-top: none; border: none; font-family: 'Inter', sans-serif; font-weight: 600; font-size: 12px; color: #12385C; text-align: left; vertical-align: middle; width: 30%; padding-left: 12px;">
      <button 
        class="btn btn-link expand-btn" 
        onclick="toggleMainTable()" 
        style="color: inherit; text-decoration: none; transition: transform 0.3s ease; padding: 3px; margin-left: 6px; margin-right: 6px;">
        <i class="bi bi-arrow-down-circle" id="main-expand-icon" style="transition: transform 0.3s ease;"></i>
      </button>
      State Affiliate
    </th>
    <th onclick="sortMainTable('countOfDelegates', this)" class="sortable" style="background-color: #F2F0F9; border-top: none; border: none; font-family: 'Inter', sans-serif; font-weight: 600; font-size: 12px; color: #12385C; text-align: left; vertical-align: middle; width: 20%; padding-left: 12px;">
      Count Of Delegates
    </th>
    <th onclick="sortMainTable('capacity', this)" class="sortable" style="background-color: #F2F0F9; border-top: none; border: none; font-family: 'Inter', sans-serif; font-weight: 600; font-size: 12px; color: #12385C; text-align: left; vertical-align: middle; width: 20%; padding-left: 12px;">
      Capacity
    </th>
    <th onclick="sortMainTable('remaining', this)" class="sortable" style="background-color: #F2F0F9; border-top: none; border: none; font-family: 'Inter', sans-serif; font-weight: 600; font-size: 12px; color: #12385C; text-align: left; vertical-align: middle; width: 20%; padding-left: 12px;">
      Remaining
    </th>
  </tr>
`;

  // Resto del código para cargar los datos
  fetch('delegates.json')
    .then(response => response.json())
    .then(data => {
      const delegates = data.delegates;

      delegates.forEach((delegate, index) => {
        const row = document.createElement('tr');

        const cellStyle = `
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 16.94px;
          text-align: left;
          color: #6E6893;
          box-shadow: none;
          padding: 8px 12px; /* Ajusta el espacio para alineación */
          border-bottom: 1px solid #C6C2DE;
          border: none;
        `;

        row.innerHTML = `
          <td style="${cellStyle}">
            <button 
              class="btn btn-link expand-btn" 
              onclick="toggleNestedTable(${index}, delegates)" 
              style="color: inherit; text-decoration: none; transition: transform 0.3s ease; padding: 1px; margin: 1px 8px;">
              <i class="bi bi-arrow-right-circle" id="expand-icon-${index}" style="transition: transform 0.3s ease;"></i>
            </button>   
            ${delegate.delegateName}
          </td>
          <td style="${cellStyle}">${delegate.countOfDelegates}</td>
          <td style="${cellStyle}">${delegate.capacity}</td>
          <td style="${cellStyle}">${delegate.remaining}</td>
        `;

        const nestedRow = document.createElement('tr');
        nestedRow.style.display = 'none';
        nestedRow.innerHTML = `
          <td colspan="4" style="padding: 0; margin-left: 0; border: none;">
            <div class="nested-table" 
                id="nested-table-${index}" 
                style="display: none; overflow: hidden; max-height: 0; transition: max-height 0.3s ease-out; width: 100%;">
              <div class="ag-theme-alpine" id="ag-grid-${index}" style="width: 100%;"></div>
            </div>
          </td>
        `;

        tbody.appendChild(row);
        tbody.appendChild(nestedRow);
      });

      table.appendChild(thead);
      table.appendChild(tbody);
      tableContainer.appendChild(table);
    })
    .catch(error => {
      console.error('Error al cargar los datos desde delegates.json:', error);
    });
}

//funcion para ocultar/mostrar tabla summary report
function toggleMainTable() {
  const tbody = document.querySelector('#table-container table tbody');
  const mainExpandIcon = document.getElementById('main-expand-icon');

  if (tbody.style.display === 'none') {
    tbody.style.display = 'table-row-group'; // Muestra el cuerpo de la tabla
    mainExpandIcon.classList.remove('bi-arrow-right-circle');
    mainExpandIcon.classList.add('bi-arrow-down-circle');
  } else {
    tbody.style.display = 'none'; // Oculta el cuerpo de la tabla
    mainExpandIcon.classList.remove('bi-arrow-down-circle');
    mainExpandIcon.classList.add('bi-arrow-right-circle');
  }
}

//---------------------------------------------------------------COMMITTE REPORT LIST----------------------------------------------------------------

let committees = []; // Variable global para almacenar los datos de los delegados
const gridOptionsArraycommittee = []; // Opciones de cuadrículas para subtablas

// Función para cargar los comités y crear la tabla principal
async function loadCommittee() {
  try {
    const response = await fetch('committees.json');
    if (!response.ok) {
      throw new Error('Error al cargar el JSON');
    }
    const data = await response.json();
    committees = data.committees; // Asigna los comités a la variable global

    // Renderiza la tabla principal con los datos obtenidos
    createCommitteeReportsTable(committees);
  } catch (error) {
    console.error('Error al cargar los datos:', error);
  }
}

// Función para obtener los datos de las subtablas visibles
function getVisibleNestedTablecommitteesData() {
  const allData = [];

  gridOptionsArraycommittee.forEach((gridOptions, index) => {
    const nestedTable = document.getElementById(`nested-table-${index}`);
    if (nestedTable && nestedTable.style.display !== 'none') {
      const rowData = [];
      gridOptions.api.forEachNode((node) => {
        rowData.push(node.data);
      });
      allData.push(...rowData);
    }
  });

  return allData;
}

//Función para crear la tabla Delegate Report List
function createCommitteeReportsTable(committees) {
  const tableContainer = document.getElementById('table-container');
  tableContainer.innerHTML = ''; // Limpia cualquier contenido previo

  const table = document.createElement('table');
  table.classList.add('table', 'table-striped', 'table-responsive');

  // Estilos de la tabla principal
  table.style.backgroundColor = 'white';
  table.style.borderRadius = '8px';
  table.style.overflow = 'hidden'; // Asegura que las esquinas redondeadas no se vean interrumpidas
  table.style.border = '1px solid #C6C2DE'; // Borde violeta en toda la tabla
  table.style.borderCollapse = 'separate'; // Evita que los bordes de las celdas se fusionen
  table.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; // Agrega un box-shadow suave y redondeado

  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  committees.forEach((committee, index) => {
    const row = document.createElement('tr');
    
    // Creamos un objeto con los estilos
    const cellStyle = {
      fontFamily: 'Inter, sans-serif',
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '1.2',
      textAlign: 'left',
      color: '#6E6893',
      boxShadow: 'none',
      padding: '2px 2px',
      height: '2px',
      borderBottom: '1px solid #C6C2DE' // Borde por defecto
    };

    // Si es la última fila, eliminamos el borde inferior
    if (index === committees.length - 1) {
      cellStyle.borderBottom = 'none'; // Elimina el borde inferior de la última fila
    }

    // Convertimos el objeto de estilo a una cadena CSS
    const cellStyleString = Object.entries(cellStyle)
      .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`) // Convierte camelCase a kebab-case
      .join(' ');

    // Botón expand/collapse y nombre del comité
    row.innerHTML = `
      <td style="${cellStyleString}">
        <button 
          class="btn btn-link expand-btn" 
          onclick="toggleNestedTableCommites(${index})" 
          style="color: inherit; text-decoration: none; transition: transform 0.3s ease; padding: 1px; margin: 1px 8px;">
          <i class="bi bi-arrow-right-circle" id="expand-icon-${index}" style="transition: transform 0.3s ease;"></i>
        </button>   
        ${committee.CommitteeName}
      </td>
    `;

    // Fila secundaria para la subtabla
    const nestedRow = document.createElement('tr');
    nestedRow.style.display = 'none';
    nestedRow.innerHTML = `
      <td colspan="2" style="padding: 0; margin: 0;">
        <div class="nested-table" 
          id="nested-table-${index}" 
          style="
            display: none; 
            overflow: hidden; 
            max-height: 0; 
            transition: max-height 0.3s ease-out;
            width: 100%;
          ">
          <div class="ag-theme-alpine" id="ag-grid-${index}" style="width: 100%; height: 200px;"></div>
        </div>
      </td>
    `;

    tbody.appendChild(row);
    tbody.appendChild(nestedRow);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  tableContainer.appendChild(table);
}

// Función para alternar la visibilidad de la subtabla y cambiar la flecha con transición
function toggleNestedTableCommites(index) {
    const nestedTable = document.getElementById(`nested-table-${index}`);
    const nestedRow = nestedTable.closest('tr'); // Obtiene la fila secundaria
    const allNestedTables = document.querySelectorAll('.nested-table');
    const expandButton = document.querySelector(`#expand-icon-${index}`);

    // Ocultar todas las subtablas excepto la actual
    allNestedTables.forEach((table, idx) => {
      const otherRow = table.closest('tr');
      if (idx !== index) {
        table.style.maxHeight = '0'; // Colapsa las subtablas
        table.style.display = 'none'; 
        if (otherRow) otherRow.style.display = 'none'; // Oculta la fila secundaria
        const otherButton = document.querySelector(`#expand-icon-${idx}`);
        if (otherButton) {
          otherButton.classList.remove('bi-arrow-down-circle');
          otherButton.classList.add('bi-arrow-right-circle'); // Restaurar flecha hacia la derecha
        }
      }
    });

    // Si la subtabla no está visible, la mostramos y creamos la subtabla
    if (nestedTable.style.display === 'none') {
      nestedRow.style.display = ''; // Muestra la fila secundaria
      nestedTable.style.display = 'block';
      nestedTable.style.maxHeight = '1000px'; // Expande la subtabla con animación
      expandButton.classList.remove('bi-arrow-right-circle');
      expandButton.classList.add('bi-arrow-down-circle'); // Cambia la flecha hacia abajo
      createNestedTablecommittee(committees[index].details, index);
    } else {
      nestedTable.style.maxHeight = '0'; // Colapsa la subtabla con animación
      setTimeout(() => {
        nestedTable.style.display = 'none'; // Oculta completamente tras la animación
        nestedRow.style.display = 'none'; // Oculta la fila secundaria
      }, 300); 
      expandButton.classList.remove('bi-arrow-down-circle');
      expandButton.classList.add('bi-arrow-right-circle'); // Cambia la flecha hacia la derecha
    }
}
  // Función para crear subtabla
function createNestedTablecommittee(details, index) {
    const backgroundColors = ['#F2F0F9', '#F8F8F8', '#4F378A1F'];
    const style = document.createElement('style');
    style.innerHTML = `
    .header-background {
      background-color: ${backgroundColors[0]};
      padding: 20px 10px 20px 15px; /* Ajusta los márgenes */
      text-align: left;
      line-height: 1;
      font-family: Inter, sans-serif;
      font-weight: normal;
      color: #12385C;
      display: flex;
      align-items: center; /* Alinea el contenido verticalmente */
      justify-content: flex-start; /* Alinea el texto a la izquierda */
      white-space: nowrap; /* Evita el salto de línea */
      overflow: hidden; /* Oculta el contenido desbordado */
      text-overflow: ellipsis; /* Agrega puntos suspensivos si el contenido no cabe */
      
    }
    /* Estilo para los bordes de las filas y celdas */
    .ag-theme-alpine .ag-row {
      border-bottom: 1px solid #C6C2DE; /* Bordes entre las filas */
    }
    .ag-theme-alpine .ag-root-wrapper {
      border: none; /* Borde externo de la tabla */
    }
    .ag-theme-alpine .ag-header-row {
      border-bottom: none; /* Borde inferior del encabezado */
    }
    .ag-theme-alpine .ag-header {
      border-bottom: 1px solid #C6C2DE !important; /* Elimina el borde predeterminado del header */
    }
    .ag-theme-alpine .ag-header-cell {
      border: none !important; /* Elimina los bordes de las celdas del encabezado */
    }
    .ag-theme-alpine .ag-header-row {
      border-bottom: none !important; /* Elimina el borde de la fila de encabezado */
    }
  `;

  document.head.appendChild(style);

  const MIN_ROWS = 8;
  const ROW_HEIGHT = 43;
  const HEADER_HEIGHT = 40;

  const adjustedDetails = Array.isArray(details) ? [...details] : [];
  while (adjustedDetails.length < MIN_ROWS) {
    adjustedDetails.push({});
  }

  const gridOptions = {
    columnDefs: [
      {
        headerName: 'State Affiliation',
        field: 'stateAffiliation',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { backgroundColor: backgroundColors[1] },
        headerComponent: CustomHeader,
        width: 150,
        minWidth: 125,
        maxWidth: 195,
        headerClass: 'header-background', 
      },
      {
        headerName: 'Last Name',
        field: 'lastName',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { backgroundColor: backgroundColors[1] },
        headerComponent: CustomHeader,
        width: 150,
        minWidth: 125,
        maxWidth: 175,
        headerClass: 'header-background', 
      },
      {
        headerName: 'First Name',
        field: 'firstName',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { backgroundColor: backgroundColors[1] },
        headerComponent: CustomHeader,
        width: 150,
        minWidth: 125,
        maxWidth: 175,
        headerClass: 'header-background', 
      },
      {
        headerName: 'NGAUS Member ID Number',
        field: 'ngausMemberIdNumber',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { backgroundColor: backgroundColors[1] },
        headerComponent: CustomHeader,
        width: 200,
        minWidth: 190,
        maxWidth: 220,
        headerClass: 'header-background', 
      },
      {
        headerName: 'Rank',
        field: 'rank',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { backgroundColor: backgroundColors[1] },
        headerComponent: CustomHeader,
        width: 150,
        minWidth: 125,
        maxWidth: 155,
        headerClass: 'header-background', 
      },
      {
        headerName: 'Paygrade',
        field: 'paygrade',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { backgroundColor: backgroundColors[1] },
        headerComponent: CustomHeader,
        width: 100,
        minWidth: 85,
        maxWidth: 125,
        headerClass: 'header-background', 
      },
      {
        headerName: 'Branch',
        field: 'branch',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { backgroundColor: backgroundColors[1] },
        headerComponent: CustomHeader,
        width: 100,
        minWidth: 100,
        maxWidth: 125,
        headerClass: 'header-background', 
      },
      {
        headerName: 'Duty <br> State',
        field: 'dutyState',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { 
          backgroundColor: backgroundColors[1],
          display: 'flex',            // Aplicar flexbox a la celda
          justifyContent: 'center',   // Centrado horizontal
          alignItems: 'center',       // Centrado vertical
        },
        headerComponent: CustomHeader,
        cellRenderer: function (params) {
          if (!params.value) {
            // Si no hay valor, no renderiza nada
            return '';
          }
          const button = document.createElement('button');
          const styles = getButtonStyles(params.value);
          Object.assign(button.style, styles);  // Aplicar estilos al botón
          button.textContent = styles.textContent; // Establecer el texto del botón
          return button;
        },
        width: 90,
        minWidth: 90,
        maxWidth: 100,
        headerClass: 'header-background',
      },
       {
        headerName: 'Registration Type',
        field: 'registrationType',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { backgroundColor: backgroundColors[1] },
        headerComponent: CustomHeader,
        width: 300,
        minWidth: 300,
        maxWidth: 320,
        headerClass: 'header-background', 
      }
      
    ],
    rowData: adjustedDetails,
    pagination: false,
    domLayout: 'normal',
    defaultColDef: {
      resizable: true,
      tooltipField: 'headerName', // Agrega un tooltip para mostrar el texto completo al pasar el ratón
    },
    getRowStyle: () => ({
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '16.94px',
      letterSpacing: '0.05em',
      textAlign: 'left',
      color: '#6E6893',
    }),
    onGridReady: (params) => {
      const gridDiv = document.querySelector(`#ag-grid-${index}`);
      const rowCount = params.api.getDisplayedRowCount();
      const totalHeight = Math.max(rowCount, MIN_ROWS) * ROW_HEIGHT + HEADER_HEIGHT;

      console.log(`Altura calculada: ${totalHeight}px`);
      gridDiv.style.height = `${totalHeight}px`;

      setTimeout(() => params.api.sizeColumnsToFit(), 0);
    },
  };

  const gridDiv = document.querySelector(`#ag-grid-${index}`);
  if (!gridDiv) {
    console.error(`No se encontró el contenedor para la tabla con ID: ag-grid-${index}`);
    return;
  }

  gridDiv.style.height = `${MIN_ROWS * ROW_HEIGHT + HEADER_HEIGHT}px`;
  gridDiv.style.width = '100%';
  gridDiv.style.border = 'none';
  gridDiv.classList.add('ag-theme-alpine');

  if (!gridDiv.innerHTML.trim()) {
    new agGrid.Grid(gridDiv, gridOptions);
  } else {
    gridDiv.innerHTML = '';
    new agGrid.Grid(gridDiv, gridOptions);
  }

  const resizeObserver = new ResizeObserver(() => {
    if (gridOptions.api) gridOptions.api.sizeColumnsToFit();
  });
  resizeObserver.observe(gridDiv);
  gridOptionsArraycommittee[index] = gridOptions; // Almacena las opciones de la cuadrícula
}

//--------------------------------------------FIN DE LAS TABLAS----------------------------------------------------------

// Cargar los datos y el nav cuando se carga la página
window.onload = function() {
  // Cargar JS
  loadResource("js", "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js");
  loadResource("js", "https://cdn.jsdelivr.net/npm/ag-grid-community/dist/ag-grid-community.min.js");
  loadResource("js", "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");
  loadResource("js", "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js");
  createAndStyleH1();
  createNav(); // Llamada a la función para crear el nav
  loadDelegates();
};
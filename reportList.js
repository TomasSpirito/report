//--------------------------------------------NAV----------------------------------------------------------------//
function createNav() {
  const nav = document.createElement('div'); // Cambiado a `div` para incluir los íconos además del menú
  nav.style.display = 'flex'; // Asegura que los elementos estén alineados en fila
  nav.style.alignItems = 'center'; // Centra verticalmente los elementos
  nav.style.justifyContent = 'space-between'; // Separa menú e íconos
  nav.style.padding = '0 15px'; // Espaciado lateral

  // Crear lista de navegación
  const navList = document.createElement('ul');
  navList.style.display = 'flex';
  navList.style.listStyle = 'none';
  navList.style.padding = '0';
  navList.style.margin = '0';
  nav.style.margin = ''; // Centra el navbar horizontalmente si es necesario
  nav.style.width = 'fit-content'; // Asegura que la línea abarque solo el contenido
  nav.style.borderBottom = '2px solid #6E6893'; // Línea continua bajo el navbar
  nav.style.marginBottom = '20px'; // separacion con tabla

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
    padding: 10px 15px; /* Espaciado interno */
    display: inline-block; /* Asegura que ocupen solo su contenido */
    border-bottom: 2px solid transparent; /* Línea inferior para indicar selección */
    cursor: pointer;
  `;

  const selectedItemStyle = `
    color: #12385C;
    border-bottom: 2px solid #12385C; /* Línea inferior con color de selección */
  `;

  navList.innerHTML = `
    <li class="nav-item">
      <a class="nav-link active" style="${navItemStyle}" onclick="selectNavItem(this)" 
         onmouseover="this.style.color='#504F7D'" onmouseout="this.style.color='#6E6893'">
        Delegate Reports List
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link" style="${navItemStyle}" onclick="selectNavItem(this)" 
         onmouseover="this.style.color='#504F7D'" onmouseout="this.style.color='#6E6893'">
        Delegate Summary Report
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link" style="${navItemStyle}" onclick="selectNavItem(this)" 
         onmouseover="this.style.color='#504F7D'" onmouseout="this.style.color='#6E6893'">
        Committee Reports List
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link" style="${navItemStyle}" onclick="selectNavItem(this)" 
         onmouseover="this.style.color='#504F7D'" onmouseout="this.style.color='#6E6893'">
        Delegate Reports Detailed
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link" style="${navItemStyle}" onclick="selectNavItem(this)" 
         onmouseover="this.style.color='#504F7D'" onmouseout="this.style.color='#6E6893'">
        Committee Reports Detailed
      </a>
    </li>
  `;

  // Contenedor para los botones
  const buttonContainer = document.createElement('div');
  buttonContainer.style.display = 'flex';
  buttonContainer.style.gap = '10px';

  // Botón de imprimir
  const printButton = document.createElement('button');
  printButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer" viewBox="0 0 16 16">
      <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>
      <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1"/>
    </svg>
  `;
  printButton.style.border = 'none';
  printButton.style.background = 'none';
  printButton.style.cursor = 'pointer';

  // Botón de exportar CSV
  const exportButton = document.createElement('button');
  exportButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filetype-csv" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM3.517 14.841a1.13 1.13 0 0 0 .401.823q.195.162.478.252.284.091.665.091.507 0 .859-.158.354-.158.539-.44.187-.284.187-.656 0-.336-.134-.56a1 1 0 0 0-.375-.357 2 2 0 0 0-.566-.21l-.621-.144a1 1 0 0 1-.404-.176.37.37 0 0 1-.144-.299q0-.234.185-.384.188-.152.512-.152.214 0 .37.068a.6.6 0 0 1 .246.181.56.56 0 0 1 .12.258h.75a1.1 1.1 0 0 0-.2-.566 1.2 1.2 0 0 0-.5-.41 1.8 1.8 0 0 0-.78-.152q-.439 0-.776.15-.337.149-.527.421-.19.273-.19.639 0 .302.122.524.124.223.352.367.228.143.539.213l.618.144q.31.073.463.193a.39.39 0 0 1 .152.326.5.5 0 0 1-.085.29.56.56 0 0 1-.255.193q-.167.07-.413.07-.175 0-.32-.04a.8.8 0 0 1-.248-.115.58.58 0 0 1-.255-.384z"/>
    </svg>
  `;
  exportButton.style.border = 'none';
  exportButton.style.background = 'none';
  exportButton.style.cursor = 'pointer';

  // Añadir botones al contenedor
  buttonContainer.appendChild(printButton);
  buttonContainer.appendChild(exportButton);

  // Añadir la lista de navegación y botones al contenedor principal
  nav.appendChild(navList);
  nav.appendChild(buttonContainer);

  // Insertar el nav después del título
  const title = document.querySelector('h1');
  title.insertAdjacentElement('afterend', nav);

  // Función para manejar la selección del ítem del nav
  function selectNavItem(selectedItem) {
    // Resetea la clase 'active' de todos los ítems
    const allItems = navList.querySelectorAll('.nav-link');
    allItems.forEach(item => {
      item.classList.remove('active');
      item.style.color = '#6E6893'; // Vuelve al color original
      item.style.borderBottom = '2px solid transparent';
    });

    // Añade la clase 'active' al ítem seleccionado
    selectedItem.classList.add('active');
    selectedItem.style.color = '#12385C'; // Cambia el color
    selectedItem.style.borderBottom = '2px solid #12385C'; // Aplica la línea inferior de selección
  }
}
  
//--------------------------------------------TABLES----------------------------------------------------------------//

let delegates = []; // Variable global para almacenar los datos de los delegados

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
  
// Función para crear la tabla principal
function createMainTable(delegates) {
    const tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = ''; // Limpia cualquier contenido previo
  
    const table = document.createElement('table');
    table.classList.add('table', 'table-bordered', 'table-striped', 'table-responsive');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
  
    // Cabecera de la tabla principal con ordenamiento
    thead.innerHTML = `
      <tr>
        <th onclick="sortMainTable('delegateName', this)" class="sortable">
          State Afilliate<span class="sort-indicator"></span>
        </th>
      </tr>
    `;
  
    // Cuerpo de la tabla
    delegates.forEach((delegate, index) => {
        const row = document.createElement('tr');
        const cellStyle = `
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            font-weight: 400;
            line-height: 16.94px;
            text-align: left;
            color: #6E6893;
        `;
      
        // Botón expand/collapse y nombre del delegado
        row.innerHTML = `
            <td style="${cellStyle}">
            <button class="btn btn-link expand-btn" onclick="toggleNestedTable(${index}, delegates)" style="color: inherit; text-decoration: none; transition: transform 0.3s ease;">
                <i class="bi bi-arrow-right-circle" id="expand-icon-${index}" style="transition: transform 0.3s ease;"></i>
            </button>
            ${delegate.delegateName}
            </td>
        `;
        
        // Fila secundaria para la tabla interna (subtabla)
        const nestedRow = document.createElement('tr');
        nestedRow.innerHTML = `
            <td colspan="2">
            <div class="nested-table" id="nested-table-${index}" style="display: none; overflow: hidden; max-height: 0; transition: max-height 0.3s ease-out;">
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
}
  
// Función para alternar la visibilidad de la subtabla y cambiar la flecha con transición
function toggleNestedTable(index, delegates) {
    const nestedTable = document.getElementById(`nested-table-${index}`);
    const allNestedTables = document.querySelectorAll('.nested-table');
    const expandButton = document.querySelector(`#expand-icon-${index}`);
  
    // Ocultar todas las subtablas excepto la actual
    allNestedTables.forEach((table, idx) => {
      if (idx !== index) {
        table.style.maxHeight = '0'; // Colapsa las subtablas
        table.style.display = 'none';
        const otherButton = document.querySelector(`#expand-icon-${idx}`);
        if (otherButton) {
          otherButton.classList.remove('bi-arrow-down-circle');
          otherButton.classList.add('bi-arrow-right-circle'); // Restaurar flecha hacia la derecha
        }
      }
    });
  
    // Si la subtabla no está visible, la mostramos y creamos la subtabla
    if (nestedTable.style.display === 'none') {
      nestedTable.style.display = 'block';
      nestedTable.style.maxHeight = '1000px'; // Expande la subtabla con animación
      expandButton.classList.remove('bi-arrow-right-circle');
      expandButton.classList.add('bi-arrow-down-circle'); // Cambia la flecha hacia abajo
      createNestedTable(delegates[index].details, index);
    } else {
      nestedTable.style.maxHeight = '0'; // Colapsa la subtabla con animación
      setTimeout(() => (nestedTable.style.display = 'none'), 300); // Oculta completamente tras la animación
      expandButton.classList.remove('bi-arrow-down-circle');
      expandButton.classList.add('bi-arrow-right-circle'); // Cambia la flecha hacia la derecha
    }
}

class CustomHeader {
    init(params) {
      this.params = params;
      const eGui = document.createElement('div');
      eGui.innerHTML = `
        <div class="custom-header">
          ${this.params.displayName}
        </div>
      `;
      this.eGui = eGui;
    }
  
    getGui() {
      return this.eGui;
    }
  }
  
function createNestedTable(details, index) {
  const backgroundColors = [
    '#4F378A14', // 8% opacidad (HEX con opacidad en porcentaje)
    '#4F378A29', // 16% opacidad
    '#4F378A1F', // 12% opacidad
  ];

  const gridOptions = {
    columnDefs: [
      { 
        headerName: 'Full Name', 
        field: 'fullName', 
        sortable: true,
        headerClass: 'custom-header', // Aplica el estilo de encabezado
        cellStyle: { backgroundColor: backgroundColors[0] },
        headerComponent: CustomHeader,
      },
      { 
        headerName: 'NGAUS Member <br> ID Number', 
        field: 'ngausMemberId', 
        sortable: true,
        headerClass: 'custom-header', // Aplica el estilo de encabezado
        cellStyle: { backgroundColor: backgroundColors[1] },

        headerComponent: CustomHeader,
      },
      { 
        headerName: 'Pay <br> Grade', 
        field: 'payGrade', 
        sortable: true,
        headerClass: 'custom-header', // Aplica el estilo de encabezado
        cellStyle: { textAlign: 'center' }, // Centra el texto en las celdas
        cellStyle: { backgroundColor: backgroundColors[2] },
        headerComponent: CustomHeader,
      },
      { 
        headerName: 'Rank', 
        field: 'rank', 
        sortable: true,
        headerClass: 'custom-header', // Aplica el estilo de encabezado
        cellStyle: { backgroundColor: backgroundColors[0] },
        headerComponent: CustomHeader,
      },
      { 
        headerName: 'Branch', 
        field: 'branch', 
        sortable: true,
        headerClass: 'custom-header', // Aplica el estilo de encabezado
        cellStyle: { backgroundColor: backgroundColors[1] },
        headerComponent: CustomHeader,
      },
      { 
        headerName: 'Duty <br> Status', 
        field: 'dutyStatus', 
        sortable: true,
        headerClass: 'custom-header', // Aplica el estilo de encabezado
        cellStyle: { backgroundColor: backgroundColors[2] },
        headerComponent: CustomHeader,
        cellRenderer: function(params) {
          const dutyStatus = params.value; // Obtiene el valor de la columna (active o retired)
          const button = document.createElement('button');
          button.style.padding = '5px 10px';
          button.style.border = 'none';
          button.style.borderRadius = '5px';
          button.style.fontSize = '14px';
          button.style.fontWeight = '400';
          button.style.lineHeight = '16.94px';
          button.style.letterSpacing = '0.05em';
          button.style.textAlign = 'center';
          
          // Asigna el color y estilo del botón según el estado
          if (dutyStatus === 'Active') {
            button.style.width = '53px';
            button.style.height = '19px';
            button.style.padding = '2px 8px';
            button.style.gap = '8px';
            button.style.borderRadius = '100px';
            button.style.backgroundColor = '#CDFFCD';
            button.style.fontFamily = 'Inter';
            button.style.fontSize = '12px';
            button.style.fontWeight = '500';
            button.style.lineHeight = '14.52px';
            button.style.textAlign = 'left';
            button.style.color = '#007F00';
            button.textContent = 'Active';
          } else if (dutyStatus === 'Retired') {
            button.style.width = '53px';
            button.style.height = '19px';
            button.style.padding = '2px 8px';
            button.style.gap = '8px';
            button.style.borderRadius = '100px';
            button.style.backgroundColor = '#FFECCC';
            button.style.fontFamily = 'Inter';
            button.style.fontSize = '12px';
            button.style.fontWeight = '500';
            button.style.lineHeight = '14.52px';
            button.style.textAlign = 'left';
            button.style.color = '#CE8500';
            button.textContent = 'Retired';
          }

          return button;
        },
      },
      {
        headerName: 'Warrant <br> Officer <br>  Caucus Army',
        field: 'caucuses.warrantOfficerCaucusArmy',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { textAlign: 'center', backgroundColor: backgroundColors[0] },// Centra el texto en las celdas
        headerComponent: CustomHeader,
        cellRenderer: function(params) {
          return params.value ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                </svg>` 
            : ''; // Muestra el icono SVG si es true, o deja la celda vacía si es false
        }
      },
      {
        headerName: 'Area III <br> Army <br> Caucus',
        field: 'caucuses.areaIIIArmyCaucus',
        sortable: true,         
        headerClass: 'custom-header',
        cellStyle: { textAlign: 'center', backgroundColor: backgroundColors[1] }, // Centra el texto en las celdas
        headerComponent: CustomHeader,
        cellRenderer: function(params) {
          return params.value ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                </svg>` 
            : ''; // Muestra el icono SVG si es true, o deja la celda vacía si es false
        }
      },
      {
        headerName: 'Retired <br> Air Force',
        field: 'caucuses.retiredAirForce',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { textAlign: 'center', backgroundColor: backgroundColors[2] }, // Centra el texto en las celdas
        headerComponent: CustomHeader,
        cellRenderer: function(params) {
          return params.value ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                </svg>` 
            : ''; // Muestra el icono SVG si es true, o deja la celda vacía si es false
        }
      },
      {
        headerName: 'Committee <br> On Joint <br> Resolutions',
        field: 'caucuses.committeeOnJointResolutions',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { textAlign: 'center', backgroundColor: backgroundColors[0] }, // Centra el texto en las celdas
        headerComponent: CustomHeader,
        cellRenderer: function(params) {
          return params.value ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                </svg>` 
            : ''; // Muestra el icono SVG si es true, o deja la celda vacía si es false
        }
      },
      {
        headerName: 'Retired <br> Army',
        field: 'caucuses.retiredArmy',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { textAlign: 'center', backgroundColor: backgroundColors[1] }, // Centra el texto en las celdas
        headerComponent: CustomHeader,
        cellRenderer: function(params) {
          return params.value ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                </svg>` 
            : ''; // Muestra el icono SVG si es true, o deja la celda vacía si es false
        }
      },
      {
        headerName: 'Area III <br> Air Force <br> Caucus',
        field: 'caucuses.areaIIIAirForceCaucus',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { textAlign: 'center', backgroundColor: backgroundColors[2] }, // Centra el texto en las celdas
        headerComponent: CustomHeader,
        cellRenderer: function(params) {
          return params.value ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                </svg>` 
            : ''; // Muestra el icono SVG si es true, o deja la celda vacía si es false
        }
      },
      {
        headerName: 'Committee <br> On Air <br> Force Resolutions',
        field: 'caucuses.committeeOnAirForceResolutions',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { textAlign: 'center', backgroundColor: backgroundColors[0] }, // Centra el texto en las celdas
        headerComponent: CustomHeader,
        cellRenderer: function(params) {
          return params.value ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                </svg>` 
            : ''; // Muestra el icono SVG si es true, o deja la celda vacía si es false
        }
      },
      {
        headerName: 'Company <br> Grade Air <br> Force',
        field: 'caucuses.companyGradeAirForce',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { textAlign: 'center', backgroundColor: backgroundColors[1] }, // Centra el texto en las celdas
        headerComponent: CustomHeader,
        cellRenderer: function(params) {
          return params.value ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                </svg>` 
            : ''; // Muestra el icono SVG si es true, o deja la celda vacía si es false
        }
      },
      {
        headerName: 'Company <br> Grade <br> Army',
        field: 'caucuses.companyGradeArmy',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { textAlign: 'center', backgroundColor: backgroundColors[2] }, // Centra el texto en las celdas
        headerComponent: CustomHeader,
        cellRenderer: function(params) {
          return params.value ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                </svg>` 
            : ''; // Muestra el icono SVG si es true, o deja la celda vacía si es false
        }
      },
      {
        headerName: 'Committee <br> On <br> Nominations',
        field: 'caucuses.committeeOnNominations',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { textAlign: 'center' , backgroundColor: backgroundColors[0]}, // Centra el texto en las celdas
        headerComponent: CustomHeader,
        cellRenderer: function(params) {
          return params.value ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                </svg>` 
            : ''; // Muestra el icono SVG si es true, o deja la celda vacía si es false
        }
      },
      { 
        headerName: 'Committee <br> On Army <br> Resolutions',
        field: 'caucuses.committeeOnArmyResolutions',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { textAlign: 'center' , backgroundColor: backgroundColors[1]}, // Centra el texto en las celdas
        headerComponent: CustomHeader,
        cellRenderer: function(params) {
          return params.value ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                </svg>` 
            : ''; // Muestra el icono SVG si es true, o deja la celda vacía si es false
        }
      }
      
    ],
    rowData: details,
    pagination: false,
    suppressMovableColumns: true,
    getRowStyle: function(params) {
      return {
        fontFamily: 'Inter',
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '16.94px',
        letterSpacing: '0.05em',
        textAlign: 'left',
        color: '#6E6893'
      };
    },
  };

  // Inicializa el grid de AG Grid para la subtabla solo si no está creado ya
  const gridDiv = document.querySelector(`#ag-grid-${index}`);
  if (!gridDiv.innerHTML.trim()) {  // Verifica si el grid ya está creado
    new agGrid.Grid(gridDiv, gridOptions);
  }
}

  // Inicia la carga de los delegados al cargar la página
  loadDelegates();  
  
  // Cargar los datos y el nav cuando se carga la página
  window.onload = function() {
    loadDelegates();
    createNav(); // Llamada a la función para crear el nav
    };
  
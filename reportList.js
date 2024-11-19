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
    nav.style.margin = '0 auto'; // Centra el navbar horizontalmente si es necesario
    nav.style.width = 'fit-content'; // Asegura que la línea abarque solo el contenido
    nav.style.borderBottom = '2px solid #6E6893'; // Línea continua bajo el navbar
  
  
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
  
  
  let delegates = []; // Variable global para almacenar los datos de los delegados
  
  // Función para crear la tabla principal
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
  
  // Modificar la función createMainTable
  // Modificar la función createMainTable
  function createMainTable(delegates) {
    const tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = ''; // Limpia cualquier contenido previo
  
    const table = document.createElement('table');
    table.classList.add('table', 'table-bordered', 'table-striped', 'table-responsive'); // Clases de Bootstrap
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
  
    // Cabecera de la tabla principal con ordenamiento
    thead.innerHTML = `
      <tr>
        <th onclick="sortMainTable('delegateName', this)" class="sortable">
          Delegate Name <span class="sort-indicator"></span>
        </th>
      </tr>
    `;
  
    // Cuerpo de la tabla
    delegates.forEach((delegate, index) => {
      const row = document.createElement('tr');
  
      // Mover el botón "Expand" a la izquierda del nombre del delegado y cambiarlo por la flecha
  row.innerHTML = `
  <td>
    <button class="btn btn-link expand-btn" onclick="toggleNestedTable(${index}, delegates)">
      <i class="bi bi-arrow-down-circle"></i>
    </button>
    ${delegate.delegateName} <!-- Nombre del delegado -->
  </td>
  `;
  
  
      // Fila secundaria para la tabla interna (subtabla)
      const nestedRow = document.createElement('tr');
      nestedRow.innerHTML = `
        <td colspan="2">
          <div class="nested-table" id="nested-table-${index}" style="display: none;">
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
  
  
  
  // Función para alternar la visibilidad de la subtabla
  function toggleNestedTable(index, delegates) {
    const nestedTable = document.getElementById(`nested-table-${index}`);
    const allNestedTables = document.querySelectorAll('.nested-table');
  
    // Ocultar todas las subtablas excepto la actual
    allNestedTables.forEach(table => {
      if (table !== nestedTable) {
        table.style.display = 'none'; // Ocultar las demás subtablas
      }
    });
  
    // Si la subtabla no está visible, la mostramos y creamos la subtabla
    if (nestedTable.style.display === 'none') {
      nestedTable.style.display = 'block';
      createNestedTable(delegates[index].details, index); // Solo creamos la subtabla si es necesario
    } else {
      nestedTable.style.display = 'none'; // Si ya está visible, la ocultamos
    }
  }
  
  // Función para crear la subtabla con AG Grid
  function createNestedTable(details, index) {
    const gridOptions = {
      columnDefs: [
        { headerName: 'Full Name', field: 'fullName', sortable: true },
        { headerName: 'NGAUS Member ID Number', field: 'ngausMemberId', sortable: true },
        { headerName: 'Pay Grade', field: 'payGrade', sortable: true },
        { headerName: 'Rank', field: 'rank', sortable: true },
        { headerName: 'Branch', field: 'branch', sortable: true },
        { headerName: 'Duty Status', field: 'dutyStatus', sortable: true },
        { headerName: 'Warrant Officer Caucus Army', field: 'caucuses.warrantOfficerCaucusArmy', cellRenderer: 'checkboxRenderer', sortable: true },
        { headerName: 'Area III Army Caucus', field: 'caucuses.areaIIIArmyCaucus', cellRenderer: 'checkboxRenderer', sortable: true },
        { headerName: 'Retired Air Force', field: 'caucuses.retiredAirForce', cellRenderer: 'checkboxRenderer', sortable: true },
        { headerName: 'Committee On Joint Resolutions', field: 'caucuses.committeeOnJointResolutions', cellRenderer: 'checkboxRenderer', sortable: true },
        { headerName: 'Retired Army', field: 'caucuses.retiredArmy', cellRenderer: 'checkboxRenderer', sortable: true },
        { headerName: 'Area III Air Force Caucus', field: 'caucuses.areaIIIAirForceCaucus', cellRenderer: 'checkboxRenderer', sortable: true },
        { headerName: 'Committee On Air Force Resolutions', field: 'caucuses.committeeOnAirForceResolutions', cellRenderer: 'checkboxRenderer', sortable: true },
        { headerName: 'Company Grade Air Force', field: 'caucuses.companyGradeAirForce', cellRenderer: 'checkboxRenderer', sortable: true },
        { headerName: 'Company Grade Army', field: 'caucuses.companyGradeArmy', cellRenderer: 'checkboxRenderer', sortable: true },
        { headerName: 'Committee On Nominations', field: 'caucuses.committeeOnNominations', cellRenderer: 'checkboxRenderer', sortable: true },
        { headerName: 'Committee On Army Resolutions', field: 'caucuses.committeeOnArmyResolutions', cellRenderer: 'checkboxRenderer', sortable: true }
      ],
      rowData: details,
      pagination: true,
    };
  
    // Inicializa el grid de AG Grid para la subtabla solo si no está creado ya
    const gridDiv = document.querySelector(`#ag-grid-${index}`);
    if (!gridDiv.innerHTML.trim()) {  // Verifica si el grid ya está creado
      new agGrid.Grid(gridDiv, gridOptions);
    }
  }
  
  // Función para ordenar la tabla principal
  let mainTableSortOrder = 1;
  function sortMainTable(key, th) {
    fetch('delegates.json')
      .then(response => response.json())
      .then(data => {
        const sorted = data.delegates.sort((a, b) => {
          if (a[key] < b[key]) return -mainTableSortOrder;
          if (a[key] > b[key]) return mainTableSortOrder;
          return 0;
        });
        mainTableSortOrder = -mainTableSortOrder;
        createMainTable(sorted);
        toggleSortIndicator(th);
      });
  }
  
  // Función para alternar el indicador de ordenamiento
  function toggleSortIndicator(th) {
    const indicators = document.querySelectorAll('.sort-indicator');
    indicators.forEach(indicator => indicator.remove()); // Eliminar indicadores previos
  
    const indicator = document.createElement('span');
    indicator.classList.add('sort-indicator');
    if (mainTableSortOrder === 1) {
      indicator.textContent = '↑'; // Orden ascendente
    } else {
      indicator.textContent = '↓'; // Orden descendente
    }
    th.appendChild(indicator);
  }
  
  // Cargar los datos y el nav cuando se carga la página
  window.onload = function() {
    loadDelegates();
    createNav(); // Llamada a la función para crear el nav
  };
  
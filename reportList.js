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
      
      .ag-theme-alpine {
        height: 400px; 
        width: 100%;
      }
  </style>`
);

const tableContainer = document.createElement("div");
tableContainer.id = "table-container";
tableContainer.className = "table-responsive main-table-container";

document.body.appendChild(tableContainer);

function createAndStyleH1() {

  const h1 = document.createElement('h1');
  
  h1.textContent = 'NGAUS 2024 - REPORTS';
  
  h1.style.fontFamily = "'Inter', sans-serif"; 
  h1.style.fontWeight = '700'; 
  h1.style.fontSize = '24px'; 
  h1.style.lineHeight = '29.05px'; 
  h1.style.letterSpacing = '0.1em'; 
  h1.style.marginBottom = '30px'; 
  
  document.body.insertBefore(h1, document.body.firstChild);
}
//------------------------------------------------------------------NAV---------------------------------------------------------------------------------//
function createNav() {
  const nav = document.createElement('div');
  nav.style.display = 'flex'; 
  nav.style.alignItems = 'center'; 
  nav.style.justifyContent = 'space-between'; 
  nav.style.padding = '0';
  nav.style.marginBottom = '20px'; 
  nav.style.width = '100%'; 
  nav.style.flexWrap = 'wrap'; 

  const navList = document.createElement('ul');
  navList.style.display = 'flex';
  navList.style.listStyle = 'none';
  navList.style.padding = '0';
  navList.style.margin = '0';
  navList.style.width = 'fit-content'; 
  navList.style.borderBottom = '1px solid #6E6893'; 
  navList.style.flexWrap = 'wrap'; 


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

  const menuItems = [
    'Delegate Reports List',
    'Delegate Summary Report',
    'Committee Reports List',
    // 'Delegate Reports Detailed',
    // 'Committee Reports Detailed',
  ];
  let activeTab = 0; 

  menuItems.forEach((text, index) => {
    const listItem = document.createElement('li');
    listItem.style.margin = '0';

    const link = document.createElement('a');
    link.textContent = text;
    link.style.cssText = navItemStyle;

    link.addEventListener('click', function () {
      const allLinks = navList.querySelectorAll('a');
      allLinks.forEach((item) => {
        item.style.color = '#6E6893';
        item.style.borderBottom = '1px solid transparent';
      });
    
      this.style.color = '#12385C';
      this.style.borderBottom = '2px solid #12385C';
      activeTab = index;
      switch (index) {
        case 0:
          loadDelegates(); 
          break;
        case 1:
          showDelegateSummary(); 
          break;
        case 2:
          loadCommittee(); 
          break;
        // case 3:
        //   showDelegateReportsDetailed(); /
        //   break;
        // case 4:
        //   showCommitteeReportsDetailed(); 
        //   break;
      }
      toggleButtonsVisibility(); 
    });
    listItem.appendChild(link);
    navList.appendChild(listItem);

    if (index === 0) {
      link.style.color = '#12385C'; 
      link.style.borderBottom = '2px solid #12385C'; 
    }
  });

  // ---------------------------------------------Buttons--------------------------------------------------------

const buttonContainer = document.createElement('div');
buttonContainer.classList.add('button-container');
buttonContainer.style.display = 'flex';
buttonContainer.style.margin = '10px';
buttonContainer.style.gap = '10px';
buttonContainer.style.marginLeft = 'auto'; 
buttonContainer.style.flexWrap = 'wrap'; 

const buttons = [
  { icon: 'bi bi-printer-fill', label: 'Print', isPrint: true },
  { icon: 'bi bi-filetype-csv', label: 'Export CSV', isPrint: false },
];

buttons.forEach((button) => {
  const btn = document.createElement('button');
  btn.innerHTML = `<i class="${button.icon}" style="font-size: 16px;"></i>`;

  // Estilo predeterminado para botones cuadrados
  btn.style.cssText = `
    width: 40px; /* Ancho fijo para el botón */
    height: 40px; /* Altura igual al ancho para hacerlo cuadrado */
    border: 2px solid #6D5BD0;
    background-color: #6D5BD0;
    color: white;
    border-radius: 0; /* Sin bordes redondeados */
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
  `;

  // Si es el botón de Print, le quitamos el color de fondo
  if (button.isPrint) {
    btn.style.backgroundColor = 'transparent'; // Fondo transparente para Print
    btn.style.color = '#6D5BD0'; // Mantener el texto en el color morado
  }

  btn.addEventListener('click', function () {
    if (button.isPrint) {
      downloadPDF(); // Llamada a la función de descargar PDF
    } else {
      downloadCSV(); // Llamada a la función de exportar CSV
    }
  });

  buttonContainer.appendChild(btn);
});
  
  nav.appendChild(navList);
  nav.appendChild(buttonContainer);

  const title = document.querySelector('h1');
  title.insertAdjacentElement('afterend', nav);

//---------------------------------------------------------BUTTON CSV-----------------------------------------------------------

function downloadCSV() {
  let data;

  if (activeTab === 0) {
    data = getVisibleNestedTableData(); 
  } else if (activeTab === 2) {
    data = getVisibleNestedTablecommitteesData(); 
  } else {
    alert('CSV export is not available for this tab.');
    return;
  }

  if (!data || data.length === 0) {
    alert('There is no data to export.');
    return;
  }

  const csvRows = [];

  const headers = getHeadersCsv(data);
  csvRows.push(headers.join(',')); 

  data.forEach(row => {
    const values = headers.map(header => {
      if (header.startsWith('caucuses.')) {
        const caucusKey = header.split('.')[1]; 
        return row.caucuses && row.caucuses[caucusKey] !== undefined
          ? `"${row.caucuses[caucusKey]}"`
          : '""'; 
      } else {
        return row[header] !== undefined ? `"${row[header]}"` : '""'; 
      }
    });
    csvRows.push(values.join(',')); 
  });

  const csvContent = "data:text/csv;charset=utf-8," + csvRows.join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "data.csv");

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function getHeadersCsv(data) {
  const headers = new Set();

  data.forEach(row => {
    Object.keys(row).forEach(key => {
      if (key !== 'caucuses') {
        headers.add(key);
      } else if (row.caucuses) {
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

  if (activeTab === 0) {
    data = getVisibleNestedTableData(); 
  } else if (activeTab === 2) {
    data = getVisibleNestedTablecommitteesData(); 
  } else {
    alert('PDF export is not available for this tab.');
    return;
  }

  if (!data || data.length === 0) {
    alert('There is no data to export.');
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'landscape' });

  const headers = getHeaders(data).map(header => {
    return header.startsWith('caucuses.') ? header.replace('caucuses.', '') : header;
  });

  const rows = data.map(row => {
    return headers.map(header => {
      if (header in row) {
        return row[header] || ''; 
      } else if (row.caucuses && header in row.caucuses) {
        return row.caucuses[header] || ''; 
      } else {
        return ''; 
      }
    });
  });

  const columnStyles = {};
  headers.forEach((header, index) => {
    if (header in (data[0]?.caucuses || {})) {
      columnStyles[index] = { cellWidth: 10 }; 
    }
  });

  doc.autoTable({
    head: [headers], 
    body: rows,      
    startY: 10,      
    styles: { fontSize: 7 }, 
    columnStyles,    
  });

  doc.save('data.pdf');
}

function getHeaders(data) {
  const headers = new Set();

  data.forEach(row => {
    Object.keys(row).forEach(key => {
      if (key !== 'caucuses') {
        headers.add(key);
      } else {
        Object.keys(row.caucuses).forEach(caucusKey => {
          headers.add(caucusKey); 
        });
      }
    });
  });

  return Array.from(headers);
}

//---------------------------------------------------------RESPONSIVE MOBILE-------------------------------------------------------------
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
//---------------------------------------------------------SHOW TABLES -----------------------------------------------------------
function loadDelegates() {
  const tableContainer = document.getElementById('table-container');
  tableContainer.innerHTML = ''; 
  createMainTable(delegates);
}
function showDelegateSummary() {
  const tableContainer = document.getElementById('table-container');
  tableContainer.innerHTML = '';
  createDelegateSummaryTable(delegates);
}

function showCommitteeReports() {
  const tableContainer = document.getElementById('table-container');
  tableContainer.innerHTML = ''; 
  createCommitteeReportsTable();
}

function showDelegateReportsDetailed() {
  const tableContainer = document.getElementById('table-container');
  tableContainer.innerHTML = ''; 
  createDelegateReportsDetailedTable();
}

function showCommitteeReportsDetailed() {
  const tableContainer = document.getElementById('table-container');
  tableContainer.innerHTML = '';
  createCommitteeReportsDetailedTable();
}

function toggleButtonsVisibility() {
  const buttonContainer = document.querySelector('.button-container');
  if (!buttonContainer) return; 

  const navLinks = document.querySelectorAll('ul a');
  const activeTabIndex = Array.from(navLinks).findIndex((link) => 
    link.style.borderBottom === '2px solid rgb(18, 56, 92)'
  );

  if (activeTabIndex === 0 || activeTabIndex === 2) {
    buttonContainer.style.display = 'flex';
  } else {
    buttonContainer.style.display = 'none'; 
  }
}

document.addEventListener('DOMContentLoaded', () => {
  toggleButtonsVisibility();
});

//------------------------------------------------------------------TABLES---------------------------------------------------------------------------------
let delegates = []; 

const gridOptionsArray = [];

async function loadDelegates() {
  try {
    const response = await fetch('delegates.json');
    if (!response.ok) {
      throw new Error('Error loading JSON');
    }
    const data = await response.json();
    delegates = data.delegates; 

    createMainTable(delegates);
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

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

class CustomHeader {
  init(params) {
    this.params = params;

    const eGui = document.createElement('div');
    eGui.classList.add('custom-header');

    eGui.innerHTML = `
      <div style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        white-space: nowrap; 
        overflow: hidden; 
        text-overflow: ellipsis; 
      ">
        <span style="flex-grow: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${params.displayName}</span>
        <span class="sort-icon" style="flex-shrink: 0;"></span>
      </div>
    `;

    eGui.addEventListener('click', () => {
      const nextSortOrder = this.getNextSortOrder(params.column.getSort());
      params.setSort(nextSortOrder, params.shiftKey);
    });

    this.eGui = eGui;
    this.updateSortIcon(); 
  }

  getGui() {
    return this.eGui;
  }

  getNextSortOrder(currentSort) {
    if (currentSort === 'asc') return 'desc';
    if (currentSort === 'desc') return null;
    return 'asc';
  }

  updateSortIcon() {
    const sortOrder = this.params.column.getSort();
    const sortIcon = this.eGui.querySelector('.sort-icon');

    if (!sortIcon) return;

    sortIcon.innerHTML = ''; 
    if (sortOrder === 'asc') {
      sortIcon.innerHTML = '&#9650;'; 
    } else if (sortOrder === 'desc') {
      sortIcon.innerHTML = '&#9660;'; 
    }
  }

  onSortChanged() {
    this.updateSortIcon();
  }
}

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
    alignItems: 'center', 
  };

  if (status === 'Active') {
    return { ...baseStyle, backgroundColor: '#CDFFCD', color: '#007F00', textContent: 'Active' };
  } else if (status === 'Retired') {
    return { ...baseStyle, backgroundColor: '#FFECCC', color: '#CE8500', textContent: 'Retired' };
  }
  return baseStyle;
}


function iconRenderer(params) {
  return params.value
    ? '<i class="bi bi-check-circle-fill" style="color: green; font-size: 16px;"></i>'
    : ''; 
}

//----------------------------------------------------------------DELEGATE REPORT LIST----------------------------------------------------------------------

function createMainTable() {
  const tableContainer = document.getElementById('table-container');
  tableContainer.innerHTML = ''; 

  const table = document.createElement('table');
  table.classList.add('table', 'table-bordered', 'table-striped', 'table-responsive');

  table.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; 
  
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  delegates.forEach((delegate, index) => {
    const row = document.createElement('tr');
    const cellStyle = `
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      font-weight: 400;
      line-height: 1.2; 
      text-align: left;
      color: #6E6893;
      box-shadow: none;
      padding: 2px 2px; 
      height: 2px; 
      border:none;
      border-bottom: 1px solid #C6C2DE; 
    `;
  
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

function toggleNestedTable(index) {
  const nestedTable = document.getElementById(`nested-table-${index}`);
  const nestedRow = nestedTable.closest('tr'); 
  const allNestedTables = document.querySelectorAll('.nested-table');
  const expandButton = document.querySelector(`#expand-icon-${index}`);

  allNestedTables.forEach((table, idx) => {
    const otherRow = table.closest('tr');
    if (idx !== index) {
      table.style.maxHeight = '0'; 
      table.style.display = 'none'; 
      if (otherRow) otherRow.style.display = 'none'; 
      const otherButton = document.querySelector(`#expand-icon-${idx}`);
      if (otherButton) {
        otherButton.classList.remove('bi-arrow-down-circle');
        otherButton.classList.add('bi-arrow-right-circle'); 
      }
    }
  });

  if (nestedTable.style.display === 'none') {
    nestedRow.style.display = ''; 
    nestedTable.style.display = 'block';
    nestedTable.style.maxHeight = '1000px'; 
    expandButton.classList.remove('bi-arrow-right-circle');
    expandButton.classList.add('bi-arrow-down-circle'); 
    createNestedTable(delegates[index].details, index);
  } else {
    nestedTable.style.maxHeight = '0';
    setTimeout(() => {
      nestedTable.style.display = 'none';
      nestedRow.style.display = 'none'; 
    }, 300); 
    expandButton.classList.remove('bi-arrow-down-circle');
    expandButton.classList.add('bi-arrow-right-circle');
  }
}


function createNestedTable(details, index) {
  const backgroundColors = [
    '#4F378A1F', 
    '#4F378A29', 
    '#4F378A14', 
    '#4F378A0A', 
    '#4F378A0D', 
    '#4F378A05'  
  ];
  const style = document.createElement('style');
  style.innerHTML = `
  .header-background {
    background-color: ${backgroundColors[3]};
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
  .header-background-2 {
    background-color: ${backgroundColors[4]};
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
    background-color: ${backgroundColors[5]};
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
    .ag-theme-alpine .ag-row {
      border-bottom: 1px solid #C6C2DE; 
    }
    .ag-theme-alpine .ag-root-wrapper {
      border: none; 
    }
    .ag-theme-alpine .ag-header-row {
      border-bottom: none; 
    }
    .ag-theme-alpine .ag-header {
      border-bottom: 1px solid #C6C2DE !important; 
    }
    .ag-theme-alpine .ag-header-cell {
      border: none !important; 
    }
    .ag-theme-alpine .ag-header-row {
      border-bottom: none !important; 
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
          display: 'flex',            
          justifyContent: 'center',   
          alignItems: 'center',       
        },
        headerComponent: CustomHeader,
        cellRenderer: function (params) {
          if (!params.value) {
            return '';
          }
          const button = document.createElement('button');
          const styles = getButtonStyles(params.value);
          Object.assign(button.style, styles);  
          button.textContent = styles.textContent;
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
        cellStyle: { textAlign: 'center', backgroundColor: backgroundColors[2] }, 
        headerComponent: CustomHeader,
        width: 100, 
        minWidth: 80, 
        maxWidth: 125, 
        cellRenderer: iconRenderer,
        headerClass: 'header-background-3', 
      },
      {
        headerName: 'Committee <br> On Joint <br> Resolutions',
        field: 'caucuses.committeeOnJointResolutions',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { textAlign: 'center', backgroundColor: backgroundColors[0] }, 
        headerComponent: CustomHeader,
        width: 100,       
        minWidth: 80, 
        maxWidth: 125, 
        cellRenderer: iconRenderer,
        headerClass: 'header-background', 
      },
      {
        headerName: 'Retired <br> Army',
        field: 'caucuses.retiredArmy',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { textAlign: 'center', backgroundColor: backgroundColors[1] }, 
        headerComponent: CustomHeader,
        width: 100, 
        minWidth: 80, 
        maxWidth: 125, 
        cellRenderer: iconRenderer,
        headerClass: 'header-background-2', 
      },
      {
        headerName: 'Area III <br> Air Force <br> Caucus',
        field: 'caucuses.areaIIIAirForceCaucus',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { textAlign: 'center', backgroundColor: backgroundColors[2] }, 
        headerComponent: CustomHeader,
        width: 100, 
        minWidth: 80, 
        maxWidth: 125, 
        cellRenderer: iconRenderer,
        headerClass: 'header-background-3', 
      },
      {
        headerName: 'Committee <br> On Air <br> Force Resolutions',
        field: 'caucuses.committeeOnAirForceResolutions',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { textAlign: 'center', backgroundColor: backgroundColors[0] }, 
        headerComponent: CustomHeader,
        width: 100, 
        minWidth: 90, 
        maxWidth: 125, 
        cellRenderer: iconRenderer,
        headerClass: 'header-background', 
      },
      {
        headerName: 'Company <br> Grade Air <br> Force',
        field: 'caucuses.companyGradeAirForce',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { textAlign: 'center', backgroundColor: backgroundColors[1] }, 
        headerComponent: CustomHeader,
        width: 100, 
        minWidth: 80, 
        maxWidth: 125, 
        cellRenderer: iconRenderer,
        headerClass: 'header-background-2', 
      },
      {
        headerName: 'Company <br> Grade <br> Army',
        field: 'caucuses.companyGradeArmy',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { textAlign: 'center', backgroundColor: backgroundColors[2] }, 
        headerComponent: CustomHeader,
        width: 100, 
        minWidth: 80, 
        maxWidth: 125, 
        cellRenderer: iconRenderer,
        headerClass: 'header-background-3', 
      },
      {
        headerName: 'Committee <br> On <br> Nominations',
        field: 'caucuses.committeeOnNominations',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { textAlign: 'center' , backgroundColor: backgroundColors[0]}, 
        headerComponent: CustomHeader,
        width: 100, 
        minWidth: 80, 
        maxWidth: 125, 
        cellRenderer: iconRenderer,
        headerClass: 'header-background', 
      },
      { 
        headerName: 'Committee <br> On Army <br> Resolutions',
        field: 'caucuses.committeeOnArmyResolutions',
        sortable: true,
        headerClass: 'custom-header',
        cellStyle: { textAlign: 'center' , backgroundColor: backgroundColors[1]}, 
        headerComponent: CustomHeader,
        width: 100, 
        minWidth: 80, 
        maxWidth: 125, 
        cellRenderer: iconRenderer,
        headerClass: 'header-background-2', 
      } 
    ],
    rowData: adjustedDetails,
    pagination: false,
    domLayout: 'normal',
    defaultColDef: {
      resizable: true,
      tooltipField: 'headerName', 
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

      console.log(`Calculated height: ${totalHeight}px`);
      gridDiv.style.height = `${totalHeight}px`;

      setTimeout(() => params.api.sizeColumnsToFit(), 0);
    },
  };

  const gridDiv = document.querySelector(`#ag-grid-${index}`);
  if (!gridDiv) {
    console.error(`Container for table with ID not found: ag-grid-${index}`);
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
  gridOptionsArray[index] = gridOptions; 
}

//----------------------------------------------------------------DELEGATE SUMMARY REPORT---------------------------------------------------------------------

function createDelegateSummaryTable() {
  const tableContainer = document.getElementById('table-container');
  tableContainer.innerHTML = ''; // Limpia cualquier contenido previo

  const table = document.createElement('table');
  table.classList.add('table', 'table-bordered', 'table-striped', 'table-responsive');

  table.style.backgroundColor = 'white';
  table.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
  table.style.borderRadius = '8px';
  table.style.border = 'none';
  table.style.borderBottom = '1px solid #C6C2DE';
  table.style.borderCollapse = 'collapse';
  table.style.tableLayout = 'fixed'; 
  table.style.width = '100%'; 
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
  document.head.appendChild(style); 

  thead.style.borderTop = 'none'; 
  
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
          padding: 8px 12px;
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

function toggleMainTable() {
  const tbody = document.querySelector('#table-container table tbody');
  const mainExpandIcon = document.getElementById('main-expand-icon');

  if (tbody.style.display === 'none') {
    tbody.style.display = 'table-row-group'; 
    mainExpandIcon.classList.remove('bi-arrow-right-circle');
    mainExpandIcon.classList.add('bi-arrow-down-circle');
  } else {
    tbody.style.display = 'none'; 
    mainExpandIcon.classList.remove('bi-arrow-down-circle');
    mainExpandIcon.classList.add('bi-arrow-right-circle');
  }
}

//---------------------------------------------------------------COMMITTE REPORT LIST----------------------------------------------------------------

let committees = []; 
const gridOptionsArraycommittee = []; 

async function loadCommittee() {
  try {
    const response = await fetch('committees.json');
    if (!response.ok) {
      throw new Error('Error al cargar el JSON');
    }
    const data = await response.json();
    committees = data.committees; 

    createCommitteeReportsTable(committees);
  } catch (error) {
    console.error('Error al cargar los datos:', error);
  }
}

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

function createCommitteeReportsTable(committees) {
  const tableContainer = document.getElementById('table-container');
  tableContainer.innerHTML = ''; 

  const table = document.createElement('table');
  table.classList.add('table', 'table-striped', 'table-responsive');

  table.style.backgroundColor = 'white';
  table.style.borderRadius = '8px';
  table.style.overflow = 'hidden'; 
  table.style.border = '1px solid #C6C2DE'; 
  table.style.borderCollapse = 'separate'; 
  table.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; 

  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  committees.forEach((committee, index) => {
    const row = document.createElement('tr');
    
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
      borderBottom: '1px solid #C6C2DE'
    };

    if (index === committees.length - 1) {
      cellStyle.borderBottom = 'none'; 
    }

    const cellStyleString = Object.entries(cellStyle)
      .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`)
      .join(' ');

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


function toggleNestedTableCommites(index) {
    const nestedTable = document.getElementById(`nested-table-${index}`);
    const nestedRow = nestedTable.closest('tr'); 
    const allNestedTables = document.querySelectorAll('.nested-table');
    const expandButton = document.querySelector(`#expand-icon-${index}`);

    allNestedTables.forEach((table, idx) => {
      const otherRow = table.closest('tr');
      if (idx !== index) {
        table.style.maxHeight = '0'; 
        table.style.display = 'none'; 
        if (otherRow) otherRow.style.display = 'none'; 
        const otherButton = document.querySelector(`#expand-icon-${idx}`);
        if (otherButton) {
          otherButton.classList.remove('bi-arrow-down-circle');
          otherButton.classList.add('bi-arrow-right-circle'); 
        }
      }
    });

    if (nestedTable.style.display === 'none') {
      nestedRow.style.display = ''; 
      nestedTable.style.display = 'block';
      nestedTable.style.maxHeight = '1000px'; 
      expandButton.classList.remove('bi-arrow-right-circle');
      expandButton.classList.add('bi-arrow-down-circle'); 
      createNestedTablecommittee(committees[index].details, index);
    } else {
      nestedTable.style.maxHeight = '0'; 
      setTimeout(() => {
        nestedTable.style.display = 'none'; 
        nestedRow.style.display = 'none'; 
      }, 300); 
      expandButton.classList.remove('bi-arrow-down-circle');
      expandButton.classList.add('bi-arrow-right-circle'); 
    }
}
  
function createNestedTablecommittee(details, index) {
    const backgroundColors = ['#F2F0F9', '#F8F8F8', '#4F378A1F'];
    const style = document.createElement('style');
    style.innerHTML = `
    .header-background {
      background-color: ${backgroundColors[0]};
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
    .ag-theme-alpine .ag-row {
      border-bottom: 1px solid #C6C2DE; 
    }
    .ag-theme-alpine .ag-root-wrapper {
      border: none; 
    }
    .ag-theme-alpine .ag-header-row {
      border-bottom: none; 
    }
    .ag-theme-alpine .ag-header {
      border-bottom: 1px solid #C6C2DE !important; 
    }
    .ag-theme-alpine .ag-header-cell {
      border: none !important; 
    }
    .ag-theme-alpine .ag-header-row {
      border-bottom: none !important;
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
          display: 'flex',            
          justifyContent: 'center',   
          alignItems: 'center',      
        },
        headerComponent: CustomHeader,
        cellRenderer: function (params) {
          if (!params.value) {
            return '';
          }
          const button = document.createElement('button');
          const styles = getButtonStyles(params.value);
          Object.assign(button.style, styles);  
          button.textContent = styles.textContent; 
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
      tooltipField: 'headerName',
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
  gridOptionsArraycommittee[index] = gridOptions; 
}

//------------------------------------------------------------------------------------------------------

window.onload = function() {
  loadResource("js", "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js");
  loadResource("js", "https://cdn.jsdelivr.net/npm/ag-grid-community/dist/ag-grid-community.min.js");
  loadResource("js", "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");
  loadResource("js", "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js");
  createAndStyleH1();
  createNav(); 
  loadDelegates();
};
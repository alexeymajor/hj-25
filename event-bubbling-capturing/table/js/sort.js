'use strict';

function handleTableClick(event) {

    if (event.target.tagName !== 'TH') {
        return;
    }

    const sortBy = event.target.dataset.propName;

    if (!sortBy) {
        return;
    }

    const dir = event.target.dataset.dataDir === '1' ? '-1' : '1';

    sortTable(sortBy, dir);

    event.target.dataset.dataDir = dir;

  
}

const table = document.getElementsByTagName('table')[0];

table.addEventListener('click', handleTableClick);

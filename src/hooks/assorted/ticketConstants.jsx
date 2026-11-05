function statusMapping() {
    const statusArray = ['Open', 'In progress', 'Closed'];
    const mappedArray = statusArray.map((status) => ({
        value: status,
        label: status,
    }));

    return mappedArray;
};

const calculateTimeElapsed = (updateDate) => {
    const dateNow = Date.now();
    const dateUpdated = new Date(updateDate);
    const delta = dateNow - dateUpdated;

    const minsPassed = delta / 60000;

    return minsPassed < 1 
    ? 'Just now'
    : minsPassed > 1 && minsPassed < 60
    ? `${Math.floor(minsPassed)} mins ago`
    : minsPassed >= 60 && minsPassed < 1440
    ? `${Math.floor(minsPassed / 60)} hours ago`
    : dateUpdated.toString().slice(0, 10);
} 

const colorRender = (status) => {
    if (status === 'Open') return (<span className="bg-red-500 rounded-md p-2 text-wiseOffWhite">{status}</span>);
    if (status === 'In progress') return (<span className="bg-yellow-500 rounded-md p-2 text-bgMain">{status}</span>);
    if (status === 'Closed') return (<span className="bg-gray-500 rounded-md p-2 text-wiseOffWhite">{status}</span>);
}

const expectedTypeMapping = [
    {
        label: 'Plain text',
        value: 'String'
    },
    {
        label: 'Number',
        value: 'Number'
    },
    {
        label: 'Date',
        value: 'Date'
    },
    {
        label: 'Dropdown/ Select Menu',
        value: 'Dropdown'
    },
    {
        Label: 'True/False field',
        value: 'Boolean'
    }
];

const dataSources = [
    {
        label: 'All Users',
        value: 'ALL_USERS'
    },
    {
        label: 'All Departments',
        value: 'ALL_DEPARTMENTS'
    },
    {
        label: 'All Kit',
        value: 'ALL_KIT'
    }
]

export {
    statusMapping,
    expectedTypeMapping,
    dataSources,
    colorRender,
    calculateTimeElapsed
};
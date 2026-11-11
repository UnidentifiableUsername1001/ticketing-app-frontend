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
    calculateTimeElapsed
};
function statusMapping() {
    const statusArray = ['Open', 'In progress', 'Closed'];
    const mappedArray = statusArray.map((status) => ({
        value: status,
        label: status,
    }));

    return mappedArray;
};

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
    colorRender
};
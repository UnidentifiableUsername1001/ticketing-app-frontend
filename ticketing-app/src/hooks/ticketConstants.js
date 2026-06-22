function statusMapping() {
    const statusArray = ['Open', 'In progress', 'Closed'];
    const mappedArray = statusArray.map((status) => ({
        value: status,
        label: status,
    }));

    return mappedArray;
};

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
    dataSources
};
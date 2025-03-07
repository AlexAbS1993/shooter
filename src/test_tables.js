let productsTable = {
    title: 'products',
    reqFields: ['*'],
    fields: ['id', 'title', 'price'],
    insertTypes: ['default', 'string', 'number']
}
let usersTable = {
    title: 'users',
    reqFields: ['*'],
    fields: ['id', 'name'],
    insertTypes: ['default', 'string']
}

module.exports = [productsTable, usersTable]
let productsTable = {
    title: 'products',
    reqFields: ['*'],
    fields: ['id', 'title', 'price'],
    insertTypes: ['default', 'string', 'number']
}
let usersTable = {
    title: 'users',
    reqFields: ['*'],
    fields: ['id', 'name', 'age'],
    insertTypes: ['default', 'string', 'number']
}

module.exports = [productsTable, usersTable]
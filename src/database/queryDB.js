const knex = require("./connection")

const registerData = (table, data) => {
    const recordedData = knex(table).insert(data).returning("*")
    return recordedData

}

const selectUniqueData = (table, column) => {
    const dataFoud = knex(table).where(column).first()
    return dataFoud

}

const selectListData = (table, column) => {
    const dataFoud = knex(table).where(column)
    return dataFoud

}

const updateData = (table, column, data) => {
    const updatedData = knex(table).where(column).update(data)
    return updatedData
}

const deleteData = (table, column) => {
    const deletedData = knex(table).where(column).del().returning("*")
    return deletedData
}

module.exports = {
    registerData,
    selectUniqueData,
    selectListData,
    updateData,
    deleteData
}
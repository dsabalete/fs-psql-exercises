const { rollbackMigration } = require('./db')

const rollback = async () => {
    try {
        await rollbackMigration()
        console.log('Rolled back the last migration successfully.')
    } catch (err) {
        console.error('Failed to roll back the migration:', err)
    } finally {
        process.exit(0)
    }
}

rollback()

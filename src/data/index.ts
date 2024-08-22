import {exit} from 'node:process'
import db from '../config/db'
import colors from 'colors'
const clearDB = async () => {
    try {
        await db.sync({force: true})
        console.log(colors.bgGreen('Database cleared'))
        exit(0)
    } catch (error) {
        console.error(error)
        exit(1)
    }
}

if (process.argv.includes('--clear')) {
    clearDB()

}
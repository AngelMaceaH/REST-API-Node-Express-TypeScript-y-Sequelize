import request from "supertest"
import server, {connectDB} from "../server"
import db from "../config/db"

describe("GET /api", () => {
    it("should return a welcome message", async () => {
        const res = await request(server).get("/api")
        expect(res.status).toBe(200)
        expect(res.headers["content-type"]).toMatch(/json/)
        expect(res.body).toHaveProperty("message", "Bienvenido a la API de Angel Macea")
    })
})

jest.mock('../config/db')

describe('connectDB', () => {
    it('should connect to the database', async () => {
        jest.spyOn(db, 'authenticate')
            .mockRejectedValueOnce(new Error('Error en la conexión a la base de datos'))
        const consoleSpy = jest.spyOn(console, 'log')
        await connectDB()
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error en la conexión a la base de datos'))
    })
})

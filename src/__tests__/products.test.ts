import request from "supertest";
import server from "../server";

describe("POST /api/productos", () => {
  it("should display validation errors", async () => {
    const newProduct = {
      name: "Teclado Mecánico",
      price: "0",
    };

    const res = await request(server).post("/api/productos").send(newProduct);
    expect(res.status).toBe(400);
    expect(res.headers["content-type"]).toMatch(/json/);
  });

  it("should create a new product and return it", async () => {
    const newProduct = {
      name: "Teclado Mecánico - TESTING",
      price: "89.99",
    };

    const res = await request(server).post("/api/productos").send(newProduct);
    expect(res.status).toBe(201);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body).toHaveProperty("message", "Producto creado");
    expect(res.body).toHaveProperty("data");

    const product = res.body.data;
    expect(product).toHaveProperty("id");
    expect(product).toHaveProperty("name", newProduct.name);
    expect(product).toHaveProperty("price", newProduct.price);
    expect(product).toHaveProperty("availability", true);
    expect(typeof product.id).toBe("number");
    expect(product.name).toBe(newProduct.name);
    expect(product.price).toBe(newProduct.price);
    expect(product.availability).toBeTruthy();
  });
});

describe("GET /api/productos", () => {
  it("should return an array of products with a valid structure", async () => {
    const res = await request(server).get("/api/productos");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);

    expect(res.body).toHaveProperty("data");
    expect(Array.isArray(res.body.data)).toBe(true);

    expect(res.body.data.length).toBeGreaterThan(0);

    res.body.data.forEach((product: any) => {
      expect(product).toHaveProperty("id");
      expect(product).toHaveProperty("name");
      expect(product).toHaveProperty("price");
      expect(product).toHaveProperty("availability");

      expect(typeof product.id).toBe("number");
      expect(typeof product.name).toBe("string");
      expect(typeof product.price).toBe("string");
      expect(typeof product.availability).toBe("boolean");
    });
  });
});

describe("GET /api/productos/:id", () => {
  it("should return a product with a valid structure", async () => {
    const productId = 2000;
    const res = await request(server).get(`/api/productos/${productId}`);
    expect(res.status).toBe(404);
    expect(res.headers["content-type"]).toMatch(/json/);
  });

  it("should check a valid ID in the URL", async () => {
    const productId = 1;
    const res = await request(server).get(`/api/productos/${productId}`);
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body).toHaveProperty("message", "Producto encontrado");
    expect(res.body).toHaveProperty("data");

    const product = res.body.data;
    expect(product).toHaveProperty("id", productId);
    expect(typeof product.id).toBe("number");
  });

  it("should return a JSON response for a single product", async () => {
    const productId = 1;
    const res = await request(server).get(`/api/productos/${productId}`);
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body).toHaveProperty("data");
  });
});

describe("PUT /api/productos/:id", () => {
    it('should display validation errors', async () => {
        const productId = 1
        const updatedProduct = {
            name: 'Teclado Mecánico',
            price: '0'
        }
        const res = await request(server).put(`/api/productos/${productId}`).send(updatedProduct)
        expect(res.status).toBe(400)
        expect(res.headers['content-type']).toMatch(/json/)
    })
    it('should update a product and return it', async () => {
        const productId = 1
        const updatedProduct = {
            name: 'Teclado Mecánico - TESTING',
            price: '99.99',
            availability: true
        }
        const res = await request(server).put(`/api/productos/${productId}`).send(updatedProduct)
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.body).toHaveProperty('message', 'Producto actualizado')
        expect(res.body).toHaveProperty('data')
        const product = res.body.data
        expect(product).toHaveProperty('id', productId)
        expect(product).toHaveProperty('name', updatedProduct.name)
        expect(product).toHaveProperty('price', updatedProduct.price)
        expect(product).toHaveProperty('availability', true)
        expect(typeof product.id).toBe('number')
        expect(product.name).toBe(updatedProduct.name)
        expect(product.price).toBe(updatedProduct.price)
        expect(product.availability).toBeTruthy()
    })

});

describe("DELETE /api/productos/:id", () => {
    it('should return a 404 for an invalid ID', async () => {
        const productId = 2000
        const res = await request(server).delete(`/api/productos/${productId}`)
        expect(res.status).toBe(404)
        expect(res.headers['content-type']).toMatch(/json/)
    })
    it('should delete a product and return a message', async () => {
        const productId = 1
        const res = await request(server).delete(`/api/productos/${productId}`)
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.body).toHaveProperty('message', 'Producto eliminado')
    })
});
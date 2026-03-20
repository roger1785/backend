import { expect } from "chai";
import request from "supertest";
import app from "../app.js";

import Category from "../models/Category.js";
import Product from "../models/Product.js";

describe("Products endpoint", function () {
  this.timeout(10000);

  beforeEach(async function () {
    await Category.deleteMany({});

    const category = await Category.create({
      name: "Electronics",
    });

    await Product.deleteMany({});

    await Product.create({
      name: "Mouse",
      price: 80,
      stock: 10,
      category: category._id,
    });
  });

  it("debería tener un status 200 y un array", async function () {
    const res = await request(app).get("/products");

    // console.log(res.status, res.body);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.equal(1);
  });

  // should return products with populated category
  it("Debería popular la categoría en el producto", async function () {
    const res = await request(app).get("/products");

    // console.log(res.body);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.equal(1);

    expect(res.body[0]).to.have.property("category");
    expect(res.body[0].category).to.be.an("object");
    expect(res.body[0].category).to.have.property("name");
    expect(res.body[0].category.name).to.equal("Electronics");
  });

  it("El primer producto tiene que tener nombre", async function () {
    const res = await request(app).get("/products");

    expect(res.body[0]).to.have.property("name");
  });

  it("Debería crear un producto", async function () {
    const category = await Category.findOne({ name: "Electronics" });

    // console.log(category.id, category._id);

    const newProduct = {
      name: "Notebook",
      price: 1000,
      stock: 5,
      category: category.id,
    };

    const res = await request(app).post("/products").send(newProduct);

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("name");
    expect(res.body.name).to.equal("Notebook");
  });

  it("Debería traer un producto por el id", async function () {
    const product = await Product.findOne();

    const res = await request(app).get(`/products/${product.id}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("name");
    expect(res.body.name).to.equal("Mouse");

    expect(res.body).to.have.property("category");
    expect(res.body.category).to.be.an("object");
    expect(res.body.category).to.have.property("name");
    expect(res.body.category.name).to.equal("Electronics");
  });

  it("Debería retornar un error 400 porque el id no es valido", async function () {
    const res = await request(app).get("/products/123");

    expect(res.status).to.equal(400);
  });

  it("Debería retornar 404 si no encuentra un producto por el id", async function () {
    const res = await request(app).get("/products/69b000000000000000000000");

    expect(res.status).to.equal(404);
  });

  it("Debería devolver 422 si falta el nombre", async function () {
    const category = await Category.findOne();

    const newProduct = {
      price: 100,
      stock: 5,
      category: category.id,
    };

    const res = await request(app).post("/products").send(newProduct);

    expect(res.status).to.equal(422);
  });

  it("Debería actualizar un producto", async function () {
    const product = await Product.findOne();

    const updateProduct = {
      name: "Mouse Gammer",
      category: product.category,
    };

    const res = await request(app)
      .put(`/products/${product.id}`)
      .send(updateProduct);

    expect(res.status).to.equal(200);
    expect(res.body.name).to.equal("Mouse Gammer");
  });

  it("Debería borra un producto", async function () {
    const product = await Product.findOne();

    const res = await request(app).delete(`/products/${product.id}`);

    expect(res.status).to.equal(204);
  });

  // 200 - [{...}] con populate de category
  it("Debería traer los productos de una categorías con el populate de category", async function () {
    const category = await Category.findOne({ name: "Electronics" });

    const res = await request(app).get(`/products/category/${category.id}`);

    // console.log(res.body);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");

    expect(res.body.length).to.equal(1);
    expect(res.body[0]).to.have.property("category");
    expect(res.body[0].category).to.be.an("object");
    expect(res.body[0].category.name).to.equal("Electronics");
  });

  // 200 - [] - categoría sin productos
  it("Debería traer un array vacío si la categoría no tiene productos", async function () {
    const category = await Category.create({
      name: "Prueba",
    });

    const res = await request(app).get(`/products/category/${category.id}`);

    // console.log(res.status, res.body);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.equal(0);
  });

  // 400 - id invalid
  it("Debería retornar un error 400 si el id es invalido", async function () {
    const res = await request(app).get(`/products/category/123`);

    expect(res.status).to.equal(400);
  });

  // it("Saber si un producto tiene la categoría Hardware", async function () {
  //   const category = await Category.create({
  //     name: "Hardware",
  //   });

  //   const res = await request(app).get(`/products/category/${category.id}`);

  //   expect(res.body[0].category.name).to.equal("Hardware");
  // });

  it("Saber si un producto tiene la categoría Hardware", async function () {
    const category = await Category.create({
      name: "Hardware",
    });

    await Product.create({
      name: "Teclado",
      price: 80,
      stock: 10,
      category: category.id,
    });

    const res = await request(app).get(`/products/category/${category.id}`);

    // console.log(res.status, res.body);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");

    expect(res.body.length).to.equal(1);
    expect(res.body[0]).to.have.property("category");
    expect(res.body[0].category).to.be.an("object");
    expect(res.body[0].category.name).to.equal("Hardware");
  });
});

import { expect } from "chai";
import request from "supertest";
import app from "../app.js";

describe("Categories endpoint", () => {
  it("debería tener un status 200 y un array", async function () {
    const res = await request(app).get("/categories");

    // console.log(res.status, res.body);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  it("should return name categories ", async function () {
    const res = await request(app).get("/categories");

    expect(res.body[0]).to.have.property("name");
  });

  it("should create a new category and return it with a 201 status", async function () {
    const newCategory = {
      name: "Books",
      description: "All kinds of books",
    };
    const response = await request(app).post("/categories").send(newCategory);

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property("name");
    expect(response.body.name).to.equal("Books");
  });

  it("Debería traer una categoría por el ID", async function () {
    const newCategory = {
      name: "Books",
      description: "All kinds of books",
    };
    const responseCategory = await request(app)
      .post("/categories")
      .send(newCategory);

    expect(responseCategory.status).to.equal(201);
    expect(responseCategory.body).to.have.property("name");
    expect(responseCategory.body.name).to.equal("Books");

    // Test
  });

  it("Debería mostrar una categoría por su id", async function () {
    const newCategory = {
      name: "Categoría",
    //   type: "69b44f1436c7b2402be86f5f",
      description: "Categoría de test",
    };

    const res = await request(app).post("/categories").send(newCategory);

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("name");
    expect(res.body).to.have.property("description");
    expect(res.body.name).to.equal("Categoría");
    expect(res.body.description).to.equal("Categoría de test");

    const response = await request(app).get(`/categories/${res.body._id}`);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("name");
    expect(response.body.name).to.equal("Categoría");
  });
});

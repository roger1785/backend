import { expect } from "chai";
import request from "supertest";
import app from "../app.js";

import User from "../models/User.js";

describe("Auth User", function () {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it("Debería registrar un usuario", async function () {
    const res = await request(app).post("/auth/register").send({
      email: "test@example.com",
      password: "123456",
    });

    expect(res.status).to.equal(201);
  });
});

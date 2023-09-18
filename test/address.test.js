import supertest from "supertest";
import {
  createTestAddress,
  createTestContact,
  createTestUser,
  getTestAddress,
  getTestContact,
  removeAllTestAddress,
  removeAllTestContact,
  removeTestUser,
} from "./test-util.js";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";

describe("POST /api/contacts/:contactId/addresses", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestAddress();
    await removeAllTestContact();
    await removeTestUser();
  });

  it("Should can create new address in contact", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .post("/api/contacts/" + testContact.id + "/addresses")
      .set("Authorization", "test")
      .send({
        street: "test",
        city: "test",
        province: "test",
        country: "test",
        postalCode: "7890",
      });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe("test");
    expect(result.body.data.city).toBe("test");
    expect(result.body.data.province).toBe("test");
    expect(result.body.data.country).toBe("test");
    expect(result.body.data.postalCode).toBe("7890");
  });

  it("Should reject create if request is invalid", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .post("/api/contacts/" + testContact.id + "/addresses")
      .set("Authorization", "test")
      .send({
        street: "test",
        city: "test",
        province: "test",
        country: "",
        postalCode: "",
      });

    logger.info(result.body);

    expect(result.status).toBe(400);
  });

  it("Should reject create if request is invalid", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .post("/api/contacts/" + testContact.id + "/addresses")
      .set("Authorization", "test")
      .send({
        street: "test",
        city: "test",
        province: "test",
        country: "",
        postalCode: "",
      });

    logger.info(result.body);

    expect(result.status).toBe(400);
  });

  it("Should reject create if contact is not found", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .post("/api/contacts/" + (testContact.id + 1) + "/addresses")
      .set("Authorization", "test")
      .send({
        street: "test",
        city: "test",
        province: "test",
        country: "test",
        postalCode: "i0980",
      });

    logger.info(result.body);

    expect(result.status).toBe(404);
  });
});

describe("GET /api/contacts/:contactId/addresses/:addressId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddress();
    await removeAllTestContact();
    await removeTestUser();
  });

  it("Should can get address", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .get("/api/contacts/" + testContact.id + "/addresses/" + testAddress.id)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testAddress.id);
    expect(result.body.data.street).toBe("test");
    expect(result.body.data.city).toBe("test");
    expect(result.body.data.province).toBe("test");
    expect(result.body.data.country).toBe("test");
    expect(result.body.data.postalCode).toBe("7890");
  });

  it("Should reject if address is not found", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .get(
        "/api/contacts/" + testContact.id + "/addresses/" + (testAddress.id + 1)
      )
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("UPDATE /api/contacts/:contactId/addresses/:addressId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddress();
    await removeAllTestContact();
    await removeTestUser();
  });

  it("Should can update address", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id + "/addresses/" + testAddress.id)
      .set("Authorization", "test")
      .send({
        street: "test update",
        city: "test update",
        province: "test update",
        country: "test update",
        postalCode: "i09801",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testAddress.id);
    expect(result.body.data.street).toBe("test update");
    expect(result.body.data.city).toBe("test update");
    expect(result.body.data.province).toBe("test update");
    expect(result.body.data.country).toBe("test update");
    expect(result.body.data.postalCode).toBe("i09801");
  });

  it("Should reject if request is invalid", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id + "/addresses/" + testAddress.id)
      .set("Authorization", "test")
      .send({
        street: "test update",
        city: "test update",
        province: "test update",
        country: "",
        postalCode: "",
      });

    expect(result.status).toBe(400);
  });

  it("Should reject if address is not found", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put(
        "/api/contacts/" + testContact.id + "/addresses/" + (testAddress.id + 1)
      )
      .set("Authorization", "test")
      .send({
        street: "test update",
        city: "test update",
        province: "test update",
        country: "test update",
        postalCode: "i09801",
      });

    expect(result.status).toBe(404);
  });

  it("Should reject if contact is not found", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put(
        "/api/contacts/" + (testContact.id + 1) + "/addresses/" + testAddress.id
      )
      .set("Authorization", "test")
      .send({
        street: "test update",
        city: "test update",
        province: "test update",
        country: "test update",
        postalCode: "i09801",
      });

    expect(result.status).toBe(404);
  });
});

describe("DELETE /api/contacts/:contactId/addresses/:addressId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddress();
    await removeAllTestContact();
    await removeTestUser();
  });

  it("Should can delete address", async () => {
    const testContact = await getTestContact();
    let testAddress = await getTestAddress();

    const result = await supertest(web)
      .delete(
        "/api/contacts/" + testContact.id + "/addresses/" + testAddress.id
      )
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    testAddress = await getTestAddress();
    expect(testAddress).toBeNull();
  });

  it("Should reject delete address if contact is not found", async () => {
    const testContact = await getTestContact();
    let testAddress = await getTestAddress();

    const result = await supertest(web)
      .delete(
        "/api/contacts/" + (testContact.id + 1) + "/addresses/" + testAddress.id
      )
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });

  it("Should reject delete address if address is not found", async () => {
    const testContact = await getTestContact();
    let testAddress = await getTestAddress();

    const result = await supertest(web)
      .delete(
        "/api/contacts/" + testContact.id + "/addresses/" + (testAddress.id + 1)
      )
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("GET /api/contacts/:contactId/address", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddress();
    await removeAllTestContact();
    await removeTestUser();
  });

  it("Should can list addresses", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .get("/api/contacts/" + testContact.id + "/addresses")
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(1);
  });

  it("should reject list if contact is not found", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .get("/api/contacts/" + (testContact.id + 1) + "/addresses")
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

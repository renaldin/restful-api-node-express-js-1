import supertest from "supertest";
import {
  createManyTestContact,
  createTestContact,
  createTestUser,
  getTestContact,
  removeAllTestContact,
  removeTestUser,
} from "./test-util.js";
import { logger } from "../src/application/logging.js";
import { web } from "../src/application/web.js";

describe("POST /api/contacts", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeAllTestContact();
    await removeTestUser();
  });

  it("Should can create new contact", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        firstName: "test",
        lastName: "test",
        email: "test@gmail.com",
        phone: "0898989799898",
      });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.firstName).toBe("test");
    expect(result.body.data.lastName).toBe("test");
    expect(result.body.data.email).toBe("test@gmail.com");
    expect(result.body.data.phone).toBe("0898989799898");
  });

  it("Should reject create if request is invalid", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        firstName: "",
        lastName: "test",
        email: "test",
        phone:
          "089898979989800000000000000000000000000000000000000000000000000000000000",
      });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts/:contactId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContact();
    await removeTestUser();
  });

  it("should can get contact", async () => {
    const testestContact = await getTestContact();

    const result = await supertest(web)
      .get("/api/contacts/" + testestContact.id)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testestContact.id);
    expect(result.body.data.firstName).toBe(testestContact.firstName);
    expect(result.body.data.lastName).toBe(testestContact.lastName);
    expect(result.body.data.email).toBe(testestContact.email);
    expect(result.body.data.phone).toBe(testestContact.phone);
  });

  it("should return 404 if contact id is not found", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .get("/api/contacts/" + (testContact.id + 1))
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(404);
  });
});

describe("UPDATE /api/contacts/:contactId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContact();
    await removeTestUser();
  });

  it("Should can update existing contact", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id)
      .set("Authorization", "test")
      .send({
        firstName: "Renaldi",
        lastName: "Noviandi",
        email: "renaldi@gmail.com",
        phone: "089000",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testContact.id);
    expect(result.body.data.firstName).toBe("Renaldi");
    expect(result.body.data.lastName).toBe("Noviandi");
    expect(result.body.data.email).toBe("renaldi@gmail.com");
    expect(result.body.data.phone).toBe("089000");
  });

  it("Should reject if request update contact is invalid", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id)
      .set("Authorization", "test")
      .send({
        firstName: "",
        lastName: "",
        email: "renald",
        phone: "",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("Should reject update if contact is not found", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .put("/api/contacts/" + (testContact.id + 1))
      .set("Authorization", "test")
      .send({
        firstName: "Renaldi",
        lastName: "Noviandi",
        email: "renaldi@gmail.com",
        phone: "089000",
      });

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});

describe("DELETE /api/contacts/:contactId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContact();
    await removeTestUser();
  });

  it("Should can delete contact", async () => {
    let testContact = await getTestContact();

    const result = await supertest(web)
      .delete("/api/contacts/" + testContact.id)
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    testContact = await getTestContact();
    expect(testContact).toBeNull();
  });

  it("Should reject if request contact is not found", async () => {
    let testContact = await getTestContact();

    const result = await supertest(web)
      .delete("/api/contacts/" + (testContact.id + 1))
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(404);
  });
});

describe("GET /api/contatcs", function () {
  beforeEach(async () => {
    await createTestUser();
    await createManyTestContact();
  });

  afterEach(async () => {
    await removeAllTestContact();
    await removeTestUser();
  });

  it("Should can search without params", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(10);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.totalPage).toBe(2);
    expect(result.body.paging.totalItem).toBe(15);
  });

  it("Should can search to page 2", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .query({
        page: 2,
      })
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(5);
    expect(result.body.paging.page).toBe(2);
    expect(result.body.paging.totalPage).toBe(2);
    expect(result.body.paging.totalItem).toBe(15);
  });

  it("Should can search using name", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .query({
        name: "test1",
      })
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.totalPage).toBe(1);
    expect(result.body.paging.totalItem).toBe(6);
  });

  it("Should can search using email", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .query({
        email: "test1",
      })
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.totalPage).toBe(1);
    expect(result.body.paging.totalItem).toBe(6);
  });

  it("Should can search using phone", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .query({
        phone: "0891234567891",
      })
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.totalPage).toBe(1);
    expect(result.body.paging.totalItem).toBe(6);
  });
});

import { prismaClient } from "../src/application/database.js";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: "test",
    },
  });
};

export const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      username: "test",
      password: await bcrypt.hash("rahasia", 10),
      name: "test",
      token: "test",
    },
  });
};

export const getTestUser = async () => {
  return prismaClient.user.findUnique({
    where: {
      username: "test",
    },
  });
};

export const removeAllTestContact = async () => {
  await prismaClient.contact.deleteMany({
    where: {
      username: "test",
    },
  });
};

export const createTestContact = async () => {
  await prismaClient.contact.create({
    data: {
      username: "test",
      firstName: "test",
      lastName: "test",
      email: "test@gmail.com",
      phone: "089123456789",
    },
  });
};

export const createManyTestContact = async () => {
  for (let i = 0; i < 15; i++) {
    await prismaClient.contact.create({
      data: {
        username: "test",
        firstName: `test${i}`,
        lastName: `test${i}`,
        email: `test${i}@gmail.com`,
        phone: `089123456789${i}`,
      },
    });
  }
};

export const getTestContact = async () => {
  return prismaClient.contact.findFirst({
    where: {
      username: "test",
    },
  });
};

export const removeAllTestAddress = async () => {
  await prismaClient.address.deleteMany({
    where: {
      contact: {
        username: "test",
      },
    },
  });
};

export const createTestAddress = async () => {
  const contact = await getTestContact();

  await prismaClient.address.create({
    data: {
      contactId: contact.id,
      street: "test",
      city: "test",
      province: "test",
      country: "test",
      postalCode: "7890",
    },
  });
};

export const getTestAddress = async () => {
  return prismaClient.address.findFirst({
    where: {
      contact: {
        username: "test",
      },
    },
  });
};

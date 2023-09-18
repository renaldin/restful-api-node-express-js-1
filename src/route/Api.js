import express from "express";
import UserController from "../controller/UserController.js";
import { authMiddleware } from "../middleware/AuthMiddleware.js";
import ContactController from "../controller/ContactController.js";
import AddressController from "../controller/AddressController.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);

// User API
userRouter.get("/api/users/current", UserController.get);
userRouter.patch("/api/users/current", UserController.update);
userRouter.delete("/api/users/logout", UserController.logout);

// Contact API
userRouter.post("/api/contacts", ContactController.create);
userRouter.get("/api/contacts/:contactId", ContactController.get);
userRouter.put("/api/contacts/:contactId", ContactController.update);
userRouter.delete("/api/contacts/:contactId", ContactController.remove);
userRouter.get("/api/contacts", ContactController.search);

// Address API
userRouter.post("/api/contacts/:contactId/addresses", AddressController.create);
userRouter.get(
  "/api/contacts/:contactId/addresses/:addressId",
  AddressController.get
);
userRouter.put(
  "/api/contacts/:contactId/addresses/:addressId",
  AddressController.update
);
userRouter.delete(
  "/api/contacts/:contactId/addresses/:addressId",
  AddressController.remove
);
userRouter.get("/api/contacts/:contactId/addresses", AddressController.list);

export { userRouter };

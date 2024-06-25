const assert = require("assert");
const sinon = require("sinon");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Shop = require("../models/shopModel");
const userController = require("../controllers/userController");

describe("User Controller", function () {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("userRegister", function () {
    this.timeout(10000); // augmente le délai d'attente pour ce test spécifique à 10 secondes

    it("should register a user", async () => {
      const req = {
        body: {
          email: "test@example.com",
          name: "Test User",
          password: "password123",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sandbox.stub(User.prototype, "save").resolves(req.body);
      sandbox.stub(User, "findOne").resolves(null); // simulate no existing user

      await userController.userRegister(req, res);

      assert.strictEqual(res.status.calledWith(201), true);
      assert.deepStrictEqual(res.json.args[0][0], {
        message: "User created: test@example.com",
      });

      User.prototype.save.restore();
      User.findOne.restore();
    });

    it("should not register a user if email is already used", async () => {
      const req = {
        body: {
          email: "test@example.com",
          name: "Test User",
          password: "password123",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sandbox.stub(User, "findOne").resolves(req.body);

      await userController.userRegister(req, res);

      assert.strictEqual(res.status.calledWith(592), true);
      assert.deepStrictEqual(res.json.args[0][0], {
        message: "Adresse Email deja utilisée",
      });

      User.findOne.restore();
    });
  });

  describe("userLogin", function () {
    this.timeout(10000); // augmente le délai d'attente pour ce test spécifique à 10 secondes

    it("should login a user", async () => {
      const req = {
        body: {
          email: "test@example.com",
          password: "password123",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const user = {
        _id: "user_id",
        email: "test@example.com",
        name: "Test User",
        password: await bcrypt.hash("password123", 10),
      };

      sandbox.stub(User, "findOne").resolves(user);
      sandbox.stub(bcrypt, "compare").resolves(true);
      sandbox.stub(jwt, "sign").returns("token");

      await userController.userLogin(req, res);

      assert.strictEqual(res.status.calledWith(200), true);
      assert.deepStrictEqual(res.json.args[0][0], { token: "token" });

      User.findOne.restore();
      bcrypt.compare.restore();
      jwt.sign.restore();
    });

    it("should not login a user if email is not found", async () => {
      const req = {
        body: {
          email: "test@example.com",
          password: "password123",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sandbox.stub(User, "findOne").resolves(null);

      await userController.userLogin(req, res);

      assert.strictEqual(res.status.calledWith(500), true);
      assert.deepStrictEqual(res.json.args[0][0], {
        message: "User not found",
      });

      User.findOne.restore();
    });
  });

  describe("deleteAUser", function () {
    this.timeout(10000); // augmente le délai d'attente pour ce test spécifique à 10 secondes

    it("should delete a user and associated shops", async () => {
      const req = {
        params: {
          id_users: "user_id",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sandbox.stub(User, "findById").resolves({
        _id: "user_id",
        user_shop: ["shop_id1", "shop_id2"],
      });
      sandbox.stub(Shop, "deleteMany").resolves();
      sandbox.stub(User, "findByIdAndDelete").resolves();

      await userController.deleteAUser(req, res);

      assert.strictEqual(res.status.calledWith(202), true);
      assert.deepStrictEqual(res.json.args[0][0], {
        message: "User and associated shops deleted",
      });

      User.findById.restore();
      Shop.deleteMany.restore();
      User.findByIdAndDelete.restore();
    });

    it("should return 404 if user not found", async () => {
      const req = {
        params: {
          id_users: "user_id",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sandbox.stub(User, "findById").resolves(null);

      await userController.deleteAUser(req, res);

      assert.strictEqual(res.status.calledWith(404), true);
      assert.deepStrictEqual(res.json.args[0][0], {
        message: "User not found",
      });

      User.findById.restore();
    });
  });

  describe("updateAUser", function () {
    this.timeout(10000); // augmente le délai d'attente pour ce test spécifique à 10 secondes

    it("should update a user", async () => {
      const req = {
        params: {
          id_users: "user_id",
        },
        body: {
          name: "Updated Name",
          password: "newpassword123",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const user = {
        _id: "user_id",
        email: "test@example.com",
        name: "Updated Name",
        password: await bcrypt.hash("newpassword123", 10),
      };

      sandbox.stub(User, "findByIdAndUpdate").resolves(user);
      sandbox.stub(bcrypt, "hash").resolves(user.password);

      await userController.updateAUser(req, res);

      assert.strictEqual(res.status.calledWith(203), true);
      assert.deepStrictEqual(res.json.args[0][0], user);

      User.findByIdAndUpdate.restore();
      bcrypt.hash.restore();
    });

    it("should return 404 if user not found", async () => {
      const req = {
        params: {
          id_users: "user_id",
        },
        body: {
          name: "Updated Name",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sandbox.stub(User, "findByIdAndUpdate").resolves(null);

      await userController.updateAUser(req, res);

      assert.strictEqual(res.status.calledWith(404), true);
      assert.deepStrictEqual(res.json.args[0][0], {
        message: "User not found",
      });

      User.findByIdAndUpdate.restore();
    });
  });

  describe("listAUsers", function () {
    this.timeout(10000); // augmente le délai d'attente pour ce test spécifique à 10 secondes

    it("should list a user by ID", async () => {
      const req = {
        params: {
          id: "user_id",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const user = {
        _id: "user_id",
        email: "test@example.com",
        name: "Test User",
      };

      sandbox.stub(User, "findById").resolves(user);

      await userController.listAUsers(req, res);

      assert.strictEqual(res.status.calledWith(200), true);
      assert.deepStrictEqual(res.json.args[0][0], user);

      User.findById.restore();
    });

    it("should return 500 if error occurs", async () => {
      const req = {
        params: {
          id: "user_id",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sandbox.stub(User, "findById").throws(new Error("Server error"));

      await userController.listAUsers(req, res);

      assert.strictEqual(res.status.calledWith(500), true);
      assert.deepStrictEqual(res.json.args[0][0], {
        message: "Server error.",
      });

      User.findById.restore();
    });
  });

  describe("getUserById function", function () {
    this.timeout(10000); // augmente le délai d'attente pour ce test spécifique à 10 secondes
    it("should get a user by ID", async () => {
      const userId = "some_user_id";
      const userData = {
        _id: userId,
        email: "test@example.com",
        name: "Test User",
        user_shop: ["shop_id_1", "shop_id_2"],
      };

      // Utilisation de sinon pour simuler le comportement de User.findById()
      sinon.stub(User, "findById").returns({
        populate: sinon.stub().returns(userData),
      });

      const req = { params: { id_users: userId } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await userController.getUserById(req, res);

      sinon.assert.calledOnce(User.findById);
      sinon.assert.calledWith(User.findById, userId);
      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(res.json, userData);

      // Restauration du stub pour éviter les effets de bord
      User.findById.restore();
    });
    it("should throw an error if user is not found", async () => {
      const mockId = "123";

      // Stub de User.findById pour simuler aucun utilisateur trouvé (null)
      sinon.stub(User, "findById").returns({
        populate: sinon.stub().returns(null),
      });
      const req = { params: { id_users: mockId } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await userController.getUserById(req, res);

      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.json, { message: "User not found" });

      // Restaurer le stub original après le test
      User.findById.restore();
    });
    it("should throw an error if database query fails", async () => {
      const mockId = "123"; // Exemple d'ID d'utilisateur pour le test

      // Stub de la méthode findById du modèle User pour lancer une erreur
      sandbox.stub(User, "findById").throws(new Error("Database query failed"));

      const req = {
        params: {
          id_users: mockId, // Utiliser l'ID fictif
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await userController.getUserById(req, res);

      assert.strictEqual(res.status.calledWith(500), true);
      assert.deepStrictEqual(res.json.args[0][0], {
        message: "Server error",
      });

      User.findById.restore();
    });
  });
});

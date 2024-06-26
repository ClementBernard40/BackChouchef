const assert = require("assert");
const sinon = require("sinon");
const Shop = require("../models/shopModel");
const User = require("../models/userModel");
const shopController = require("../controllers/shopController");

describe("Shop Controller", function () {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("createShop", function () {
    it("should create a new shop", async () => {
      const req = {
        params: {
          userId: "user_id",
        },
        body: {
          name: "TestShop",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const userStub = {
        _id: "user_id",
        user_shop: [],
        save: sandbox.stub().resolves(),
      };

      const newShop = new Shop(req.body);
      newShop._id = "shop_id"; // Simulate the _id generated by MongoDB
      sandbox.stub(newShop, "save").resolves(newShop);
      sandbox.stub(User, "findById").resolves(userStub);

      await shopController.createShop(req, res);

      assert.strictEqual(
        res.status.calledWith(201),
        true,
        "Expected res.status to be called with 201"
      );

      const expectedResponse = {
        _id: "shop_id",
        name: "TestShop",
        food_checked: [],
        foods_in_shop: [],
        nb_checked: 0,
        created_at: newShop.created_at,
      };

      const actualResponse = res.json.args[0][0];
      const actualResponseSubset = {
        _id: actualResponse._id.toString(),
        name: actualResponse.name,
        food_checked: actualResponse.food_checked,
        foods_in_shop: actualResponse.foods_in_shop,
        nb_checked: actualResponse.nb_checked,
        created_at: actualResponse.created_at,
      };

      assert.deepStrictEqual(
        actualResponseSubset,
        expectedResponse,
        "Expected res.json to be called with the correct newShop object"
      );
    });

    it("should return 409 if user is not found", async () => {
      const req = {
        params: {
          userId: "non_existing_user_id",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sandbox.stub(User, "findById").resolves(null);

      await shopController.createShop(req, res);

      assert.strictEqual(res.status.calledWith(409), true);
      assert.deepStrictEqual(res.json.args[0][0], {
        message: "Utilisateur non trouvé",
      });
    });
  });

  describe("getShopById", function () {
    it("should get a shop by ID", async () => {
      const req = {
        params: {
          id: "shop_id",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const shop = {
        _id: "shop_id",
        name: "Test Shop",
        foods_in_shop: [],
        food_checked: [],
        nb_checked: 0,
        created_at: new Date(),
      };

      sandbox.stub(Shop, "findById").resolves(shop);

      await shopController.getShopById(req, res);
      console.log(res.status);
      console.log("test");
      assert.strictEqual(res.status.calledWith(200), true);
      assert.deepStrictEqual(res.json.args[0][0], shop);
    });

    it("should return 401 if shop is not found", async () => {
      const req = {
        params: {
          id: "non_existing_shop_id",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sandbox.stub(Shop, "findById").resolves(null);

      await shopController.getShopById(req, res);

      assert.strictEqual(res.status.calledWith(401), true);
      assert.deepStrictEqual(res.json.args[0][0], {
        message: "Shop list not found",
      });
    });
  });

  describe("updateShop", function () {
    it("should update a shop by ID", async () => {
      const req = {
        params: {
          id: "shop_id",
        },
        body: {
          name: "Updated Shop Name",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const updatedShop = {
        _id: "shop_id",
        name: "Updated Shop Name",
        foods_in_shop: [],
        food_checked: [],
        nb_checked: 0,
        created_at: new Date(),
      };

      sandbox.stub(Shop, "findByIdAndUpdate").resolves(updatedShop);

      await shopController.updateShop(req, res);

      assert.strictEqual(res.status.calledWith(200), true);
      assert.deepStrictEqual(res.json.args[0][0], updatedShop);
    });

    it("should return 407 if shop is not found", async () => {
      const req = {
        params: {
          id: "non_existing_shop_id",
        },
        body: {
          name: "Updated Shop Name",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sandbox.stub(Shop, "findByIdAndUpdate").resolves(null);

      await shopController.updateShop(req, res);

      assert.strictEqual(res.status.calledWith(407), true);
      assert.deepStrictEqual(res.json.args[0][0], {
        message: "Shop list not found",
      });
    });
  });

  describe("deleteShop", function () {
    it("should delete a shop by ID", async () => {
      const req = {
        params: {
          id: "shop_id",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sandbox.stub(Shop, "findByIdAndDelete").resolves({});

      await shopController.deleteShop(req, res);

      assert.strictEqual(res.status.calledWith(200), true);
      assert.deepStrictEqual(res.json.args[0][0], {
        message: "Shop list deleted successfully",
      });
    });

    it("should return 404 if shop is not found", async () => {
      const req = {
        params: {
          id: "non_existing_shop_id",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sandbox.stub(Shop, "findByIdAndDelete").resolves(null);

      await shopController.deleteShop(req, res);

      assert.strictEqual(res.status.calledWith(404), true);
      assert.deepStrictEqual(res.json.args[0][0], {
        message: "Shop list not found",
      });
    });
  });

  describe("addFoodToShop", function () {
    it("should add food items to a shop list", async () => {
      const req = {
        params: {
          shopId: "shop_id",
        },
        body: {
          foodNames: ["Pomme", "Banane"],
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const shop = {
        _id: "shop_id",
        name: "liste20",
        foods_in_shop: [],
        save: sandbox.stub().resolves(),
      };

      const foods = [
        { _id: "food_id_1", name: "Pomme" },
        { _id: "food_id_2", name: "Banane" },
      ];

      sandbox.stub(Shop, "findById").resolves(shop);
      sandbox.stub(Shop.prototype, "save").resolves();
      sandbox.stub(Shop, "findOne").callsFake(({ name }) => {
        return foods.find((food) => food.name === name);
      });

      await shopController.addFoodToShop(req, res);

      assert.strictEqual(res.status.calledWith(200), true);
      assert.deepStrictEqual(res.json.args[0][0], shop);
    });
    it("should return 404 if shop is not found", async () => {
      const req = {
        params: {
          shopId: "non_existing_shop_id",
        },
        body: {
          foodNames: ["Apple", "Banana"],
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sandbox.stub(Shop, "findById").resolves(null);

      await shopController.addFoodToShop(req, res);

      assert.strictEqual(res.status.calledWith(404), true);
      assert.deepStrictEqual(res.json.args[0][0], {
        message: "Shop list not found",
      });
    });

    it("should return 404 if food item not found", async () => {
      const req = {
        params: {
          shopId: "shop_id",
        },
        body: {
          foodNames: ["Pomme", "Banane", "Orange"],
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const shop = {
        _id: "shop_id",
        name: "liste20",
        foods_in_shop: [],
        save: sandbox.stub().resolves(),
      };

      const foods = [
        { _id: "food_id_1", name: "Pomme" },
        { _id: "food_id_2", name: "Banane" },
      ];

      sandbox.stub(Shop, "findById").resolves(shop);
      sandbox.stub(Shop.prototype, "save").resolves();
      sandbox.stub(Shop, "findOne").callsFake(({ name }) => {
        return foods.find((food) => food.name === name);
      });

      await shopController.addFoodToShop(req, res);

      assert.strictEqual(res.status.calledWith(404), true);
      assert.deepStrictEqual(res.json.args[0][0], {
        message:
          "Un ou plusieurs éléments n'ont pas été trouvés dans la base de données",
      });
    });
  });
});

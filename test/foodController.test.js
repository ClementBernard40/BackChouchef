const sinon = require("sinon");
const assert = require("assert");
const mongoose = require("mongoose");
const foodController = require("../controllers/foodController");
const Food = require("../models/foodModel");

describe("foodController", () => {
  let sandbox;

  before(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should create a new food item", async () => {
    const req = {
      body: {
        name: "Apple",
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sandbox.stub(Food.prototype, "save").resolves({
      _id: new mongoose.Types.ObjectId(),
      name: "Apple",
      created_at: new Date(),
    });

    await foodController.createFood(req, res);

    assert.strictEqual(res.status.calledWith(201), true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.strictEqual(res.json.args[0][0].name, "Apple");
    assert.ok(res.json.args[0][0].created_at);
  });

  it("should get all food items", async () => {
    const foods = [
      {
        _id: new mongoose.Types.ObjectId(),
        name: "Apple",
        created_at: new Date(),
      },
      {
        _id: new mongoose.Types.ObjectId(),
        name: "Banana",
        created_at: new Date(),
      },
    ];

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sandbox.stub(Food, "find").resolves(foods);

    await foodController.getFoods(req, res);

    assert.strictEqual(res.status.calledWith(200), true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.deepStrictEqual(res.json.args[0][0], foods);
  });

  it("should get a food item by ID", async () => {
    const foodId = new mongoose.Types.ObjectId();
    const food = { _id: foodId, name: "Apple", created_at: new Date() };

    const req = {
      params: {
        id: foodId.toString(),
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sandbox.stub(Food, "findById").resolves(food);

    await foodController.getFoodById(req, res);

    assert.strictEqual(res.status.calledWith(200), true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.deepStrictEqual(res.json.args[0][0], food);
  });

  it("should update a food item by ID", async () => {
    const foodId = new mongoose.Types.ObjectId();
    const updatedFood = {
      _id: foodId,
      name: "Updated Apple",
      created_at: new Date(),
    };

    const req = {
      params: {
        id: foodId.toString(),
      },
      body: {
        name: "Updated Apple",
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sandbox.stub(Food, "findByIdAndUpdate").resolves(updatedFood);

    await foodController.updateFood(req, res);

    assert.strictEqual(res.status.calledWith(200), true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.deepStrictEqual(res.json.args[0][0], updatedFood);
  });

  it("should delete a food item by ID", async () => {
    const foodId = new mongoose.Types.ObjectId();

    const req = {
      params: {
        id: foodId.toString(),
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sandbox.stub(Food, "findByIdAndDelete").resolves({ _id: foodId });

    await foodController.deleteFood(req, res);

    assert.strictEqual(res.status.calledWith(200), true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.deepStrictEqual(res.json.args[0][0], {
      message: "Food item deleted successfully",
    });
  });

  it("should handle errors when creating a food item", async () => {
    const req = {
      body: {
        name: "Apple",
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sandbox.stub(Food.prototype, "save").throws(new Error("Validation error"));

    await foodController.createFood(req, res);

    assert.strictEqual(res.status.calledWith(400), true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.strictEqual(res.json.args[0][0].message, "Validation error");
  });

  it("should handle errors when getting all food items", async () => {
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sandbox.stub(Food, "find").throws(new Error("Database error"));

    await foodController.getFoods(req, res);

    assert.strictEqual(res.status.calledWith(500), true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.strictEqual(res.json.args[0][0].message, "Database error");
  });

  it("should handle errors when getting a food item by ID", async () => {
    const foodId = new mongoose.Types.ObjectId();

    const req = {
      params: {
        id: foodId.toString(),
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sandbox.stub(Food, "findById").throws(new Error("Database error"));

    await foodController.getFoodById(req, res);

    assert.strictEqual(res.status.calledWith(500), true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.strictEqual(res.json.args[0][0].message, "Database error");
  });

  it("should handle errors when updating a food item by ID", async () => {
    const foodId = new mongoose.Types.ObjectId();

    const req = {
      params: {
        id: foodId.toString(),
      },
      body: {
        name: "Updated Apple",
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sandbox.stub(Food, "findByIdAndUpdate").throws(new Error("Database error"));

    await foodController.updateFood(req, res);

    assert.strictEqual(res.status.calledWith(400), true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.strictEqual(res.json.args[0][0].message, "Database error");
  });

  it("should handle errors when deleting a food item by ID", async () => {
    const foodId = new mongoose.Types.ObjectId();

    const req = {
      params: {
        id: foodId.toString(),
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sandbox.stub(Food, "findByIdAndDelete").throws(new Error("Database error"));

    await foodController.deleteFood(req, res);

    assert.strictEqual(res.status.calledWith(500), true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.strictEqual(res.json.args[0][0].message, "Database error");
  });
});

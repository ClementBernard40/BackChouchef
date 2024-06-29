// const assert = require("assert");
// const mongoose = require("mongoose");
// const request = require("supertest");
// const server = require("../app"); // Assurez-vous que c'est bien l'application Express
// const User = require("../models/userModel");
// const bcrypt = require("bcryptjs");

// describe("User Routes", () => {
//   before(async () => {
//     await mongoose.connect(
//       "mongodb+srv://cbernard817:CUUmgirVB2DmOKCW@chouchef.2fmbp28.mongodb.net/?retryWrites=true&w=majority&appName=Chouchef",
//       {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       }
//     );
//   });

//   after(async () => {
//     await mongoose.connection.dropDatabase();
//     await mongoose.connection.close();
//   });

//   describe("POST /users/register", () => {
//     it("should register a new user", (done) => {
//       request(server)
//         .post("/users/register")
//         .send({
//           name: "John Doe",
//           email: "john@example.com",
//           password: "password123",
//         })
//         .expect(201)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert(res.body.message);
//           done();
//         });
//     });

//     it("should not register a user with an existing email", (done) => {
//       const user = new User({
//         name: "John Doe",
//         email: "john@example.com",
//         password: "password123",
//       });
//       user.save(() => {
//         request(server)
//           .post("/users/register")
//           .send({
//             name: "Jane Doe",
//             email: "john@example.com",
//             password: "password123",
//           })
//           .expect(592)
//           .end((err, res) => {
//             if (err) return done(err);
//             assert(res.body.message);
//             done();
//           });
//       });
//     });
//   });

//   describe("POST /users/login", () => {
//     it("should login a user", (done) => {
//       const user = new User({
//         name: "John Doe",
//         email: "john@example.com",
//         password: bcrypt.hashSync("password123", 10),
//       });
//       user.save(() => {
//         request(server)
//           .post("/users/login")
//           .send({
//             email: "john@example.com",
//             password: "password123",
//           })
//           .expect(200)
//           .end((err, res) => {
//             if (err) return done(err);
//             assert(res.body.token);
//             done();
//           });
//       });
//     });

//     it("should not login a user with incorrect credentials", (done) => {
//       request(server)
//         .post("/users/login")
//         .send({
//           email: "john@example.com",
//           password: "wrongpassword",
//         })
//         .expect(401)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert(res.body.message);
//           done();
//         });
//     });
//   });
// });

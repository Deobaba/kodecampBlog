const { describe, it } = require("mocha");
const supertest = require("supertest");
const  app = require("../server");



describe("Register auth/login", function () {
  this.timeout(5000);

  it("It should throw an error: Username must be at least 3 characters", done => {
    supertest(app)
      .post("/user/register")
      .send({
        username: "deo",
        email: "adexsquare@gmail.com",
        password: "incorrect_password",
      })
      .expect(
        {
          error: true,
          message: "Username must be at least 3 characters",
          statusCode: 404,
        },
        (err, res) => {
          done();
        }
      );
  });

  it("It should throw an error: Password must be at least 5 characters", done => {
    supertest(app)
      .post("/user/register")
      .send({
        username: "deo",
        email: "adexsquare@gmail.com",
        password: "incorrect_password",
      })
      .expect(
        {
          error: true,
          message: "Password must be at least 5 characters",
          statusCode:404,
        },
        (err, res) => {
          done();
        }
      );
  });

  it("It should throw Username already exists", done => {
    supertest(app)
      .post("/user/register")
      .send({
        username: "deo",
        email: "adexsquare@gmail.com",
        password: "incorrect_password",
      })
      .expect(
        { error: true, message: "Username already exists", statusCode: 404 },
        () => {
          done();
        }
      );
  });

  it("It should Register successfully", done => {
    supertest(app)
      .post("/user/register")
      .send({
        username: `${Math.random().toString(36).substring(2, 15)}`,
        email: "adexsquare@gmail.com",
        password: "password",
      })
      .expect({statusCode: 200}, () => {
        done();
      });
  });
});

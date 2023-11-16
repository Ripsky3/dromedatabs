const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");

const userOne = {
    username: 'a',
    email: 'a@gmail.com',
    password: "12345678"
}

beforeEach(async () => {
    await User.deleteMany();
    await new User(userOne).save();
})


test("Should sign up new user", async (req, res) => {

    /*await request(app).post("/createuser").send({
        name: 'ab',
        email: 'ab@gmail.com',
        password: "12345678"
    }).expect(201)*/

    const response = await request(app).post("/createuser").send({
        username: 'ab',
        email: 'ab@gmail.com',
        password: "12345678"
    })
    console.log(response.statusCode);
    expect(response.statusCode).toBe(201);
    
})

/*test("Home page should send 200", async (req, res) => {
    await request(app).get("").expect(200)
})*/


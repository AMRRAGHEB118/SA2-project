const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const { DataSource, EntitySchema } = require('typeorm');
const jwt = require('jsonwebtoken');

const User = new EntitySchema({
    name: 'User',
    columns: {
        Id: {
            type: Number,
            primary: true,
            generated: true
        },
        userName: {
            type: String
        },
        Email: {
            type: String
        },
        Password: {
            type: String
        },
        PhoneNumber: {
            type: String
        },
        Role: {
            type: String
        }
    }
})

const myDataSource = new DataSource({
    type: "mariadb",
    host: "user_db",
    port: 3306,
    username: "root",
    password: "example",
    database: "users",
    entities: [User],
    logging: true,
    synchronize: true,
});

myDataSource
    .initialize()
    .then(async (connection) => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });


app.use(morgan('dev'));
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/api/Users', async (req, res) => {
    try {
        let users = await myDataSource.getRepository(User).find();
        users = users.filter(user => user.Role === "Traveler")
        res.send(users)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})


app.post('/api/Users/add', async (req, res) => {
    const { userName, email, password, phoneNumber } = req.body
    try {
        const user = await myDataSource.getRepository(User).findOneBy({ Email: email })
        if (user) {
            res.status(400).json({ error: "User already exists" })
        }

        let newUser = {
            userName: userName,
            Email: email,
            Password: password,
            PhoneNumber: phoneNumber,
            Role: "Traveler"
        }
        const userRepository = myDataSource.getRepository(User);
        newUser = userRepository.create(newUser);
        const response = await userRepository.save(newUser);
        if (!response) {
            res.status(400).json({ error: "User not created" })
        }

        let users = await myDataSource.getRepository(User).find();
        users = users.filter(user => user.Role === "Traveler")
        res.status(201).json(users)
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message })
    }
})



app.post('/api/Users/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await myDataSource.getRepository(User).findOneBy({ Email: email, Password: password })
        if (!user) {
            res.status(400).json({ error: "Invalid email or password" })
        }
        else {
            const payload = {
                Id: user.Id,
                userName: user.userName,
                Email: user.Email,
                phoneNumber: user.PhoneNumber,
                role: user.Role
            }
            const token = jwt.sign(payload, "secret", { expiresIn: '1h', algorithm: 'HS256' })
            res.status(200).json({ token: token, expiration: Math.floor(Date.now() / 1000) + (60 * 60) })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})


app.put('/api/Users/:id', async (req, res) => {
    const { id } = req.params
    const { userName, email, phoneNumber } = req.body
    try {
        const user = await myDataSource.getRepository(User).findOneBy({ Id: id, Role: "Traveler" })
        user.userName = userName
        user.Email = email
        user.PhoneNumber = phoneNumber
        user.Password = "User@123"
        const response = await myDataSource.getRepository(User).save(user)

        if (!response) {
            res.status(400).json({ error: "User not updated" })
        }

        let users = await myDataSource.getRepository(User).find();
        users = users.filter(user => user.Role === "Traveler")
        res.status(201).json(users)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})


app.delete('/api/Users/:id', async (req, res) => {
    const { id } = req.params
    try {
        const response = await myDataSource.getRepository(User).delete({ Id: id, Role: "Traveler" })

        if (!response) {
            res.status(400).json({ error: "User not deleted" })
        }

        let users = await myDataSource.getRepository(User).find();
        users = users.filter(user => user.Role === "Traveler")
        res.status(204).json(users)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

app.listen(8003, () => {
    console.log('Server is running on port 8003');
})
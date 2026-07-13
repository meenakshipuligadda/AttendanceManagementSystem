const express = require('express');
const cors = require('cors');
const app = express();

const db = require('./models');
const userRoutes = require('./routes/userRoutes');
app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);

app.get('/', (req, res) => {
    res.send('API is working');
});

const PORT = 3001;

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);

    await db.sequelize.authenticate();
    console.log('Database connected...');
});
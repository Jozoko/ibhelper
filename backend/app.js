const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const profileRoutes = require('./routes/profile');

const app = express();

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/profile', profileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

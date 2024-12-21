const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

const app = express();

// Middlewares
// app.use(cors());
app.use(cors({
  origin: "https://JigarHingu.github.io/user_management_app",
  credentials: true,
}));
app.use(bodyParser.json());

// Routes
app.use('/api/users', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));

app.get("/", (req, res) => {
res.send("Backend running successfully");
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

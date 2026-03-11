const express = require('express');
const path = require('path');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/uploads', uploadRoutes);

const PORT = 3000;
app.listen(PORT, () => {
	console.log("Server is running on port " + PORT);
})


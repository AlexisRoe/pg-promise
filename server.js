const app = require('./app');
const PORT = process.env.DEFAULT_PORT;

app.listen(PORT, () => console.info(`Server is running on port: ${PORT}`));

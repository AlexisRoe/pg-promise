const app = require("./app");
const PORT = process.env.default_port;

app.listen(PORT, () => console.info(`Server is running on port: ${PORT}`));
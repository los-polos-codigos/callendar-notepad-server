import { app } from "./app.js";

const PORT = 2137;
app.get("/", (req, res) => {});
app.listen(PORT, () => {
  console.log(`Server listen on http://localhost:${PORT}`);
});

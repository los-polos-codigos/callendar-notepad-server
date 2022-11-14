import { app } from "~/app";

const PORT = 2137;

app.get("/", (req, res) => {});
app.listen(PORT, () => {
  console.log(`Server listen on http://localhost:${PORT}`);
});

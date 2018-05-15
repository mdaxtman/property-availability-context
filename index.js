const express = require("express")
const routes = require("./routes")
const app = express();

app.use("/availabilities", routes);

app.all("*", (req, res) => res.status(404).send("not found"));

app.listen(3000, () => console.log('Example app listening on port 3000!'));
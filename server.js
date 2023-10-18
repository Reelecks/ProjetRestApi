import express from "express";
import dotenv from "dotenv";
import utilisateurRouteur from "./routes/routeUtilisateur.js";
import categorieRouteur from "./routes/routeCategorie.js";
import editeurRouteur from "./routes/routeEditeur.js";
import livreRouteur from "./routes/routeLivre.js";
import auteurRouteur from "./routes/routeAuteur.js";
import connection from "./db.js";
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;


connection.connect(err => {
    if (err) throw err;
    console.log('Connecté à la base de données');
});


app.get("/", (req, res) => {
  res.send("server ready");
});

app.use("/utilisateurs", utilisateurRouteur);
app.use("/categories", categorieRouteur);
app.use("/editeurs", editeurRouteur);
app.use("/livres", livreRouteur);
app.use("/auteurs", auteurRouteur);


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

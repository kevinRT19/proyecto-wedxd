const express = require("express");
const app = express();
const port = 3000;
const mysql = require("mysql2/promise");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "districarnes_sv1",
};
app.use(express.static(path.join(__dirname, "login")));
// Verificar la conexión a la base de datos
async function verifyDatabaseConnection() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute("SELECT * FROM `reg_usuarios`");
    console.log("Conexión a la base de datos exitosa");
    await connection.end();
    console.log(rows);
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
}

verifyDatabaseConnection();
// aqui son las peticion de los metodos como el login y el registro que hace la pagina web
app.post("/login", async (req, res) => {
  const { correo, contraseña } = req.body;

  // Verificar que los parámetros no sean undefined
  if (!correo || !contraseña) {
    return res.status(400).send(`
            <script>
                window.onload = () => {
                    alert("Correo y contraseña son requeridos");
                    window.location.href = "/index.html";
                };
            </script>
        `);
  }

  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(
      "SELECT * FROM `reg_usuarios` WHERE correo = ? AND password = ?",
      [correo, contraseña]
    );
    await connection.end();
    if (rows.length > 0) {
      res.status(201).send(`
                <script>
                    window.onload = () => {
                        alert("Usuario registrado, bienvenido");
                        window.location.href = "/beta3.html";
                    };
                </script>
            `);
    } else {
      res.status(401).send(`
                <script>
                    window.onload = () => {
                        alert("Usuario o contraseña incorrecta");
                        window.location.href = "/index.html";
                    };
                </script>
            `);
    }
  } catch (error) {
    console.error("Error en la consulta de login:", error);
    res.status(500).send(`Error en el servidor: ${error.message}`);
  }
});

app.post("/registro", async (req, res) => {
  const { nombre, apellido, correo, contraseña } = req.body;
  if(!nombre || !apellido || !correo || !contraseña){
    return res.status(400).send(`
      <script>
        window.onload = () => {
          alert("Todos los campos son requeridos");
          window.location.href = "/index.html";
        };
      </script>
    `);
    
  }
  try{
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute(
      "INSERT INTO `reg_usuarios` (nombre, apellido, correo, password) VALUES (?, ?, ?, ?)",
      [nombre, apellido, correo, contraseña]);
      await connection.end();
      res.status(201).send(`
        <script>
          window.onload = () => {
            alert("Usuario registrado exitosamente");
            window.location.href = "/index.html";
          };
        </script>
      `
    ); console.log('datos registrados');
  }catch(error){
    console.error("Error en el registro", error);
    res.status(500).send(`Error en el servidor: ${error.message}`);
  }
})

app.get("/usuarios", (req, res) => {
  res.send("Hola mundo");
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
  console.log(`tuta :${__dirname}`);
});

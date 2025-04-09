const dbService = require('./bd/Conexion');
const bcrypt = require('bcrypt');

class UsuarioModelo{
// Crear un nuevo usuario
static async crearUsuarios(doc, name, tel, email, contras) {
    const query = 'INSERT INTO usuarios (documento_identidad, nombre, telefono, correo, contrasena, rol, estado) VALUES (?, ?, ?, ?, ?, ?, ?)';

    try {
      // Generar el hash de la contraseña con bcrypt
      const salto = 10; // Nivel de seguridad de encriptación
      const contra = await bcrypt.hash(contras, salto);

      return await dbService.query(query, [doc, name, tel, email, contra, "Usuario", "Activo"]);
    } catch (err) {
      throw new Error(`Error al crear el usuario: ${err.message}`);
    }
  }

  // Iniciar sesión
  static async iniciarSesion(email, contrasena) {
    const query = 'SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?';

    try {
        const [result] = await dbService.query(query, [email, contrasena]);

        if (!result || result.length === 0) {
            return { error: "Usuario o contraseña incorrectos" };
        }

        // const usuario = result[0];
        // console.log(result);

        return { result }; // Retornamos un objeto con la propiedad 'usuario'
    } catch (error) {
        return { error: 'Error al iniciar sesión: ' + error.message };
    }
}

}

module.exports = UsuarioModelo;
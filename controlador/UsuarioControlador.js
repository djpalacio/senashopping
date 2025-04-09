const modelo = require('../modelo/UsuarioModelo');

class UsuarioControlador{

    // Crear un nuevo usuario
  static async crearUsuario(req, res) {
    const { t1:doc, t2:name, t3:tel, t4:email, t5:contra } = req.body;
    try {
      const result = await modelo.crearUsuarios(doc, name, tel, email, contra);
      res.status(201).json({ mensaje: 'Usuario creado', id: result.insertId });
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al crear el usuario' });
    }
  }


  // Iniciar sesión
  static async iniciarSesion(req, res) {
    const { email, contrasena } = req.body;

    try {
        const usuario = await modelo.iniciarSesion(email, contrasena);
        

        if (usuario.error) {
            return res.status(400).json({ error: usuario.error });
        }
        console.log(usuario.result.nombre);
        res.status(200).json({ mensaje: `Bienvenido ${usuario.result.nombre}` }); // Asumiendo que el objeto tiene la propiedad 'nombre'
    } catch (error) {
        res.status(500).json({ errorcito: error.message });
    }
}



}

module.exports = UsuarioControlador;
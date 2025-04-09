const dbService = require('./bd/Conexion');

class ProductoModelo {
  
  // Crear una nueva categoría
  static async crearCategoria(nombre) {
    const query = 'INSERT INTO categorias (nombre) VALUES (?)';
    try {
      return await dbService.query(query, [nombre]);
    } catch (err) {
      throw new Error(`Error al crear la categoría: ${err.message}`);
    }
  }


// Crear un nuevo producto
  static async crearProducto(nombre, descripcion, precio, categorias_id) {
    const query = 'INSERT INTO productos (nombre, descripcion, precio, categorias_id) VALUES (?, ?, ?, ?)';
    try {
      return await dbService.query(query, [nombre, descripcion, precio, categorias_id]);
    } catch (err) {
      throw new Error(`Error al crear el producto: ${err.message}`);
    }
  }



  // Actualizar el inventario de un producto
  static async actualizarInventario(productos_id, cantidad) {
    const query = `
        INSERT INTO inventario (productos_id, cantidad, ultima_actualizacion) 
        VALUES (?, ?, CURRENT_TIMESTAMP)
        ON DUPLICATE KEY UPDATE cantidad = ?, ultima_actualizacion = CURRENT_TIMESTAMP
    `;
    try {
        return await dbService.query(query, [productos_id, cantidad, cantidad]);
    } catch (err) {
        throw new Error(`Error al actualizar el inventario: ${err.message}`);
    }
}


// Filtrar productos por nombre
static async filtrarPorNombre(nombre) {
  const query = `SELECT * FROM productos WHERE nombre LIKE ?`;
  const valores = [`%${nombre}%`];

  console.log("Consulta SQL:", query, valores); // 📌 Verifica la consulta en la terminal

  try {
    // Usando dbService.query con async/await
    const resultados = await dbService.query(query, valores);
    return resultados;
  } catch (err) {
    console.error("Error en la consulta:", err);
    throw new Error(`Error al filtrar productos: ${err.message}`);
  }
}


// filtrar productos por cateoria 

static async filtrarPorCategoria(nombreCategoria) {
  const query = `
      SELECT p.productos_id,
             p.nombre AS nombre_producto,
             p.descripcion,
             p.precio,
             c.nombre AS categoria
      FROM productos p
      JOIN categorias c ON p.categorias_id = c.categorias_id
      WHERE c.nombre LIKE ?;
  `;

  const valores = [`%${nombreCategoria}%`];

  try {
      return await dbService.query(query, valores);
  } catch (err) {
      throw new Error(`Error al filtrar productos por categoría: ${err.message}`);
  }
}


// agregar reseña a un producto
static async agregarResena(usuarios_id, productos_id, resena, calificacion) {
  const query = `
      INSERT INTO resenas (usuarios_id, productos_id, resena, calificacion, fecha)
      VALUES (?, ?, ?, ?, NOW())
  `;

  const valores = [usuarios_id, productos_id, resena, calificacion];

  try {
      return await dbService.query(query, valores);
  } catch (err) {
      throw new Error(`Error al agregar reseña: ${err.message}`);
  }
}

// mostrar reseñas por el nombre del producto

static async obtenerResenasPorNombreProducto(nombreProducto) {
  const query = `
      SELECT r.resenas_id, r.resena, r.calificacion, r.fecha, u.nombre AS usuario, p.nombre AS nombre_producto
      FROM resenas r
      JOIN usuarios u ON r.usuarios_id = u.usuarios_id
      JOIN productos p ON r.productos_id = p.productos_id
      WHERE p.nombre LIKE ?
      ORDER BY r.fecha DESC
  `;
  const valores = [`%${nombreProducto}%`];

  try {
      return await dbService.query(query, valores);
  } catch (err) {
      throw new Error(`Error al obtener reseñas por nombre de producto: ${err.message}`);
  }
}


}

module.exports = ProductoModelo;

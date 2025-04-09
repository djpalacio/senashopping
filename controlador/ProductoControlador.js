const modelo = require('../modelo/ProductoModelo');

class ProductoControlador {

  // Crear una nueva categoría
  static async crearCategoria(req, res) {
    const { nombre } = req.body;
    try {
      const result = await modelo.crearCategoria(nombre);
      res.status(201).json({ mensaje: 'Categoría creada', id: result.insertId });
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al crear la categoría' });
    }
  }


  // Crear un nuevo producto
  static async crearProducto(req, res) {
    const { nombre, descripcion, precio, categorias_id } = req.body;
    try {
      const result = await modelo.crearProducto(nombre, descripcion, precio, categorias_id);
      res.status(201).json({ mensaje: 'Producto creado', id: result.insertId });
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al crear el producto' });
    }
  }

  // Actualizar el inventario de un producto
  static async actualizarInventario(req, res) {
    const { productos_id, cantidad } = req.body;
  try {
      const result = await modelo.actualizarInventario(productos_id, cantidad);
      res.status(200).json({ mensaje: 'Inventario actualizado', id: result.insertId });
  } catch (err) {
      res.status(500).json({ error: 'Hubo un error al actualizar el inventario' });
  }
}

// Filtrar productos por nombre
static async filtrarPorNombre(req, res) {
  let { nombre } = req.query;

  nombre = nombre.trim(); // Elimina espacios y saltos de línea

  try {
    if (!nombre) {
      return res.status(400).json({ error: "Debes proporcionar un nombre para filtrar" });
    }

    const productos = await modelo.filtrarPorNombre(nombre);

    if (productos.length === 0) {
      return res.status(404).json({ mensaje: "No se encontraron productos con ese nombre" });
    }

    res.json(productos);
  } catch (error) {
    console.error("Error en filtrarPorNombre:", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
}

// Filtrar productos por categoría

static async filtrarPorCategoria(req, res) {
  const { categoria } = req.query;

  if (!categoria) {
      return res.status(400).json({ error: 'Debes proporcionar una categoría para filtrar' });
  }

  try {
      const productos = await modelo.filtrarPorCategoria(categoria);

      if (productos.length === 0) {
          return res.status(404).json({ mensaje: 'No se encontraron productos en esa categoría' });
      }

      res.json(productos);
  } catch (error) {
      console.error("Error en filtrarPorCategoria:", error);
      res.status(500).json({ error: 'Error al obtener los productos por categoría' });
  }
}


// agregar reseña a un producto

static async agregarResena(req, res) {
  const { usuarios_id, productos_id, resena, calificacion } = req.body;

  if (!usuarios_id || !productos_id || !resena || !calificacion) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
      await modelo.agregarResena(usuarios_id, productos_id, resena, calificacion);
      res.status(201).json({ mensaje: 'Reseña agregada correctamente' });
  } catch (error) {
      console.error("Error al agregar reseña:", error);
      res.status(500).json({ error: 'Error al agregar la reseña' });
  }
}


// mostrar reseñas por nombre de producto

static async obtenerResenasPorNombreProducto(req, res) {
  const { nombre } = req.query;

  try {
      if (!nombre) {
          return res.status(400).json({ error: "Debes proporcionar un nombre de producto" });
      }

      const resenas = await modelo.obtenerResenasPorNombreProducto(nombre);

      if (resenas.length === 0) {
          return res.status(404).json({ mensaje: 'No se encontraron reseñas para ese producto' });
      }

      res.status(200).json(resenas);
  } catch (error) {
      console.error("Error al obtener reseñas:", error);
      res.status(500).json({ error: 'Error al obtener reseñas' });
  }
}







}

module.exports = ProductoControlador;

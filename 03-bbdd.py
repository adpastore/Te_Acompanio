
#--------------------------------------------------------------------
# Instalar con pip install Flask
from flask import Flask, request, jsonify
from flask import request
# Instalar con pip install flask-cors
from flask_cors import CORS
# Instalar con pip install mysql-connector-python
import mysql.connector
# Si es necesario, pip install Werkzeug
from werkzeug.utils import secure_filename
# No es necesario instalar, es parte del sistema standard de Python
import os
import time
#--------------------------------------------------------------------
app = Flask(__name__)
CORS(app) # Esto habilitará CORS para todas las rutas



class Catalogo:
    def __init__(self, host, user, password, database):
        self.conn = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            database=database
    )
        self.cursor = self.conn.cursor(dictionary=True)

        # Intentamos seleccionar la base de datos
        try:
            self.cursor.execute(f"USE {database}")
        except mysql.connector.Error as err:
        # Si la base de datos no existe, la creamos
            if err.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR:
                self.cursor.execute(f"CREATE DATABASE {database}")
                self.conn.database = database
            else:
                raise err

        # Una vez que la base de datos está establecida, creamos la tabla si no existe
        self.cursor.execute('''CREATE TABLE IF NOT EXISTS productos (
            codigo INT,
            descripcion VARCHAR(255) NOT NULL,
            cantidad INT NOT NULL,
            precio DECIMAL(10, 2) NOT NULL,
            imagen_url VARCHAR(255),
            proveedor INT)''')
        self.conn.commit()    

        # Cerrar el cursor inicial y abrir uno nuevo con el parámetro
        dictionary=True
        self.cursor.close()
        self.cursor = self.conn.cursor(dictionary=True)


    def agregar_producto(self, codigo, descripcion, cantidad, precio,
imagen, proveedor):
        self.cursor.execute(f"SELECT * FROM productos WHERE codigo ={codigo}")
        producto_existe = self.cursor.fetchone()
        if producto_existe:
            return False
        sql = f"INSERT INTO productos (codigo, descripcion, cantidad,precio, imagen_url, proveedor) VALUES ({codigo},'{descripcion}',{cantidad}, {precio}, '{imagen}', {proveedor})"
        self.cursor.execute(sql)
        self.conn.commit()
        return True
    def consultar_producto(self, codigo):
    # Consultamos un producto a partir de su código
        self.cursor.execute(f"SELECT * FROM productos WHERE codigo = {codigo}")
        return self.cursor.fetchone()
    
    def modificar_producto(self, codigo, nueva_descripcion,nueva_cantidad, nuevo_precio, nueva_imagen, nuevo_proveedor):
        sql = f"UPDATE productos SET descripcion = '{nueva_descripcion}', cantidad = {nueva_cantidad}, precio = {nuevo_precio}, imagen_url ='{nueva_imagen}', proveedor = {nuevo_proveedor} WHERE codigo = {codigo}"
        self.cursor.execute(sql)
        self.conn.commit()
        return self.cursor.rowcount > 0
    def mostrar_producto(self, codigo):
        # Mostramos los datos de un producto a partir de su código
        producto = self.consultar_producto(codigo)
        if producto:
            print("-" * 40)
            print(f"Código.....: {producto['codigo']}")
            print(f"Descripción: {producto['descripcion']}")
            print(f"Cantidad...: {producto['cantidad']}")
            print(f"Precio.....: {producto['precio']}")
            print(f"Imagen.....: {producto['imagen_url']}")
            print(f"Proveedor..: {producto['proveedor']}")
            print("-" * 40)
        else:
            print("Producto no encontrado.")

    def listar_productos(self):
        # Mostramos en pantalla un listado de todos los productos en la tabla
        self.cursor.execute("SELECT * FROM productos")
        productos = self.cursor.fetchall()
        print("-" * 40)
        for producto in productos:
            print(f"Código.....: {producto['codigo']}")
            print(f"Descripción: {producto['descripcion']}")
            print(f"Cantidad...: {producto['cantidad']}")
            print(f"Precio.....: {producto['precio']}")
            print(f"Imagen.....: {producto['imagen_url']}")
            print(f"Proveedor..: {producto['proveedor']}")
            print("-" * 40)
    def eliminar_producto(self, codigo):
        # Eliminamos un producto de la tabla a partir de su código
        self.cursor.execute(f"DELETE FROM productos WHERE codigo = {codigo}")
        self.conn.commit()
        return self.cursor.rowcount > 0            


# Programa principal
#catalogo = Catalogo(host='localhost', user='root', password='',
#database='miapp')
# Agregamos productos a la tabla
#catalogo.agregar_producto(1, 'Teclado USB 101 teclas', 10, 4500,
#'teclado.jpg', 101)
#catalogo.agregar_producto(2, 'Mouse USB 3 botones', 5, 2500, 'mouse.jpg',
#102)
# Consultamos un producto y lo mostramos
#producto = catalogo.consultar_producto(cod_prod)
#if producto:
#         print(f"Producto encontrado: {producto['codigo']} - {producto['descripcion']}")
#else:
#       print(f'Producto {cod_prod} no encontrado.')
# Listamos todos los productos
#catalogo.listar_productos()
# Eliminamos un producto
#catalogo.eliminar_producto(2)
#catalogo.listar_productos()


#--------------------------------------------------------------------
# Cuerpo del programa
#--------------------------------------------------------------------
# Crear una instancia de la clase Catalogo
catalogo = Catalogo(host='localhost', user='root', password='', database='miapp')
# Carpeta para guardar las imagenes
ruta_destino = 'static/img/'




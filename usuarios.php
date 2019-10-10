<?php
class Usuario{
    //Conexion con la bd y nombre de la tabla

    private $conexion;
    private $tabla ='usuario';

    // Columnas

    public $id;
    public $nombre;
    public $apellidos;
    public $telefono;
    public $admin;
    public $correo_electronico;
    public $contrasena;
    public $direccion;

    //Contructor

    public function __construct($conexion){
        $this->conexion = $conexion;
    }

    //Leer todos los usuarios
    public function todos(){
        $consulta = "SELECT * FROM ".$this->tabla;
        $resultado = $this->conexion->query($consulta);
        return $resultado;
    }
}
?>
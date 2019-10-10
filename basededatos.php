<?php
class BaseDatos{

    private $host = 'localhost';
    private $usuario = 'root';
    private $contrasena = '';
    private $nombre = 'tienda';
    
    public $conexion;

    public function getConexion(){
        $this->conexion = new mysqli($this->host, $this->usuario, $this->contrasena, $this->nombre);

        if(!$this->conexion->connect_error){
            echo "Error, la conexión ha fallado".$this->conexion->connect_error;
            exit;
        }

        return $this->conexion;
    }
}
?>
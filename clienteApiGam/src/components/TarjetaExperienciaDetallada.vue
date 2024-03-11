<template>
  <div class="contenidoTarjetaDetallada">
    <div class="tarjetaExperienciaDetallada">
      <div class="datosExperiencia">
        <h2 class="tituloExperienciaDetallada ">Detalle Experiencia</h2>
        <p>TITULO: <span class="mayuscula">{{ experiencia.titulo_experiencia }}</span></p>
        <p>DESCRIPCION: <span class="mayuscula">{{ experiencia.descripcion_experiencia }}</span></p>
        <p>FECHA: <span class="mayuscula">{{ fechaFormateada }}</span></p>
        <p>COSTE ESTIMADO: <span class="mayuscula">{{ experiencia.coste_estimado }}</span> €</p>
        <p>PUNTO DE PARTIDA: <span class="mayuscula">{{ experiencia.lugar_partida }}</span></p>
        <p>EXPERIENCIA DE TIPO <span class="mayuscula">{{ experiencia.nombre_tipo }}</span></p>
        <p>DESCRIPCION DE TIPO <span class="mayuscula">{{ experiencia.nombre_tipo }}: {{ experiencia.estilo }}, {{ experiencia.lugares_interes }}</span></p>
      </div>
      <div class="datosUsuario">
        <h2 class="tituloExperienciaDetallada">Detalle Usuario</h2>
        <div class="avatar">
          <img src="../../public/avatar.jpeg" alt="Imagen avatar">
        </div>
        <p>NOMBRE: <span class="mayuscula">{{ usuario.nombre_usuario }}</span></p>
        <p>APELLIDOS: <span class="mayuscula">{{ usuario.apellidos }}</span></p>
        <p>EDAD: <span class="mayuscula">{{ calcularEdad(usuario.fecha_nacimiento) }} años.</span></p>
        <p class="sobremi">DOBRE MI: <span class="mayuscula">{{ usuario.sobremi }}</span></p>
      </div>
      <button class="botonDetallada1" @click="volver">Volver</button>
      <button class="botonDetallada2" @click="reservarExperiencia">Reservar Experiencia</button> 
    </div>    
  </div> 
</template>

<script setup>
import { defineProps, computed } from 'vue';
import axios from 'axios';
import * as dniService from '@/services/dniService';
import router from '@/router';

const props = defineProps(['experiencia', 'usuario']);
const fechaFormateada = computed(() => {
  const fecha = new Date(props.experiencia.fecha_experiencia);
  const dia = fecha.getDate().toString().padStart(2, '0');
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const anio = fecha.getFullYear();
  return `${dia}-${mes}-${anio}`;
});
const volver = () =>{
  router.push('/muro');
}
const reservarExperiencia = async () =>{
  try {
    const citaResponse = await axios.post('http://127.0.0.1:8000/crear-cita', {
      dni_consumidor: dniService.getDni(),
      dni_proveedor: props.experiencia.dni_proveedor,
      id_experiencia: props.experiencia.id_experiencia,
    });
    if (citaResponse.status === 201) {
      router.push({ name: 'confirmacion-reserva', query: { idExp: props.experiencia.id_experiencia } }); 
    } else {
      console.error('Error al registrar la experiencia');
    }

  } catch (error) {
    console.error('Error en la petición de localidad:', error);
  }
}
const calcularEdad = (fechaNacimiento) => {
  const fechaNac = new Date(fechaNacimiento);
  const ahora = new Date();

  let edad = ahora.getFullYear() - fechaNac.getFullYear();
  const mesAhora = ahora.getMonth() + 1;
  const mesNac = fechaNac.getMonth() + 1;

  if (mesAhora < mesNac || (mesAhora === mesNac && ahora.getDate() < fechaNac.getDate())) {
    edad--;
  }

  return edad;
};
</script>

<style scoped>
.contenidoTarjetaDetallada{
  background-color: #5ce1c6;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 5%;
  padding-bottom: 5%;
}
.tarjetaExperienciaDetallada{
  width: 80%;
  background-color: white;
  border: solid black 20px;
  border-radius: 50px;
  display: grid;
  grid-template-columns: 50% 50%;
  padding: 0% 2% 2% 2%;
}
.datosExperiencia p{
  font-weight: bold;
}
.datosExperiencia p span{
  font-weight: 400;
}
.datosUsuario p{
  font-weight: bold;
}
.datosUsuario p span{
  font-weight: 400;
}
.mayuscula{
  text-transform: capitalize;
}
.avatar{
  float: right;
  border-radius: 50px;
  border: solid black 20px;
  overflow: hidden;
}
.tituloExperienciaDetallada{
  text-align: center;
  font-size: 2em;
  margin: 0% 0% 8% 0%;
  transform: rotate(-10deg); 
  background-color: #ffde59;
  border: black solid 10px;
  border-radius: 25px;
  width: 50%;
}
.botonDetallada1{
  padding: 1%;
  font-weight: bold;
  text-align: center;
  font-size: 1.5em;
  margin: 0% 0% 8% 0%; 
  transform: rotate(-2deg); 
  background-color: #5271ff;
  border: black solid 10px;
  border-radius: 25px;
  width: 50%;
}
.botonDetallada2{
  font-weight: bold;
  text-align: center;
  font-size: 1.5em;
  margin: 0% 0% 8% 0%; 
  transform: rotate(-10deg); 
  background-color: #ff5757;
  border: black solid 10px;
  border-radius: 25px;
  width: 50%;
}
@media (max-width: 768px) {
  .tarjetaExperienciaDetallada{
    grid-template-columns: auto;
  }
}
</style>

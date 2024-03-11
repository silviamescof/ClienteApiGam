<template>
  <div class="registro-container">
    <form @submit.prevent="registrarExperiencia">
      <fieldset>
        <legend class="legendRegistro">Datos de la experiencia</legend>
        <div class="form-group">
        <input class="input" type="text" id="titulo_experiencia" v-model="titulo" required placeholder="Titulo de la experiencia"/>
      </div>

      <div class="form-group">
        <input class="input" type="text" id="descripcion_experiencia" v-model="descripcion" required placeholder="Descripcion de la experiencia" />
      </div>
      <div class="form-group">
        <input class="input" type="text" id="lugar_partida" v-model="lugar" required placeholder="Lugar de partida"/>
      </div>
      <div class="form-group">
        <input class="input" type="number" id="coste_estimado" v-model="coste" required placeholder="Coste estimado"/>
      </div>

      <div class="form-group">
        <input class="input" type="date" id="fecha_experiencia" v-model="fecha" required placeholder="Fecha de la experiencia"/>
      </div>

      <select v-model="tipoExperiencia" name="tipoExperiencia" id="tipoExperiencia2" class="selectTipoExperiencia">
        <option value="" disabled selected>Tipo de experiencia</option>
        <option v-for="experiencia in tiposDeExperiencia" :key="experiencia.id_tipo_experiencia" :value="experiencia.id_tipo_experiencia">
          {{ experiencia.nombre_tipo }}
        </option>
      </select>

      
      </fieldset>
      <fieldset>
        <legend class="legendRegistro">Datos del lugar</legend>
        <div class="form-group">
        <input class="input" type="text" id="codigo_postal_usuario" v-model="codigoPostalExperiencia" required placeholder="Codigo Postal"/>
        </div>

        <div class="form-group">
          <input class="input" type="text" id="nombre_localidad" v-model="nombreLocalidad" required placeholder="Localidad"/>
        </div>

        <div class="form-group">
          <input class="input" type="text" id="provincia_localidad" v-model="provinciaLocalidad" required placeholder="Provincia"/>
        </div>

        <div class="form-group">
          <input class="input" type="text" id="pais_localidad" v-model="paisLocalidad" required placeholder="País"/>
        </div>
      </fieldset>
      <button class="inputSubmit" type="submit">Publicar Experiencia</button>
      <button class="volver" @click="volver">Volver</button>
    </form>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import * as dniService from '@/services/dniService';

const router = useRouter();
const tiposDeExperiencia = ref([]); 

const titulo = ref('');
const descripcion = ref('');
const lugar = ref('');
const coste = ref('');
const fecha = ref('');
const tipoExperiencia = ref('');
const codigoPostalExperiencia = ref('');
const nombreLocalidad = ref('');
const provinciaLocalidad = ref('');
const paisLocalidad = ref('');
const dniProveedor = ref('');

const volver = ()=>{
  router.push('/muro');
};
const obtenerTiposExperiencia = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/consultar-tipos-experiencias`);
    if (response.status === 200) {
      console.log(response.data.tipos_experiencias);
      tiposDeExperiencia.value = response.data.tipos_experiencias; 
    } else {
      console.error('Error en la peticion de experiencias');
    }
  } catch (error) {
    console.error('Error en la petición:', error);
  }
};

const registrarExperiencia = async () => {
  try {
    // 1. Registrar la localidad
    const localidadResponse = await axios.post('http://127.0.0.1:8000/insertar-localidad', {
      codigo_postal: codigoPostalExperiencia.value,
      nombre_localidad: nombreLocalidad.value,
      provincia_localidad: provinciaLocalidad.value,
      pais_localidad: paisLocalidad.value,
    });

    if (localidadResponse.status === 200) {
      // 2. Si la localidad se registró correctamente, registrar la experiencia
      try {
        const fechaFormateada = new Date(fecha.value).toISOString().split('T')[0];
        

        const experienciaResponse = await axios.post('http://127.0.0.1:8000/insertar-experiencia', {
          titulo_experiencia: titulo.value,
          descripcion_experiencia: descripcion.value,
          lugar_partida: lugar.value,
          coste_estimado: coste.value,
          fecha_experiencia: fechaFormateada,
          tipo_experiencia: tipoExperiencia.value,
          codigo_postal_experiencia: codigoPostalExperiencia.value,
          dni_proveedor: dniProveedor.value,
        });

        if (experienciaResponse.status === 201) {
          // La experiencia se registró correctamente, puedes hacer algo aquí si lo necesitas
          router.push('/muro'); // Redirigir a la página principal después del registro exitoso
        } else {
          console.error('Error al registrar la experiencia');
        }
      } catch (error) {
        console.error('Error en la petición de experiencia:', error);
      }
    } else {
      console.error('Error al registrar la localidad');
    }
  } catch (error) {
    console.error('Error en la petición de localidad:', error);
  }
};


onMounted(() => {
  if(dniService.getDni()==""){
      router.push('/');
    }
  obtenerTiposExperiencia();
  dniProveedor.value = dniService.getDni();
  console.log(dniProveedor.value);
});
</script>

<style>
.registro-container{
  font-size: 2em;
  padding-bottom: 10%;
}
button{
  font-family: "Nerko One", cursive;
  font-size: 1.3em;

}
#tipoExperiencia2{
  margin: 1%;
  width: 68%;
  padding: 1%;
  border-radius: 25px;
  border: solid 5px black;
  margin-right: 13%;
  
}
::placeholder{
  font-family: "Nerko One", cursive;
  font-size: 1.3em;
  color: black;
}
</style>
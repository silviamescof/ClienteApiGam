<template>
  <div class="registro-container">
    <form @submit.prevent="registroUsuario">
      <fieldset>
        <legend class="legendRegistro">Registro de usuario</legend>
        <div class="form-group">
        <input class="input" type="text" id="dni" v-model="dni" required placeholder="DNI" pattern="^\d{8}[A-Z]$"/>
      </div>

      <div class="form-group">
        <input class="input" type="text" id="nombre_usuario" v-model="nombreUsuario" required placeholder="Nombre" />
      </div>
      <div class="form-group">
        <input class="input" type="text" id="apellidos" v-model="apellidos" required placeholder="Apellidos"/>
      </div>
      <div class="form-group">
        <input class="input" type="password" id="password" v-model="password" required placeholder="Contraseña"/>
      </div>

      <div class="form-group">
        <input class="input" type="date" id="fecha_nacimiento" v-model="fechaNacimiento" required placeholder="Fecha de nacimiento"/>
      </div>

      <div class="form-group">
        <textarea class="input" id="sobremi" v-model="sobremi" required placeholder="Sobre mí"></textarea>
      </div>

      <div class="form-group">
        <input class="input" type="text" id="direccion" v-model="direccion" required placeholder="Dirección Completa"/>
      </div>
      <div class="form-group">
        <input class="input" type="text" id="telefono" v-model="telefono" pattern="^[679]\d{8}$" placeholder="Teléfono de contacto"/>
      </div>

      <div class="form-group">
        <input class="input" type="email" id="email" v-model="email" required placeholder="email" />
      </div>
      </fieldset>
      <fieldset>
        <legend class="legendRegistro">Registro de Localidad</legend>
        <div class="form-group">
        <input class="input" type="text" id="codigo_postal_usuario" v-model="codigoPostalUsuario" required placeholder="Codigo Postal"/>
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
      <button class="inputSubmit" type="submit">Registrarse</button>
      <button class="volver" @click="volver">Volver</button>
    </form>
  </div>
</template>

<script setup>

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import * as urlService from '.././services/urlService';


const router = useRouter();


const dni = ref('');
const nombreUsuario = ref('');
const apellidos = ref('');
const password = ref('');
const fechaNacimiento = ref('');
const sobremi = ref('');
const direccion = ref('');
const telefono = ref('');
const email = ref('');

const codigoPostalUsuario = ref('');
const nombreLocalidad = ref('');
const provinciaLocalidad = ref('');
const paisLocalidad = ref('');

  const volver = ()=>{
    router.push('/');
  }
  const registroUsuario = async () => {
    try {
    const localidadResponse = await axios.post(`${urlService.getUrl()}/insertar-localidad`, {
      codigo_postal: codigoPostalUsuario.value,
      nombre_localidad: nombreLocalidad.value,
      provincia_localidad: provinciaLocalidad.value,
      pais_localidad: paisLocalidad.value,
    });

    if (localidadResponse.status === 200) {
    
      try {
    // Realizar la petición para registrar al usuario
        const fechaFormateada = new Date(fechaNacimiento.value).toISOString().split('T')[0];
        console.log(fechaFormateada);
        const usuarioResponse = await axios.post(`${urlService.getUrl()}/crear-usuario`, {
          dni: dni.value,
          nombre_usuario: nombreUsuario.value,
          password: password.value,
          fecha_nacimiento: fechaFormateada,
          sobremi: sobremi.value,
          apellidos: apellidos.value,
          direccion: direccion.value,
          codigo_postal_usuario: codigoPostalUsuario.value,
          telefono: telefono.value,
          email: email.value,
        });

        if (usuarioResponse.status === 201) {
          toast.success("El usuario ha sido registrado con éxito", {
        autoClose: 3000,
      });
          // El usuario se registró correctamente, redirigir a la página de inicio de sesión
          router.push({name: 'login', query: { registrado: true }});
        } else {
          console.error('Error al registrar el usuario');
          toast.error("El usuario ya está registrado, solo inicia sesion", {
        autoClose: 3000,
      });
        }
      } catch (error) {
        console.error('Error en la petición:', error);
      }
      console.log("localidad bien, error en usuario");
      toast.error("El usuario ya está registrado, solo inicia sesion", {
        autoClose: 3000,
      });
    } else {
      console.error('Error al registrar la localidad');

    }
  } catch (error) {
    console.error('Error en la petición:', error);
  }
};

</script>

<style>
.registro-container{
  width: 100%;
  display: flex;
  flex-direction: column;   
  align-items: center;
  background-color: #8c52ff;
  padding-bottom: 2%;
}
.form-group, h2, form{
  width: 80%;
}
form{
  width: 80%;
  background-color: white;
  display: grid;
  grid-template-columns: 50% 50%;
  padding-top: 2%;
  padding-left: 4%;
  border: solid 5px black;
  border-radius: 15px;
  margin-top: 2%;
}
fieldset{
  width: 90%;
  display: flex;
  flex-direction: column;   
  align-items: center;
  padding: 5% 0% 5% 0%;
}
textarea{
  margin-top: 1%;
  width: 60%;
  padding: 1%;
  border-radius: 25px;
  border: solid 5px black;
}
.input{
  width: 80%;
}
.tituloRegistro{
  text-align: center;
}
.legendRegistro{
  padding: 3%;
  border: solid black 5px;
  border-radius: 25px;
  transform: rotate(-25deg); 
  background-color: #5271ff;
}
.inputSubmit{
  padding: 3%;
  border: solid black 5px;
  border-radius: 25px;
  margin: 5% 2% 5% 30%;
  background-color: #ffde59;
}
.volver{
  padding: 3%;
  border: solid black 5px;
  border-radius: 25px;
  margin: 5% 30% 5% 2%;
  background-color: #c1ff72;
}
@media (max-width: 768px) {
    form{
        grid-template-columns: auto;
    }
    
}
</style>

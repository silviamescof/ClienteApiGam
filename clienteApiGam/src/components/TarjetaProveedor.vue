<template>
    <div class="tarjetaConfirmacion">
        <div class="contenedorCerrar" @click="volverAlMuro">
            <img src="../../public/cerrar.jpeg" alt="logo de cerrar">
        </div>
        <div class="capa">
            <div class="notaUsuario">
        <p>
          ¡IMPORTANTE! Asegúrate de anotar correctamente los datos del organizador antes de cerrar esta ventana.
          <br />
          ¡IMPORTANTE! Si por algún motivo se tuviese que cancelar la cita, debes avisar al organizador para que pueda volver a publicar su anuncio.
          <br />
          ¡Gracias! ¡Que disfrutéis de la experiencia!
        </p>
      </div>
      <div class="datosDeContacto">
        <p>NOMBRE: <span>{{ props.proveedor.nombre_usuario }}</span></p>
        <p>APELLIDO: <span> {{ props.proveedor.apellidos}}</span></p>
        <p>TELEFONO: <span>{{ props.proveedor.telefono }}</span></p>
        <p>EMAIL: <span>{{ props.proveedor.email }}</span></p>
      </div>
        </div>
      
    </div>
  </template>
  
  <script setup>
  import router from '@/router';
import { defineProps } from 'vue';
    import { useRouter } from 'vue-router';
  useRouter();
  const volverAlMuro= () =>{
    router.push('muro');
  }
  
  const props = defineProps(['proveedor']);
  </script>
  
  <style scoped>
    .tarjetaConfirmacion{
        margin: 5%;
        border: black solid 20px;
        border-radius: 50px;
        padding: 3%;
        background-color: #ffde59;
    }
    .capa{
        background-color: white;
        border-radius: 50px;
        padding: 2%;
    }
    .contenedorCerrar {
  width: 10%; 
  height: 10%; 
  border-radius: 50%;
  overflow: hidden;
  background-color: transparent; 
  float: right;
}

.contenedorCerrar img {
  width: 100%;
  height: 100%; 
  object-fit: cover;
}
  </style>
  
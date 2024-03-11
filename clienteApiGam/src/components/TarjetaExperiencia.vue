<template>
  <div class="tarjeta-experiencia">
    <div class="mitadExperiencia">
      <p class="tituloExperiencia">{{ experiencia.titulo_experiencia }}</p>
      <p class="localidadExperiencia">{{ experiencia.localidad.nombre_localidad }}</p>
      <p class="fecha">{{ fechaFormateada }}</p>
    </div>
    <div class="ofrecidoPor">
      <p>🡆</p>
    </div>
    <div class="mitadUsuario">
      <div class="imagenAvatarContainer">
        <img class="imagenAvatar" src="../../public/avatar.jpeg" alt="avatar de usuario">
      </div>
      <div class="datosUsuario">
        <p class="nombreUsuario">{{ experiencia.usuario.nombre_usuario }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed} from 'vue';
const fechaFormateada = computed(() => {
  const fecha = new Date(props.experiencia.fecha_experiencia);
  const dia = fecha.getDate().toString().padStart(2, '0');
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const anio = fecha.getFullYear();
  return `${dia}-${mes}-${anio}`;
});

// Define las propiedades que esperas recibir
const props = defineProps(['experiencia']);
</script>

<style scoped>
  .tarjeta-experiencia{
    border: solid 20px #c1ff2c;
    border-radius: 25px;
    margin: 2%;
  }
  .tarjeta-experiencia{
    display: grid;
    grid-template-columns: 60% 10% 30%;
  }
  .mitadExperiencia{
    padding: 3%;
    display: flex;
    flex-direction: column; 
    font-weight: bold;
    font-size: 2em;
  }
  .mitadExperiencia p{
    margin: 2%;
  }
  .localidadExperiencia{
      max-width: 90%;
    }
  .fecha{
    max-width: 100%;
  }
  .tituloExperiencia{
    text-transform: uppercase;
    border: solid #ff5757 5px; 
    border-radius: 25px;
    padding: 1%;
  }
  .ofrecidoPor{
    display: flex;
  }
  .ofrecidoPor > p{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 5em;
    animation: moverTexto 5s ease-in-out infinite;
  }
  @keyframes moverTexto {
  0% {
    transform: rotate(-10deg);
  }
  50% {
    transform: translateY(-10px); /* Ajusta la distancia del movimiento vertical */
  }
  100% {
    transform: translateY(0);
  }
}
.imagenAvatarContainer{
  display: flex;
  align-items: center;
}
.imagenAvatar{
  background-color: white;
  border: none;
  width: 80%;

}
.datosUsuario{
  font-size: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  
}
.nombreUsuario{
  font-weight: bold;
}
.datosUsuario >p::first-letter{
  text-transform: uppercase;
}
</style>

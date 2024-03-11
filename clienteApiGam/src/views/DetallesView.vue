<template>
  <TarjetaExperienciaDetallada :experiencia="experiencia" :usuario="usuario" />

</template>
<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import TarjetaExperienciaDetallada from '@/components/TarjetaExperienciaDetallada.vue';
import * as dniService from '@/services/dniService';
import * as urlService from '.././services/urlService';



const router = useRouter();
const dniProveedor = ref('');
const id = ref('');
const experiencia = ref({});
const usuario = ref({});


const obtenerUsuario = async () => {
  
  try {
    const response = await axios.get(`${urlService.getUrl()}/consultar-usuario?dni=${dniProveedor.value}`);
    if (response.status === 200) {
      usuario.value = response.data.usuario;
      console.log(usuario.value);
      
    } else {
      console.error('Error en la peticion de experiencias');
    }
  } catch (error) {
    console.error('Error en la petición:', error);
  }

};
const obtenerExperiencia = async () => {
  try {
    const response = await axios.get(`${urlService.getUrl()}/consultar-experiencia?id_experiencia=${id.value}`);
    if (response.status === 200) {
      experiencia.value = response.data.experiencia;
      console.log(experiencia.value);
      
    } else {
      console.error('Error en la peticion de experiencias');
    }
  } catch (error) {
    console.error('Error en la petición:', error);
  }
};

onMounted(async () => {
  if(dniService.getDni()==""){
      router.push('/');
    }
  id.value = router.currentRoute.value.query.idExp;
  console.log(id.value);

  await obtenerExperiencia();
  dniProveedor.value = experiencia.value.dni_proveedor;
  console.log(dniProveedor.value);

  await obtenerUsuario();
});
</script>

<style>

</style>
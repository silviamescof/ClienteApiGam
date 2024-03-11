<template>
    <TarjetaProveedor :proveedor/>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import * as dniService from '@/services/dniService';
import router from '@/router';
import TarjetaProveedor from '@/components/TarjetaProveedor.vue';

const id = ref('');
const experiencia = ref({});
const proveedor = ref('');

const obtenerUsuario = async () => {
  
  try {
    const response = await axios.get(`http://127.0.0.1:8000/consultar-usuario?dni=${experiencia.value.dni_proveedor}`);
    if (response.status === 200) {
      proveedor.value = response.data.usuario;
      console.log(proveedor.value);
      
    } else {
      console.error('Error en la peticion de experiencias');
    }
  } catch (error) {
    console.error('Error en la petición:', error);
  }

};
const obtenerExperiencia = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/consultar-experiencia?id_experiencia=${id.value}`);
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
  id.value = router.currentRoute.value.query.idExp;
  console.log(id.value);

  await obtenerExperiencia();
  await obtenerUsuario();
  if(dniService.getDni()==""){
      router.push('/');
    }
});
</script>

<style>

</style>
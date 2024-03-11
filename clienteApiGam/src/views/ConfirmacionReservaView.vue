<template>
    <TarjetaProveedor :proveedor/>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import * as dniService from '@/services/dniService';
import router from '@/router';
import TarjetaProveedor from '@/components/TarjetaProveedor.vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import * as urlService from '.././services/urlService';

const id = ref('');
const experiencia = ref({});
const proveedor = ref('');

const obtenerUsuario = async () => {
  
  try {
    const response = await axios.get(`${urlService.getUrl()}/consultar-usuario?dni=${experiencia.value.dni_proveedor}`);
    if (response.status === 200) {
      proveedor.value = response.data.usuario;
      console.log(proveedor.value);
      
    } else {
      console.error('Error en la peticion de experiencias');
      toast.error("Error al cargar los datos", {
      autoClose: 5000,
      });
    }
  } catch (error) {
    console.error('Error en la petición:', error);
    toast.error("Error al cargar los datos", {
      autoClose: 5000,
      });
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
      toast.error("Error al cargar los datos", {
      autoClose: 5000,
      });
    }
  } catch (error) {
    console.error('Error en la petición:', error);
    toast.error("Error al cargar los datos", {
      autoClose: 5000,
      });
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
  
  toast.success("La experiencia ha sido reservada correctamente", {
      autoClose: 9000,
  });

  
});
</script>

<style>

</style>
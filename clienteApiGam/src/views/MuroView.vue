<template>
  <div class="contenidoMuro">
    <header class="headerMuro">
      <select v-model="tipoExperiencia" name="" id="tipoExperiencia">
        <option value="" disabled selected>TIPO DE EXPERIENCIA</option>
        <option value="">Ningun Filtro</option>
        <option v-for="experiencia in tiposDeExperiencia" :key="experiencia.id_tipo_experiencia" :value="experiencia.id_tipo_experiencia">
          {{ experiencia.nombre_tipo }}
        </option>
      </select>
      <select v-model="codigoPostal" name="codigoPostal" id="codigoPostal">
        <option value="" disabled selected>LUGAR</option>
        <option value="">Ningun Filtro</option>
        <option v-for="localidad in codigosPostales" :key="localidad.codigo_postal" :value="localidad.codigo_postal">
          {{ localidad.nombre_localidad}}
        </option>
      </select>
      <input class="inputMuro" type="date" v-model="fecha" placeholder="Fecha" :min="getFormattedDateToday()">
      <button class="ir" @click="filtrarExperiencias">BUSCAR</button>
      <button class="publicar" @click="publicarExperiencia">PUBLICAR EXPERIENCIA</button>
      <button class="cerrar" @click="cerrarSesion">CERRAR SESION <span><img src="../../public/cerrar.jpeg" alt="logo de cerrar"></span>
      </button>
    </header>
    <section class="cuerpo">
      <TarjetaExperiencia :experiencia="experiencia" v-for="experiencia in experienciasFiltradas" :key="experiencia.id_experiencia" @click="experienciaDetallada(experiencia.id_experiencia)"/>
    </section>
  </div>
</template>
<script setup>
import { ref, onMounted , nextTick} from 'vue';
import TarjetaExperiencia from '@/components/TarjetaExperiencia.vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import * as dniService from '@/services/dniService';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import * as urlService from '.././services/urlService';


const router = useRouter();
const tipoExperiencia = ref('');
const codigoPostal = ref('');
const fecha = ref('');
let codigosPostales = ref([]);
let tiposDeExperiencia = ref([]);
let experienciasFiltradas = ref([]);


///////////////////////////////////////////////////////////////////////////
const getFormattedDateToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  // Ajusta el formato a 'YYYY-MM-DD'
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;

  return `${year}-${month}-${day}`;
};
const obtenerCodigosPostales = async () => {
  try {
    const response = await axios.get(`${urlService.getUrl()}/consultar-localidades`);
    if (response.status === 200) {
      
      const localidades = response.data.localidades;

      // Ordenar el array de localidades por el nombre alfabéticamente
      localidades.sort((a, b) => {
        const nombreA = a.nombre_localidad.toUpperCase();
        const nombreB = b.nombre_localidad.toUpperCase();

        if (nombreA < nombreB) {
          return -1;
        }
        if (nombreA > nombreB) {
          return 1;
        }

        return 0;
        
      });
      
      codigosPostales = localidades;
      //console.log(codigosPostales);
    } else {
      console.error('Error en la peticion de codigos postales');
      toast.error("Error al proporcionar la informacion basica de la pagina, recarga de nuevo", {
        autoClose: 3000,
      }); 
    }
  } catch (error) {
    console.error('Error en la petición:', error);
    toast.error("Error al proporcionar la informacion basica de la pagina, recarga de nuevo", {
        autoClose: 3000,
      });
  }
};
//////////////////////////////////////////////////////////////////////////////////////////////////
const obtenerTiposExperiencia = async () => {
  try {
    const response = await axios.get(`${urlService.getUrl()}/consultar-tipos-experiencias`);
    if (response.status === 200) {
      console.log(response.data.tipos_experiencias);
      tiposDeExperiencia = response.data.tipos_experiencias;
      
    } else {
      console.error('Error en la peticion de experiencias');
      toast.error("Error al proporcionar la informacion basica de la pagina, recarga de nuevo", {
        autoClose: 3000,
      });
    }
  } catch (error) {
    console.error('Error en la petición:', error);
    toast.error("Error al proporcionar la informacion basica de la pagina, recarga de nuevo", {
        autoClose: 3000,
      });
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////
const filtrarExperiencias = async () => {
  try {
    let fechaFormateada = '';
    
    if (fecha.value) {
      const fechaBusqueda = new Date(fecha.value);

      // Si la fecha de búsqueda es mayor que hoy, úsala
      fechaFormateada = fechaBusqueda >= new Date() ? fechaBusqueda : new Date();
    } else {
      // Si no hay fecha de búsqueda, usa la fecha actual
      fechaFormateada = new Date();
    }

    const response = await axios.get(`${urlService.getUrl()}/todas-las-experiencias-filtro`, {
      params: {
        tipo_experiencia: tipoExperiencia.value,
        codigo_postal: codigoPostal.value,
        fecha: fechaFormateada,
      },
    });

    if (response.status === 200) {
      //reemplaza los elementos que tenia el array por el nuevo resultado para ayudar a Vue a reconocer los cambios
      experienciasFiltradas.value.splice(0, experienciasFiltradas.value.length, ...response.data);

      // Ordenar las experiencias por fecha de la más reciente a la más antigua
      experienciasFiltradas.value.sort((a, b) => new Date(a.fecha_experiencia) - new Date(b.fecha_experiencia));

      console.log('Experiencias filtradas:', experienciasFiltradas.value);
      await nextTick();
    } else {
      console.error('Error al consultar experiencias');
      toast.error("No existe ninguna experiencia que cumpla con el criterio de busqueda.", {
        autoClose: 3000,
      });
    }
  } catch (error) {
    console.error('Error en la petición:', error);
    toast.error("No existe ninguna experiencia que cumpla con el criterio de busqueda", {
        autoClose: 3000,
      });
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////
const publicarExperiencia = () => {
  router.push('/publicar-experiencia');
};
const cerrarSesion = ()=>{
  dniService.setDni('');
  router.push('/');
}
const experienciaDetallada = (idExperiencia) => {
  // Navegar a la vista de detalles con la ID de la experiencia
  router.push({ name: 'detalles', query: { idExp: idExperiencia } });
  
};
//////////////////////////////////////////////////////////////////////////////////////////////
onMounted(() => {
  obtenerCodigosPostales();
  obtenerTiposExperiencia();
  filtrarExperiencias();
    if(dniService.getDni()==""){
      router.push('/');
    }    
});

</script>

<style>
  .headerMuro{
    width: 100%;
    background-color: #ffde59;
    padding: 2%;
  }
  #tipoExperiencia{
    margin: 1%;
    padding: 1%;
    border-radius: 25px;
    border: solid 5px black;
    width: 13%;
  }
  #codigoPostal{
    margin: 1%;
    padding: 1%;
    border-radius: 25px;
    border: solid 5px black;
    width: 13%;
  }
  .inputMuro{
    width: 10%;
  }
  .ir{
    margin: 1%;
    border-radius: 25px;
    padding: 1%;
    border: solid 5px black;
    width: 10%;
    background-color: white;
    font-weight: bold;
  }
  .publicar{
    margin: 1%;
    padding: 1%;
    border-radius: 25px;
    border: solid 5px black;
    width: 15%;
    font-weight: bold;
    background-color: white;
  }
  .cuerpo{
    display: grid;
    grid-template-columns: 50% 50%;
  }
  .cerrar{
    margin: 1%;
    padding: 1%;
    border-radius: 25px;
    border: solid 5px black;
    width: 11%;
    font-weight: bold;
    background-color: white;  
  }
  .cerrar img{
    width: 20%;
  }
  ::placeholder{
  font-family: "Nerko One", cursive;
  font-size: 1em;
  color: black;
}
  @media (max-width: 768px) {
    .headerMuro {
      display: flex;
      flex-direction: column;
    }
    
    #tipoExperiencia,
    #codigoPostal,
    .inputMuro,
    .ir,
    .publicar,
    .cerrar {
      width: 96%;
      margin: 1% 0;
    }
  .cuerpo{
    grid-template-columns: auto;
  }
}
</style>

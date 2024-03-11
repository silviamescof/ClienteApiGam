<script setup>
import InformacionBienvenida from '@/components/InformacionBienvenida.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import * as dniService from '@/services/dniService';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import * as urlService from '.././services/urlService';



// Resto de variables y funciones
const dni = ref('');
const password = ref('');
const router = useRouter();
const url= urlService.getUrl();



const redirectToRegistro = () => {
  router.push('/registro-usuario'); 
}
const login = async () => {
  try {
    const response = await axios.get(`${url}/consultar-credenciales-usuario?dni=${dni.value}&password=${password.value}`);
    if (response.status === 200) {
        dniService.setDni(dni.value);
        router.push({ name: 'muro'});
    } else {
        toast.error("Error en el login", {
        autoClose: 3000,
      }); 
      console.error('Error en el login');
    }
  } catch (error) {
    console.error('Error en la petición:', error);
    toast.error("El usuario o la contraseña no figura en la base de datos", {
        autoClose: 3000,
      }); 
  }
}
onMounted(() => {
    if(router.currentRoute.value.query.registrado == true){
        toast.success("El usuario se ha registrado con éxito", {
        autoClose: 9000,
      });
    }
});

</script>

<template>
    <div class="contenido">
        <div class="izquierdo">
            <div class="imagen">
                <img src="../../public/imagen-inicio.jpg" alt="imagen de amigos">
            </div>
            <InformacionBienvenida/>
        </div>
        <div class="derecho">
            <img src="../assets/logo.svg" alt="logo de la aplicacion gam">
            <div class="inputs">
                <input v-model="dni" type="text" id="dni" placeholder="DNI"/><br>
                <input v-model="password" type="password" id="password" placeholder="Contraseña" />
            </div>
            <button class="login" @click="login">LOGIN</button>
            <button class="registro" @click="redirectToRegistro">REGISTRO</button>
        </div>
    </div>
</template>
<style>
    .inputs {
        width: 100%;
        display: flex;
        flex-direction: column;   
        align-items: center;  
    }
    input {
        margin-top: 1%;
        width: 60%;
        padding: 1%;
        border-radius: 25px;
        border: solid 5px black;
    }
    .contenido{
        width: 100%;
        display: grid ;
        grid-template-columns: 60% 40%;
    }
    .izquierdo{
        flex-direction: column;
        display: flex;
        align-items: center; 
        justify-content: center; 
        border: #ffde59 solid 10px; 
    }
    .imagen{
        width: 100%;
        flex-direction: column;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #ffde59;
    }
    .derecho{
        flex-direction: column;
        display: flex;
        align-items: center; 
    }
    .imagen > img{
        width: 50%;
        margin-top: 1%;
        margin-bottom: 1%;
        border: solid black 25px;
        border-radius: 25px;
    }
    .derecho > img{
        width: 60%;
    }
    .registro, .login {
        width: 50%;
        padding: 2%;
        border-radius: 25px;
        border: solid black 10px;
        cursor: pointer;
        margin-top: 1%;
    }
    .registro{
        background-color: #ff5757;
    }
    .login{
        background-color: #8c52ff;
    }
    @media (max-width: 768px) {
        .contenido{
            grid-template-columns: 100%;
        }
        .derecho > img {
            display: none;
        }
        .registro, .login {
            margin-top: 2%;
            width: 70%;
        }
    }

</style>

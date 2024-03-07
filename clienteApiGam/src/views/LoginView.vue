<script setup>
import InformacionBienvenida from '@/components/InformacionBienvenida.vue';


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

        </div>

    </div>

</template>
<style>
    .contenido{
        display: grid ;
        grid-template-columns: 60% 40%;
    }
    .izquierdo{
        background-color: aqua;
        flex-direction: column;
        display: flex;
        align-items: center; /* Centra horizontalmente */
        justify-content: center; /* Centra verticalmente */    
    }
    .imagen{
        background-color: aqua;
        flex-direction: column;
        display: flex;
        align-items: center; /* Centra horizontalmente */
        justify-content: center;
    }
    .derecho{
        flex-direction: column;
        display: flex;
        align-items: center; 
    }
    .imagen > img{
        width: 60%;
        margin-top: 5%;
        margin-bottom: 1%;
        border: solid black 25px;
        border-radius: 25px;
    }
    .derecho > img{
        width: 60%;
    }
</style>

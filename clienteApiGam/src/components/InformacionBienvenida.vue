<template>
  <div class="informacion">
    <button class="queEs" @click="openModalQueES">¿Qué es GAM?</button>
    <button class="comoFunciona" @click="openModalComoFunciona">¿Cómo funciona?</button>
    <button class="normas" @click="openModalNormas">Recomendaciones de uso</button>
    <button class="rgpd" @click="openModalRgpd">Protección de Datos</button>

    <!-- Modal ¿QUe es gam?-->
    <div v-if="showQueES" class="modal modalQueES" @click="closeModalQueEs">
      <div class="modal-content" @click.stop>
        <span class="close" @click="closeModalQueEs">&times;</span>
        <p>Podemos entender como una consecuencia de tener menos vinculación entre individuos 
          el aumento del nomadismo y el aumento de las tasas de turismo, sobre todo en adultos 
          y adultos jóvenes. Por otra parte, también encontramos que la desconexión social en 
          individuos con menos recursos económicos o sociales, lo que produce es un recluimiento 
          casero. Basándome en ésta observación, y entendiendo los recursos que cada rol puede 
          aportar, directamente el uno al otro,nació la idea de GAM. GAM pretende, conectar a 
          estos dos tipos de personas para que las personas que hacen turismo, puedan exprimir al 
          máximo sus experiencias, que realmente es el interés mayor que presentan, pudiendo 
          conectar con individuos autóctonos de cada lugar que visitan, para que sean ellos lo que 
          promocionen y organicen estas experiencias.
        </p>
      </div>
    </div>
    <!-- Modal ¿Como funciona?-->
    <div v-if="showComoFunciona" class="modal modalComoFunciona" @click="closeModalComoFunciona">
      <div class="modal-content" @click.stop>
        <span class="close" @click="closeModalComoFunciona">&times;</span>
        <p>Todos los usuarios que utilicen la aplicacion deberán estar previamente registrados. 
          Todos los usuarios pueden publicar experiencias y todos los usuarios pueden reservar una 
          experiencia que les interese. ¡Así de fácil! Entra y escoge tu plan para el fin de semana!
        </p>
      </div>
    </div>
    <!-- Modal normas-->
    <div v-if="showNormas" class="modal modalNormas" @click="closeModalNormas">
      <div class="modal-content" @click.stop>
        <span class="close" @click="closeModalNormas">&times;</span>
        <p>Dependiendo de si eres el organizador o la persona que reserva, se aconseja tener el 
          comportamiento esperado para que los encuentros funcionen perféctamente. Los organizadores 
          de experiencias deben expresar en descripciones los detalles de cada plan y por supuesto, 
          ser realistas. Se debe poder cumplir con el planning de la experiencia sin excepcion. 
          Por otra parte, en muestra de agradecimiento por los servicios prestados, se recomienda, 
          que la persona que reserva sea quien corra con los gastos,(costes de desplazamiento, 
          entradas, ingredientes, tickets....etc), no obstante, aunque es lo que creemos justo desde 
          Gam, las partes pueden acordar otra cosa.
        </p>
      </div>
    </div>
    <!-- Modal proteccion datos-->
    <div v-if="showRgpd" class="modal modalRgpd" @click="closeModalRgpd">
      <div class="modal-content" @click.stop>
        <span class="close" @click="closeModalRgpd">&times;</span>
        <p>La protección de las personas físicas en relación con el tratamiento de datos personales 
          es un derecho fundamental. El artículo 8, apartado 1, de la Carta de los Derechos 
          Fundamentales de la Unión Europea («la Carta») y el artículo 16, apartado 1, del Tratado 
          de Funcionamiento de la Unión Europea (TFUE) establecen que toda persona tiene derecho a 
          la protección de los datos de carácter personal que le conciernan. (2) Los principios y 
          normas relativos a la protección de las personas físicas en lo que respecta al 
          tratamiento de sus datos de carácter personal deben, cualquiera que sea su nacionalidad 
          o residencia, respetar sus libertades y derechos fundamentales, en particular el derecho 
          a la protección de los datos de carácter personal. El presente Reglamento pretende 
          contribuir a la plena realización de un espacio de libertad, seguridad y justicia y de 
          una unión económica, al progreso económico y social, al refuerzo y la convergencia de las 
          economías dentro del mercado interior, así como al bienestar de las personas físicas. (3) 
          La Directiva 95/46/CE del Parlamento Europeo y del Consejo ( 4 ) trata de armonizar la 
          protección de los derechos y las libertades fundamentales de las personas físicas en 
          relación con las actividades de tratamiento de datos de carácter personal y garantizar la 
          libre circulación de estos datos entre los Estados miembros. 
        </p>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref } from 'vue';

let showQueES = ref(false);
let showComoFunciona = ref(false);
let showNormas = ref(false);
let showRgpd = ref(false);

const openModalQueES = () => {
  showQueES.value = true;
};
const closeModalQueEs = () => {
  showQueES.value = false;
};
const openModalComoFunciona = () => {
  showComoFunciona.value = true;
};
const closeModalComoFunciona = () => {
  showComoFunciona.value = false;
};
const openModalNormas = () => {
  showNormas.value = true;
};
const closeModalNormas = () => {
  showNormas.value = false;
};
const openModalRgpd = () => {
  showRgpd.value = true;
};
const closeModalRgpd = () => {
  showRgpd.value = false;
};
</script>

<style scoped>
/* Estilos para el modal (ajusta según tus necesidades) */
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  margin-top: 10%;
  margin-left: 10%;
  width: 80%;
  height: 60%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow-y: hidden; /* Agrega scroll si el contenido es demasiado largo */
}

.modal-content {
  background-color: #fefefe;
  padding: 5%; 
  border: 1px solid #888;
  text-align: justify;
  overflow-y: auto; /* Agrega scroll si el contenido es demasiado largo */
  height: 100%;
}
.modal-content > p{
  padding-top: 5%;
}

.close {
  color: #aaa;
  position: absolute;
  top: 10px; 
  right: 10px; 
  font-size: 3em;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
}

.informacion {
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

button {
  width: 50%;
  padding: 2%;
  border-radius: 25px;
  border: solid black 10px;
  cursor: pointer;
}
.queEs {
  cursor: pointer;
  transform: rotate(-10deg); 
  background-color: #5ce1e6;
}
.comoFunciona {
  cursor: pointer;
  transform: rotate(10deg); 
  background-color: #ffde59;
}
.normas {
  cursor: pointer;
  transform: rotate(-2deg); 
  background-color: #5271ff;
}
.rgpd {
  cursor: pointer;
  background-color: #c1ff72;
}
</style>


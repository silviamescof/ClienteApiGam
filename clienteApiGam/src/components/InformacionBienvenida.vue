<script setup>

</script>

<template>
  <div class="informacion">
    <button class="queEs">¿Que es GAM?</button>
    <button class="comoFunciona">¿Como funciona?</button>
    <button class="normas">Recomendaciones de uso</button>
    <button class="rgpd">Proteccion de Datos</button>
  </div>
 
</template>

<style scoped>
  .informacion{
    flex-direction: column;
    display: flex;
    align-items: center; /* Centra horizontalmente */
    justify-content: center;
    width: 100%;
  }
  button{
    margin-bottom: 1%;
    width: 50%;
    padding: 2%;
    border-radius: 25px;
    border: solid black 10px;
  }
</style>

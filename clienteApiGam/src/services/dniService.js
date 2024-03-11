let dni = '';

export const setDni = (newDni) => {
  localStorage.setItem('dni', newDni);
};

// Obtener el DNI desde localStorage
export const getDni = () => {
  return localStorage.getItem('dni');
};
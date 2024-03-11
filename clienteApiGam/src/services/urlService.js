let url = 'http://127.0.0.1:8000';

export const setUrl = (newURL) => {
  url = newURL;
};

// Obtener el DNI desde localStorage
export const getUrl = () => {
  return url;
}
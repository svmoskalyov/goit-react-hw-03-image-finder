const KEY = '31041219-f816f941255d17bdaf0e3f2df';
const BASE_URL = 'https://pixabay.com/api/';

async function fetchImage(name, page) {
  const response = await fetch(
    `${BASE_URL}?q=${name}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  if (response.ok) {
    return response.json();
  }
  return await Promise.reject(new Error('Invalid request'));
}

const api = {
  fetchImage,
};

export default api;

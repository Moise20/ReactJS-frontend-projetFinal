// [LEARN] Ce fichier centralise la configuration Axios.
// [LEARN] Au lieu d'écrire l'URL complète partout (http://localhost:3301/blog/...),
// [LEARN] on configure une instance Axios avec une baseURL.
// [LEARN] Tous les composants importent cet objet 'api' et font juste api.get('/blog').
// [LEARN]
// [LEARN] L'intercepteur de requête est l'équivalent côté React d'un HttpInterceptor Angular :
// [LEARN] il s'exécute automatiquement sur CHAQUE requête sortante.
// [LEARN] Ici il ajoute le token JWT dans le header Authorization si l'utilisateur est connecté.
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// [LEARN] Intercepteur de requête : s'exécute avant chaque appel API.
// [LEARN] Il lit le token stocké dans localStorage et l'ajoute au header.
// [LEARN] Ainsi tous nos appels authentifiés fonctionnent automatiquement
// [LEARN] sans avoir à passer le token manuellement à chaque fois.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

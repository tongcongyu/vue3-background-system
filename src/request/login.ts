import { usePost } from '../utils/http/axios';
export function login(params) {
  return usePost('/login', params);
}

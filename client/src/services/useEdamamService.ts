import { useHttp } from 'src/hooks/useHttp';

const useEdamamService = () => {
  const _apiBase = 'https://api.edamam.com/';
  const _apiId = 'a62789ea';
  const _apiKey = '007b4d8509034db5f42cde8cc8f8d0ee';
  const { request } = useHttp();

  const getFoods = async (value:string) => {
    const res = await request(`${_apiBase}api/recipes/v2?type=public&q=${value}&${_apiId}&${_apiKey}`);
    return res;
  };

  return { getFoods };
};
export default useEdamamService;

import { environment } from '../../environments/environment';

const fetchLogout = (): Promise<object> =>
  new Promise((resolve) => {
    const requestOptions = {
      method: 'POST',
    };
    fetch(`${environment.apiUrl}/api/auth/logout`, requestOptions)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => console.log('error', error));
  });

export default fetchLogout;

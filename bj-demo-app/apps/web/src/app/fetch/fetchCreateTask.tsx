import { environment } from '../../environments/environment';

const fetchCreateTask = (data: object): Promise<object> =>
  new Promise((resolve) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify(data);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    fetch(`${environment.apiUrl}/api/tasks/create`, requestOptions)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => console.log('error', error));
  });

export default fetchCreateTask;

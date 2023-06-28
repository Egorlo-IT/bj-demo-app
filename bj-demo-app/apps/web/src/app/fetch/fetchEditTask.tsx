import { environment } from '../../environments/environment';

const fetchEditTask = (data: object, id: string): Promise<object> =>
  new Promise((resolve) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({ ...data, id });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    fetch(`${environment.apiUrl}/api/tasks/edit`, requestOptions)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => console.log('error', error));
  });

export default fetchEditTask;

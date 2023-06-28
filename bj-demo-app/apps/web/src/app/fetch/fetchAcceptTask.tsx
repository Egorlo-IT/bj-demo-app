import { environment } from '../../environments/environment';

const fetchAcceptTask = (idTask: string): Promise<object> =>
  new Promise((resolve) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({ id: idTask });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    fetch(`${environment.apiUrl}/api/tasks/editStatus`, requestOptions)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => console.log('error', error));
  });

export default fetchAcceptTask;

import { environment } from '../../environments/environment';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchTasksAll = (): Promise<any> =>
  new Promise((resolve) => {
    fetch(`${environment.apiUrl}/api/tasks/all`)
      .then((response) => response.json())
      .then((data) => resolve(data));
  });

export default fetchTasksAll;

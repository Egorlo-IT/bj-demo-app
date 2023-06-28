interface LoginUserElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  password: HTMLInputElement;
}

export interface LoginUserForm extends HTMLFormElement {
  readonly elements: LoginUserElements;
}

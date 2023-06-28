export const Colors = {
  // RED: '#ff3366',
  RED: '#e60000',
  // GREEN: 'rgb(131 181 166 / 74%)',
  GREEN: '#00d926',
  // BLUE: '#2a8bf2',
  BLUE: '#001fad',
  // BLACK: '#212529',
  BLACK: '#0a0d0f',
  // GRAY: '#707c97',
  GRAY: '#627777',
  WHITE: '#fff',
};

export const Action = {
  SUCCESS: {
    mess: '',
    color: Colors.GREEN,
  },
  ERROR: {
    mess: '',
    color: Colors.RED,
  },
  WARNING: {
    mess: '',
    color: Colors.GRAY,
  },
};

export const CustomStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: Colors.BLUE,
    color: Colors.BLACK,
    fontFamily: 'Roboto',
    fontSize: '20px',
  },
};

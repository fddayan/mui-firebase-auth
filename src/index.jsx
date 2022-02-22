import React from 'react'
import ReactDOM from 'react-dom';

import MuiFirebaseAuth from './components/MuiFirebaseAuth'

const App = () => {
  return (
    <MuiFirebaseAuth />
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
import React from 'react';
import StockComparison from './components/StockComparison.js';
import MenuBar from "./components/MenuBar.js";
import './App.css';

const App = () => {
  return (
      <div>
          <MenuBar/>
          <StockComparison/>
      </div>
  )
}

export default App;

// import logo from './logo.svg';
// import './App.css';
//
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
//
// export default App;

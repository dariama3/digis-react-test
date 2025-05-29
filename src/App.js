import './App.css';
import CitySearch from './components/CitySearch';
import CityChart from "./components/CityChart";

function App() {
  return (
    <div className="App">
      <main className="wrapper">
        <CitySearch />
        <CityChart />
      </main>
    </div>
  );
}

export default App;

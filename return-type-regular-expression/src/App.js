import "./App.css";
import StockTracker from "./components/StockTracker";

function App() {
  return (
    <div className="App">
      <h1 className="header">Stock Market Tracker</h1>
      <p className="para">Track your stock investments efficiently!</p>
      <StockTracker></StockTracker>
    </div>
  );
}

export default App;

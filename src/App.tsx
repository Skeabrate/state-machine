import './App.css';
import Flags from './components/Flags';
import StateMachine from './components/StateMachine';

function App() {
  return (
    <main>
      <header>
        <h1>Flags vs State Machine</h1>
      </header>

      <div style={{ display: 'flex', gap: '100px' }}>
        <Flags />
        <StateMachine />
      </div>
    </main>
  );
}

export default App;

import React from 'react';
import { CalculatorUI } from './ui/CalculatorUI.js';

function App() {
  React.useEffect(() => {
    // Initialiser la calculatrice au chargement
    new CalculatorUI();
  }, []);

  return (
    <div id="root" className="min-h-screen">
      {/* Le contenu sera injecté par CalculatorUI */}
    </div>
  );
}

export default App;
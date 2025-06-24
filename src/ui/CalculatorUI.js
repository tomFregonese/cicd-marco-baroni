/**
 * Interface utilisateur de la calculatrice
 * Gère l'affichage et les interactions utilisateur
 */
import { Calculator } from '../business/Calculator.js';

export class CalculatorUI {
  constructor() {
    this.calculator = new Calculator();
    this.display = null;
    this.historyPanel = null;
    this.init();
    this.setupEventListeners();
  }

  /**
   * Initialise l'interface utilisateur
   */
  init() {
    this.createCalculatorHTML();
    this.display = document.getElementById('calculator-display');
    this.historyPanel = document.getElementById('history-panel');
    this.updateDisplay();
  }

  /**
   * Crée la structure HTML de la calculatrice
   */
  createCalculatorHTML() {
    const app = document.getElementById('root');
    app.innerHTML = `
      <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div class="flex gap-6 max-w-6xl w-full">
          <!-- Calculatrice principale -->
          <div class="bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-700">
            <div class="w-80">
              <!-- Écran -->
              <div class="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-600">
                <div id="calculator-display" class="text-right text-3xl font-mono text-white min-h-[3rem] flex items-center justify-end">
                  0
                </div>
                <div id="operation-display" class="text-right text-sm text-gray-400 mt-2 min-h-[1rem]">
                  
                </div>
              </div>

              <!-- Boutons -->
              <div class="grid grid-cols-4 gap-3">
                <!-- Première ligne -->
                <button class="calculator-btn btn-secondary" data-action="clear">C</button>
                <button class="calculator-btn btn-secondary" data-action="clear-entry">CE</button>
                <button class="calculator-btn btn-secondary" data-action="backspace">⌫</button>
                <button class="calculator-btn btn-operator" data-action="divide">÷</button>

                <!-- Deuxième ligne -->
                <button class="calculator-btn btn-number" data-digit="7">7</button>
                <button class="calculator-btn btn-number" data-digit="8">8</button>
                <button class="calculator-btn btn-number" data-digit="9">9</button>
                <button class="calculator-btn btn-operator" data-action="multiply">×</button>

                <!-- Troisième ligne -->
                <button class="calculator-btn btn-number" data-digit="4">4</button>
                <button class="calculator-btn btn-number" data-digit="5">5</button>
                <button class="calculator-btn btn-number" data-digit="6">6</button>
                <button class="calculator-btn btn-operator" data-action="subtract">−</button>

                <!-- Quatrième ligne -->
                <button class="calculator-btn btn-number" data-digit="1">1</button>
                <button class="calculator-btn btn-number" data-digit="2">2</button>
                <button class="calculator-btn btn-number" data-digit="3">3</button>
                <button class="calculator-btn btn-operator" data-action="add">+</button>

                <!-- Cinquième ligne -->
                <button class="calculator-btn btn-secondary" data-action="toggle-sign">±</button>
                <button class="calculator-btn btn-number" data-digit="0">0</button>
                <button class="calculator-btn btn-secondary" data-action="decimal">.</button>
                <button class="calculator-btn btn-equals" data-action="equals">=</button>
              </div>

              <!-- Boutons additionnels -->
              <div class="grid grid-cols-2 gap-3 mt-4">
                <button class="calculator-btn btn-secondary" data-action="percentage">%</button>
                <button class="calculator-btn btn-secondary" id="toggle-history">Historique</button>
              </div>
            </div>
          </div>

          <!-- Panneau d'historique -->
          <div id="history-panel" class="bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-700 w-80 hidden">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-white text-lg font-semibold">Historique</h3>
              <button id="clear-history" class="text-gray-400 hover:text-white transition-colors">
                Effacer
              </button>
            </div>
            <div id="history-list" class="space-y-2 max-h-96 overflow-y-auto">
              <p class="text-gray-400 text-center">Aucun calcul effectué</p>
            </div>
          </div>
        </div>
      </div>
    `;

    // Ajouter les styles CSS
    this.addStyles();
  }

  /**
   * Ajoute les styles CSS personnalisés
   */
  addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .calculator-btn {
        @apply h-16 rounded-xl font-semibold text-lg transition-all duration-200 transform;
        @apply hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500;
      }

      .btn-number {
        @apply bg-gray-700 text-white hover:bg-gray-600 border border-gray-600;
      }

      .btn-operator {
        @apply bg-blue-600 text-white hover:bg-blue-500 border border-blue-500;
      }

      .btn-equals {
        @apply bg-green-600 text-white hover:bg-green-500 border border-green-500;
      }

      .btn-secondary {
        @apply bg-gray-600 text-white hover:bg-gray-500 border border-gray-500;
      }

      .history-item {
        @apply bg-gray-700 rounded-lg p-3 border border-gray-600;
        @apply hover:bg-gray-600 transition-colors cursor-pointer;
      }

      .history-item:hover {
        transform: translateX(4px);
      }

      #calculator-display {
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
      }

      /* Animation pour les boutons */
      .calculator-btn:active {
        box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.3);
      }

      /* Scrollbar personnalisée pour l'historique */
      #history-list::-webkit-scrollbar {
        width: 6px;
      }

      #history-list::-webkit-scrollbar-track {
        background: #374151;
        border-radius: 3px;
      }

      #history-list::-webkit-scrollbar-thumb {
        background: #6B7280;
        border-radius: 3px;
      }

      #history-list::-webkit-scrollbar-thumb:hover {
        background: #9CA3AF;
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Configure les écouteurs d'événements
   */
  setupEventListeners() {
    // Écouteurs pour les boutons
    document.addEventListener('click', (e) => {
      if (e.target.matches('.calculator-btn')) {
        this.handleButtonClick(e.target);
      }
      
      if (e.target.id === 'toggle-history') {
        this.toggleHistory();
      }
      
      if (e.target.id === 'clear-history') {
        this.clearHistory();
      }
      
      if (e.target.matches('.history-item')) {
        this.useHistoryItem(e.target);
      }
    });

    // Écouteur pour le clavier
    document.addEventListener('keydown', (e) => {
      this.handleKeyboard(e);
    });
  }

  /**
   * Gère les clics sur les boutons
   * @param {HTMLElement} button - Bouton cliqué
   */
  handleButtonClick(button) {
    // Animation visuelle
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
      button.style.transform = '';
    }, 100);

    const digit = button.dataset.digit;
    const action = button.dataset.action;

    if (digit) {
      this.calculator.inputDigit(digit);
    } else if (action) {
      this.handleAction(action);
    }

    this.updateDisplay();
    this.updateHistory();
  }

  /**
   * Gère les actions des boutons
   * @param {string} action - Action à effectuer
   */
  handleAction(action) {
    try {
      switch (action) {
        case 'clear':
          this.calculator.clear();
          break;
        case 'clear-entry':
          this.calculator.clearEntry();
          break;
        case 'backspace':
          this.calculator.backspace();
          break;
        case 'decimal':
          this.calculator.inputDecimal();
          break;
        case 'toggle-sign':
          this.calculator.toggleSign();
          break;
        case 'percentage':
          const percentValue = this.calculator.percentage(parseFloat(this.calculator.currentValue));
          this.calculator.currentValue = String(percentValue);
          break;
        case 'add':
          this.calculator.performOperation('+');
          break;
        case 'subtract':
          this.calculator.performOperation('-');
          break;
        case 'multiply':
          this.calculator.performOperation('*');
          break;
        case 'divide':
          this.calculator.performOperation('/');
          break;
        case 'equals':
          this.calculator.performOperation('=');
          break;
      }
    } catch (error) {
      this.showError(error.message);
    }
  }

  /**
   * Gère les entrées clavier
   * @param {KeyboardEvent} e - Événement clavier
   */
  handleKeyboard(e) {
    e.preventDefault();
    
    const keyMap = {
      '0': () => this.calculator.inputDigit('0'),
      '1': () => this.calculator.inputDigit('1'),
      '2': () => this.calculator.inputDigit('2'),
      '3': () => this.calculator.inputDigit('3'),
      '4': () => this.calculator.inputDigit('4'),
      '5': () => this.calculator.inputDigit('5'),
      '6': () => this.calculator.inputDigit('6'),
      '7': () => this.calculator.inputDigit('7'),
      '8': () => this.calculator.inputDigit('8'),
      '9': () => this.calculator.inputDigit('9'),
      '.': () => this.calculator.inputDecimal(),
      '+': () => this.calculator.performOperation('+'),
      '-': () => this.calculator.performOperation('-'),
      '*': () => this.calculator.performOperation('*'),
      '/': () => this.calculator.performOperation('/'),
      '=': () => this.calculator.performOperation('='),
      'Enter': () => this.calculator.performOperation('='),
      'Escape': () => this.calculator.clear(),
      'Backspace': () => this.calculator.backspace(),
      'Delete': () => this.calculator.clearEntry()
    };

    if (keyMap[e.key]) {
      try {
        keyMap[e.key]();
        this.updateDisplay();
        this.updateHistory();
      } catch (error) {
        this.showError(error.message);
      }
    }
  }

  /**
   * Met à jour l'affichage principal
   */
  updateDisplay() {
    const state = this.calculator.getState();
    
    // Affichage principal
    this.display.textContent = this.formatNumber(state.currentValue);
    
    // Affichage de l'opération en cours
    const operationDisplay = document.getElementById('operation-display');
    if (state.previousValue !== null && state.operation) {
      const operatorSymbol = this.getOperatorSymbol(state.operation);
      operationDisplay.textContent = `${this.formatNumber(state.previousValue)} ${operatorSymbol}`;
    } else {
      operationDisplay.textContent = '';
    }
  }

  /**
   * Formate un nombre pour l'affichage
   * @param {string|number} number - Nombre à formater
   * @returns {string} Nombre formaté
   */
  formatNumber(number) {
    const num = parseFloat(number);
    if (isNaN(num)) return '0';
    
    // Limiter le nombre de décimales affichées
    if (Math.abs(num) < 1e-10) return '0';
    if (Math.abs(num) > 1e10) return num.toExponential(5);
    
    return Number(num.toPrecision(12)).toString();
  }

  /**
   * Obtient le symbole d'affichage pour un opérateur
   * @param {string} operator - Opérateur
   * @returns {string} Symbole d'affichage
   */
  getOperatorSymbol(operator) {
    const symbols = {
      '+': '+',
      '-': '−',
      '*': '×',
      '/': '÷'
    };
    return symbols[operator] || operator;
  }

  /**
   * Affiche une erreur
   * @param {string} message - Message d'erreur
   */
  showError(message) {
    this.display.textContent = 'Erreur';
    this.display.style.color = '#ef4444';
    
    setTimeout(() => {
      this.calculator.clear();
      this.updateDisplay();
      this.display.style.color = '';
    }, 2000);
    
    console.error('Erreur calculatrice:', message);
  }

  /**
   * Bascule l'affichage de l'historique
   */
  toggleHistory() {
    const isHidden = this.historyPanel.classList.contains('hidden');
    
    if (isHidden) {
      this.historyPanel.classList.remove('hidden');
      document.getElementById('toggle-history').textContent = 'Masquer';
    } else {
      this.historyPanel.classList.add('hidden');
      document.getElementById('toggle-history').textContent = 'Historique';
    }
  }

  /**
   * Met à jour l'affichage de l'historique
   */
  updateHistory() {
    const history = this.calculator.getHistory();
    const historyList = document.getElementById('history-list');
    
    if (history.length === 0) {
      historyList.innerHTML = '<p class="text-gray-400 text-center">Aucun calcul effectué</p>';
      return;
    }

    historyList.innerHTML = history
      .map(entry => `
        <div class="history-item">
          <div class="text-white font-mono">${entry}</div>
        </div>
      `)
      .join('');
  }

  /**
   * Efface l'historique
   */
  clearHistory() {
    this.calculator.clearHistory();
    this.updateHistory();
  }

  /**
   * Utilise un élément de l'historique (fonctionnalité future)
   * @param {HTMLElement} item - Élément d'historique
   */
  useHistoryItem(item) {
    // Pour l'instant, on peut juste surligner l'élément
    item.style.backgroundColor = '#374151';
    setTimeout(() => {
      item.style.backgroundColor = '';
    }, 300);
  }
}
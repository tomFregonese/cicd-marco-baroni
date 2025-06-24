/**
 * Classe Calculator - Logique métier de la calculatrice
 * Gère toutes les opérations arithmétiques et la logique de calcul
 */
export class Calculator {
  constructor() {
    this.currentValue = '0';
    this.previousValue = null;
    this.operation = null;
    this.waitingForOperand = false;
    this.history = [];
  }

  /**
   * Ajoute un chiffre au nombre courant
   * @param {string} digit - Le chiffre à ajouter
   */
  inputDigit(digit) {
    if (this.waitingForOperand) {
      this.currentValue = digit;
      this.waitingForOperand = false;
    } else {
      this.currentValue = this.currentValue === '0' ? digit : this.currentValue + digit;
    }
  }

  /**
   * Ajoute le point décimal
   */
  inputDecimal() {
    if (this.waitingForOperand) {
      this.currentValue = '0.';
      this.waitingForOperand = false;
    } else if (this.currentValue.indexOf('.') === -1) {
      this.currentValue += '.';
    }
  }

  /**
   * Efface tout (Clear)
   */
  clear() {
    this.currentValue = '0';
    this.previousValue = null;
    this.operation = null;
    this.waitingForOperand = false;
  }

  /**
   * Efface la dernière entrée (Clear Entry)
   */
  clearEntry() {
    this.currentValue = '0';
  }

  /**
   * Supprime le dernier caractère (Backspace)
   */
  backspace() {
    if (!this.waitingForOperand) {
      if (this.currentValue.length > 1) {
        this.currentValue = this.currentValue.slice(0, -1);
      } else {
        this.currentValue = '0';
      }
    }
  }

  /**
   * Exécute une opération arithmétique
   * @param {string} nextOperation - L'opération à effectuer (+, -, *, /)
   */
  performOperation(nextOperation) {
    const inputValue = parseFloat(this.currentValue);

    if (this.previousValue === null) {
      this.previousValue = inputValue;
    } else if (this.operation) {
      const currentValue = this.previousValue || 0;
      const newValue = this.calculate(currentValue, inputValue, this.operation);

      this.currentValue = String(newValue);
      this.previousValue = newValue;
      
      // Ajouter à l'historique
      this.addToHistory(`${currentValue} ${this.operation} ${inputValue} = ${newValue}`);
    }

    this.waitingForOperand = true;
    this.operation = nextOperation;
  }

  /**
   * Calcule le résultat d'une opération
   * @param {number} firstOperand - Premier opérande
   * @param {number} secondOperand - Second opérande
   * @param {string} operation - Opération à effectuer
   * @returns {number} Résultat du calcul
   */
  calculate(firstOperand, secondOperand, operation) {
    switch (operation) {
      case '+':
        return this.add(firstOperand, secondOperand);
      case '-':
        return this.subtract(firstOperand, secondOperand);
      case '*':
        return this.multiply(firstOperand, secondOperand);
      case '/':
        return this.divide(firstOperand, secondOperand);
      case '=':
        return secondOperand;
      default:
        return secondOperand;
    }
  }

  /**
   * Addition
   * @param {number} a - Premier nombre
   * @param {number} b - Second nombre
   * @returns {number} Somme
   */
  add(a, b) {
    return a + b;
  }

  /**
   * Soustraction
   * @param {number} a - Premier nombre
   * @param {number} b - Second nombre
   * @returns {number} Différence
   */
  subtract(a, b) {
    return a - b;
  }

  /**
   * Multiplication
   * @param {number} a - Premier nombre
   * @param {number} b - Second nombre
   * @returns {number} Produit
   */
  multiply(a, b) {
    return a * b;
  }

  /**
   * Division
   * @param {number} a - Dividende
   * @param {number} b - Diviseur
   * @returns {number} Quotient
   * @throws {Error} Si division par zéro
   */
  divide(a, b) {
    if (b === 0) {
      throw new Error('Division par zéro impossible');
    }
    return a / b;
  }

  /**
   * Calcule le pourcentage
   * @param {number} value - Valeur à convertir en pourcentage
   * @returns {number} Pourcentage
   */
  percentage(value) {
    return value / 100;
  }

  /**
   * Change le signe du nombre courant
   */
  toggleSign() {
    if (this.currentValue !== '0') {
      if (this.currentValue.charAt(0) === '-') {
        this.currentValue = this.currentValue.slice(1);
      } else {
        this.currentValue = '-' + this.currentValue;
      }
    }
  }

  /**
   * Ajoute une entrée à l'historique
   * @param {string} entry - Entrée à ajouter
   */
  addToHistory(entry) {
    this.history.unshift(entry);
    if (this.history.length > 10) {
      this.history.pop();
    }
  }

  /**
   * Obtient l'historique des calculs
   * @returns {Array} Historique
   */
  getHistory() {
    return [...this.history];
  }

  /**
   * Efface l'historique
   */
  clearHistory() {
    this.history = [];
  }

  /**
   * Obtient l'état actuel de la calculatrice
   * @returns {Object} État actuel
   */
  getState() {
    return {
      currentValue: this.currentValue,
      previousValue: this.previousValue,
      operation: this.operation,
      waitingForOperand: this.waitingForOperand
    };
  }
}
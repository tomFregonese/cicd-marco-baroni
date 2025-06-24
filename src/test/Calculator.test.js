/**
 * Tests unitaires pour la classe Calculator
 */
import { Calculator } from '../business/Calculator.js';

/**
 * Fonction simple d'assertion pour les tests
 * @param {boolean} condition - Condition à tester
 * @param {string} message - Message d'erreur si échec
 */
function assert(condition, message) {
  if (!condition) {
    throw new Error(`Test échoué: ${message}`);
  }
}

/**
 * Fonction pour comparer des nombres flottants avec tolérance
 * @param {number} actual - Valeur actuelle
 * @param {number} expected - Valeur attendue
 * @param {number} tolerance - Tolérance (défaut: 1e-10)
 * @returns {boolean} True si les valeurs sont égales dans la tolérance
 */
function almostEqual(actual, expected, tolerance = 1e-10) {
  return Math.abs(actual - expected) < tolerance;
}

/**
 * Tests pour les opérations arithmétiques de base
 */
export class CalculatorTests {
  static runAllTests() {
    console.log('🧪 Début des tests de la calculatrice...\n');
    
    const tests = [
      // Tests des opérations de base
      () => this.testAddition(),
      () => this.testSubtraction(),
      () => this.testMultiplication(),
      () => this.testDivision(),
      () => this.testDivisionByZero(),
      
      // Tests des fonctionnalités avancées
      () => this.testPercentage(),
      () => this.testToggleSign(),
      () => this.testDecimalInput(),
      () => this.testClear(),
      () => this.testClearEntry(),
      () => this.testBackspace(),
      
      // Tests des opérations en chaîne
      () => this.testChainedOperations(),
      () => this.testRepeatedEquals(),
      
      // Tests de l'historique
      () => this.testHistory(),
      () => this.testHistoryLimit(),
      
      // Tests des cas limites
      () => this.testLargeNumbers(),
      () => this.testVerySmallNumbers(),
      () => this.testNegativeNumbers(),
      
      // Tests de l'état
      () => this.testGetState()
    ];

    let passed = 0;
    let failed = 0;

    tests.forEach((test, index) => {
      try {
        test();
        console.log(`✅ Test ${index + 1}: ${test.name} - RÉUSSI`);
        passed++;
      } catch (error) {
        console.error(`❌ Test ${index + 1}: ${test.name} - ÉCHEC`);
        console.error(`   ${error.message}`);
        failed++;
      }
    });

    console.log(`\n📊 Résultats des tests:`);
    console.log(`   ✅ Réussis: ${passed}`);
    console.log(`   ❌ Échoués: ${failed}`);
    console.log(`   📈 Taux de réussite: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);
    
    return { passed, failed, total: passed + failed };
  }

  /**
   * Test de l'addition
   */
  static testAddition() {
    const calc = new Calculator();
    
    // Test addition simple
    assert(calc.add(2, 3) === 5, 'Addition 2 + 3 devrait égaler 5');
    assert(calc.add(0, 0) === 0, 'Addition 0 + 0 devrait égaler 0');
    assert(calc.add(-5, 3) === -2, 'Addition -5 + 3 devrait égaler -2');
    assert(almostEqual(calc.add(0.1, 0.2), 0.3), 'Addition 0.1 + 0.2 devrait égaler 0.3');
    
    // Test avec l'interface
    calc.inputDigit('5');
    calc.performOperation('+');
    calc.inputDigit('3');
    calc.performOperation('=');
    assert(calc.currentValue === '8', 'Interface: 5 + 3 devrait égaler 8');
  }

  /**
   * Test de la soustraction
   */
  static testSubtraction() {
    const calc = new Calculator();
    
    assert(calc.subtract(5, 3) === 2, 'Soustraction 5 - 3 devrait égaler 2');
    assert(calc.subtract(0, 5) === -5, 'Soustraction 0 - 5 devrait égaler -5');
    assert(calc.subtract(-3, -7) === 4, 'Soustraction -3 - (-7) devrait égaler 4');
    
    // Test avec l'interface
    calc.inputDigit('10');
    calc.performOperation('-');
    calc.inputDigit('4');
    calc.performOperation('=');
    assert(calc.currentValue === '6', 'Interface: 10 - 4 devrait égaler 6');
  }

  /**
   * Test de la multiplication
   */
  static testMultiplication() {
    const calc = new Calculator();
    
    assert(calc.multiply(4, 5) === 20, 'Multiplication 4 * 5 devrait égaler 20');
    assert(calc.multiply(0, 100) === 0, 'Multiplication 0 * 100 devrait égaler 0');
    assert(calc.multiply(-3, 4) === -12, 'Multiplication -3 * 4 devrait égaler -12');
    assert(calc.multiply(-2, -6) === 12, 'Multiplication -2 * -6 devrait égaler 12');
    
    // Test avec l'interface
    calc.inputDigit('7');
    calc.performOperation('*');
    calc.inputDigit('8');
    calc.performOperation('=');
    assert(calc.currentValue === '56', 'Interface: 7 * 8 devrait égaler 56');
  }

  /**
   * Test de la division
   */
  static testDivision() {
    const calc = new Calculator();
    
    assert(calc.divide(10, 2) === 5, 'Division 10 / 2 devrait égaler 5');
    assert(calc.divide(0, 5) === 0, 'Division 0 / 5 devrait égaler 0');
    assert(calc.divide(-12, 3) === -4, 'Division -12 / 3 devrait égaler -4');
    assert(almostEqual(calc.divide(1, 3), 1/3), 'Division 1 / 3 devrait égaler environ 0.333...');
    
    // Test avec l'interface
    calc.inputDigit('15');
    calc.performOperation('/');
    calc.inputDigit('3');
    calc.performOperation('=');
    assert(calc.currentValue === '5', 'Interface: 15 / 3 devrait égaler 5');
  }

  /**
   * Test de la division par zéro
   */
  static testDivisionByZero() {
    const calc = new Calculator();
    
    try {
      calc.divide(5, 0);
      assert(false, 'Division par zéro devrait lever une exception');
    } catch (error) {
      assert(error.message === 'Division par zéro impossible', 'Message d\'erreur correct pour division par zéro');
    }
  }

  /**
   * Test du pourcentage
   */
  static testPercentage() {
    const calc = new Calculator();
    
    assert(calc.percentage(50) === 0.5, 'Pourcentage de 50 devrait égaler 0.5');
    assert(calc.percentage(100) === 1, 'Pourcentage de 100 devrait égaler 1');
    assert(calc.percentage(0) === 0, 'Pourcentage de 0 devrait égaler 0');
  }

  /**
   * Test du changement de signe
   */
  static testToggleSign() {
    const calc = new Calculator();
    
    calc.inputDigit('5');
    calc.toggleSign();
    assert(calc.currentValue === '-5', 'Changement de signe de 5 devrait donner -5');
    
    calc.toggleSign();
    assert(calc.currentValue === '5', 'Double changement de signe devrait revenir à 5');
    
    calc.clear();
    calc.toggleSign();
    assert(calc.currentValue === '0', 'Changement de signe de 0 devrait rester 0');
  }

  /**
   * Test de la saisie décimale
   */
  static testDecimalInput() {
    const calc = new Calculator();
    
    calc.inputDigit('3');
    calc.inputDecimal();
    calc.inputDigit('14');
    assert(calc.currentValue === '3.14', 'Saisie décimale devrait donner 3.14');
    
    // Test double point décimal
    calc.inputDecimal();
    assert(calc.currentValue === '3.14', 'Double point décimal ne devrait pas changer la valeur');
  }

  /**
   * Test de la remise à zéro (Clear)
   */
  static testClear() {
    const calc = new Calculator();
    
    calc.inputDigit('123');
    calc.performOperation('+');
    calc.inputDigit('456');
    calc.clear();
    
    const state = calc.getState();
    assert(state.currentValue === '0', 'Clear devrait remettre currentValue à 0');
    assert(state.previousValue === null, 'Clear devrait remettre previousValue à null');
    assert(state.operation === null, 'Clear devrait remettre operation à null');
    assert(state.waitingForOperand === false, 'Clear devrait remettre waitingForOperand à false');
  }

  /**
   * Test de Clear Entry
   */
  static testClearEntry() {
    const calc = new Calculator();
    
    calc.inputDigit('123');
    calc.clearEntry();
    assert(calc.currentValue === '0', 'Clear Entry devrait remettre currentValue à 0');
  }

  /**
   * Test du backspace
   */
  static testBackspace() {
    const calc = new Calculator();
    
    calc.inputDigit('123');
    calc.backspace();
    assert(calc.currentValue === '12', 'Backspace de 123 devrait donner 12');
    
    calc.backspace();
    calc.backspace();
    assert(calc.currentValue === '0', 'Backspace jusqu\'au bout devrait donner 0');
  }

  /**
   * Test des opérations en chaîne
   */
  static testChainedOperations() {
    const calc = new Calculator();
    
    // 2 + 3 * 4 = 20 (si évaluation de gauche à droite)
    calc.inputDigit('2');
    calc.performOperation('+');
    calc.inputDigit('3');
    calc.performOperation('*');
    calc.inputDigit('4');
    calc.performOperation('=');
    
    assert(calc.currentValue === '20', 'Opérations en chaîne: 2 + 3 * 4 devrait égaler 20');
  }

  /**
   * Test des égal répétés
   */
  static testRepeatedEquals() {
    const calc = new Calculator();
    
    calc.inputDigit('5');
    calc.performOperation('+');
    calc.inputDigit('3');
    calc.performOperation('=');
    assert(calc.currentValue === '8', 'Premier =: 5 + 3 devrait égaler 8');
  }

  /**
   * Test de l'historique
   */
  static testHistory() {
    const calc = new Calculator();
    
    calc.inputDigit('5');
    calc.performOperation('+');
    calc.inputDigit('3');
    calc.performOperation('=');
    
    const history = calc.getHistory();
    assert(history.length === 1, 'L\'historique devrait contenir 1 entrée');
    assert(history[0].includes('5 + 3 = 8'), 'L\'historique devrait contenir l\'opération correcte');
  }

  /**
   * Test de la limite de l'historique
   */
  static testHistoryLimit() {
    const calc = new Calculator();
    
    // Ajouter plus de 10 opérations
    for (let i = 0; i < 12; i++) {
      calc.inputDigit('1');
      calc.performOperation('+');
      calc.inputDigit('1');
      calc.performOperation('=');
    }
    
    const history = calc.getHistory();
    assert(history.length === 10, 'L\'historique ne devrait pas dépasser 10 entrées');
  }

  /**
   * Test avec des grands nombres
   */
  static testLargeNumbers() {
    const calc = new Calculator();
    
    const large1 = 999999999;
    const large2 = 1000000001;
    const result = calc.add(large1, large2);
    
    assert(result === 2000000000, 'Addition de grands nombres devrait fonctionner');
  }

  /**
   * Test avec des très petits nombres
   */
  static testVerySmallNumbers() {
    const calc = new Calculator();
    
    const small1 = 0.0000001;
    const small2 = 0.0000002;
    const result = calc.add(small1, small2);
    
    assert(almostEqual(result, 0.0000003), 'Addition de très petits nombres devrait fonctionner');
  }

  /**
   * Test avec des nombres négatifs
   */
  static testNegativeNumbers() {
    const calc = new Calculator();
    
    assert(calc.add(-5, -3) === -8, 'Addition de nombres négatifs: -5 + (-3) = -8');
    assert(calc.subtract(-5, -3) === -2, 'Soustraction de nombres négatifs: -5 - (-3) = -2');
    assert(calc.multiply(-5, -3) === 15, 'Multiplication de nombres négatifs: -5 * (-3) = 15');
    assert(calc.divide(-6, -2) === 3, 'Division de nombres négatifs: -6 / (-2) = 3');
  }

  /**
   * Test de l'état de la calculatrice
   */
  static testGetState() {
    const calc = new Calculator();
    
    calc.inputDigit('42');
    calc.performOperation('+');
    
    const state = calc.getState();
    assert(state.currentValue === '42', 'État: currentValue devrait être 42');
    assert(state.previousValue === 42, 'État: previousValue devrait être 42');
    assert(state.operation === '+', 'État: operation devrait être +');
    assert(state.waitingForOperand === true, 'État: waitingForOperand devrait être true');
  }
}
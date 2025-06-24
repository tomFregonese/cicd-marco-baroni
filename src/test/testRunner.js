/**
 * Lanceur de tests pour la calculatrice - Version CLI
 * Utilisé pour l'intégration continue (Jenkins, GitHub Actions, etc.)
 */
import { CalculatorTests } from './Calculator.test.js';

/**
 * Lanceur de tests en ligne de commande
 */
export class TestRunner {
  /**
   * Lance tous les tests en mode CLI
   */
  static runTests() {
    console.log('🧪 === TESTS DE LA CALCULATRICE ===\n');
    console.log('📅 Date:', new Date().toLocaleString());
    console.log('🔧 Environnement: Node.js', process.version);
    console.log('─'.repeat(50));
    
    const startTime = Date.now();
    
    try {
      const results = CalculatorTests.runAllTests();
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      console.log('\n' + '═'.repeat(50));
      console.log('📊 RAPPORT FINAL DES TESTS');
      console.log('═'.repeat(50));
      console.log(`⏱️  Durée d'exécution: ${duration}ms`);
      console.log(`✅ Tests réussis: ${results.passed}`);
      console.log(`❌ Tests échoués: ${results.failed}`);
      console.log(`📈 Total: ${results.total}`);
      console.log(`🎯 Taux de réussite: ${((results.passed / results.total) * 100).toFixed(1)}%`);
      
      if (results.failed === 0) {
        console.log('\n🎉 TOUS LES TESTS SONT PASSÉS ! 🎉');
        process.exit(0);
      } else {
        console.log('\n⚠️  CERTAINS TESTS ONT ÉCHOUÉ');
        console.log('📋 Consultez les détails ci-dessus pour corriger les erreurs.');
        process.exit(1);
      }
      
    } catch (error) {
      console.error('\n💥 ERREUR CRITIQUE LORS DE L\'EXÉCUTION DES TESTS:');
      console.error(error.message);
      console.error(error.stack);
      process.exit(1);
    }
  }

  /**
   * Lance les tests avec surveillance des fichiers (mode développement)
   */
  static runTestsWithWatch() {
    console.log('👀 Mode surveillance activé - Les tests se relanceront à chaque modification\n');
    this.runTests();
  }
}

// Exécuter les tests si ce fichier est appelé directement
if (import.meta.url === `file://${process.argv[1]}`) {
  TestRunner.runTests();
}
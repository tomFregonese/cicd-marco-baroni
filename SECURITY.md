# Politique de Sécurité - FR

Ce projet suit une politique de sécurité et de gestion vulnérabilité

## Comment signaler une vulnérabilité

Si vous pensez avoir découvert une faille de sécurité dans ce projet, 
merci de **ne pas ouvrir un ticket public**, une discussion ou une pull request directement.

Veuillez signaler toute vulnérabilité / soucis technique, via l’un des moyens suivants :

- En envoyant un email à notre équipe de sécurité : [security@lesptitsploufs.com](mailto:security@lesptitsploufs.com)

Merci de nous transmettre le plus possible d'informations sur le soucis technique pour nous aider à identifier et corriger le problème efficacement :

- Le type de faille (ex. : injection SQL, XSS...)
- La ou les versions affectées
- L’impact potentiel
- Les étapes pour reproduire la vulnérabilité
- L’emplacement du code concerné (lien Git, branche, commit, etc.)
- Toute configuration nécessaire pour reproduire l’erreur
- Des journaux ou fichiers de log (si possible)
- Un code de preuve de concept ou un exploit minimal (si applicable)

Nous nous engageons à :

- Accuser réception de votre rapport sous 2 jours ouvrés
- Enquêter rapidement
- Vous tenir informé de l’avancement
- Vous mentionner dans le changelog (nous vous le notifirons)

Protocole de réponse aux incidents
Comment isoler le système et redémarrer en toute sécurité :

En cas de compromission ou de suspicion :

## Isoler l'environnement compromis :

-> Déconnecter immédiatement l’instance ou le service du réseau.

-> Arrêter tous les processus suspects.

-> Sauvegarder les journaux avant toute autre action.

# Analyser la situation :

-> Identifier les composants impactés (serveurs, API, base de données…).

-> Comparer les fichiers modifiés avec la version Git la plus récente.

# Redémarrage en toute sécurité :

-> Restaurer une version propre du code à partir d’un commit sûr.

-> Révoquer et régénérer les clés/API tokens compromis.

-> Appliquer les correctifs nécessaires et effectuer un audit de sécurité.

-> Relancer les services en production après validation.

## Versions actuellement supportées

| Version | Supportée           |
| ------- | ------------------- |
| 1.x     | ✅                  |
| < 1.0   | ❌                  |

## Politique de divulgation

Nous vous demandons de nous accorder un **délai raisonnable** pour traiter le problème avant toute publication.

## Conformité

Ce projet suit les pratiques de sécurités de [l’OWASP](https://owasp.org/) et utilise des outils automatisés pour détectés les vulnérabilités.


Merci de votre contribution à la sécurité de ce projet !

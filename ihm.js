let service = require('./service');
let readline = require('readline');

exports.setMenu = function () {
    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let saisieFunction = function (saisie) {
        switch (saisie) {
            case '1':
                service.init(function (nb) {
                    console.log("Rafraichissement des données...")
                    console.log('[init]', nb, 'sessions trouvées.')
                    console.log(" Données mises à jour !\n")
                    rl.question(text, saisieFunction)
                })
                break
            case '2':
                console.log("Liste des sessions :\n")
                //let sessions = service.listerSessions(callback)
                //sessions.array.forEach(sess => console.log(sess))
                rl.question(text, saisieFunction)
                break
            case '99':
                rl.close();
                break
            default:
                console.log("Relis la question !\n")
                rl.question(text, saisieFunction)
        }
    }

    let text = "*************************\n1. Rafraichir les données\n2. Lister les sessions\n99. Quitter\n"
    rl.question(text, saisieFunction)
}





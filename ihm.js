const service = require('./service');
const readline = require('readline');

exports.menu = new class Menu {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.text = "*************************\n1. Rafraichir les données\n2. Lister les sessions\n3. Lister les présentateurs\n4. Rechercher une session\n99. Quitter\n-->"
        service.instance.init()
    }

    launch() { this.rl.question(this.text, this.saisieFunction.bind(this)) }

    saisieFunction(saisie) {
        switch (saisie) {
            case '1':
                service.instance.init().then(nb => {
                    console.log("\nRafraichissement des données...")
                    console.log(`[init] ${nb} sessions trouvées.`)
                    console.log(" Données mises à jour !\n")
                    this.rl.question(this.text, this.saisieFunction.bind(this))
                }).catch(err => console.log(err))
                break
            case '2':
                console.log("\nListe des sessions :\n")
                service.instance.getSessions()
                    .then(sessions => sessions.forEach(sess => console.log(`Session name : ${sess.name}\nSpeakers : ${sess.speakers} \n`)))
                    .then(() => this.rl.question(this.text, this.saisieFunction.bind(this)))
                break
            case '3':
                service.instance.getSpeakers().then(speakers => {
                    console.log()
                    speakers.forEach(s => console.log(s))
                    this.rl.question("\n" + this.text, this.saisieFunction.bind(this))
                }).catch(err => console.log(err))
                break
            case '4':
                this.recherche('1')
                break
            case '99':
                this.rl.close();
                break
            default:
                console.log("\nRelis la question !\n")
                this.rl.question(this.text, this.saisieFunction.bind(this))
        }
    }

    recherche(saisie) {
        switch (saisie) {
            case '1':
                let i = 1
                this.rl.question("\nQuel mot recherchez-vous ?\n-->",
                    word => {
                        console.log()
                        let sessList = service.instance.getSessionsByWord(word)
                        sessList.forEach(sess => console.log(i++ + ". " + sess.name))
                        console.log(i++ + ". Refaire une nouvelle recherche\n" + i + ". Retour au menu principal")
                        this.rl.question("-->", i => {
                            if ((i < 1) || (i > sessList.length + 2) || !(i instanceof Number)) {
                                this.recherche(-1)
                            } else if (i == (sessList.length + 1)) {
                                this.recherche('1')
                            } else if (i == (sessList.length + 2)) {
                                this.rl.question(this.text, this.saisieFunction.bind(this))
                            } else {
                                console.log("\n" + sessList[i - 1].name + "\n" + sessList[i - 1].description)
                                this.recherche('1')
                            }
                        })
                    })
                break
            case '2':
                this.rl.question("\n" + this.text, this.saisieFunction.bind(this))
            default:
                console.log("\nRelis la question !")
                this.rl.question("\n1. Refaire une nouvelle recherche\n2. Retour au menu principal\n-->", this.recherche.bind(this))
        }
    }
}
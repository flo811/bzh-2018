const request = require('request-promise-native')
const jsdom = require('jsdom')
const fs = require('fs')

//module.exports = class

exports.instance = new class Service {
    constructor() {
        this.talks = []
        this.promise1 = request('http://2018.breizhcamp.org/json/talks.json', { json: true })
        this.promise2 = request('http://2018.breizhcamp.org/json/others.json', { json: true })
    }
    async init() {
        return Promise.all([this.promise1, this.promise2])
            .then(tabs => {
                this.talks = []
                tabs.forEach(tab => this.talks = this.talks.concat(tab))
                return this.talks.length
            })
    }
    async getSessions() {
        if (this.talks.length == 0) {
            return this.init().then(() => { return this.talks })
        } else {
            return Promise.resolve(this.talks)
        }
    }
    getSpeakers() {
        return request('https://2018.breizhcamp.org/conference/speakers/')
            .then(body => (new jsdom.JSDOM(body)).window.document.querySelectorAll(".media-heading"))
            .then(speakers => Array.from(speakers).map(speaker => speaker.innerHTML))
    }
    getSessionsByWord(word) {
        let answer = []
        this.talks.filter(sess => sess.name.includes(word)).forEach(sess => answer.push(sess))
        return answer
    }
}
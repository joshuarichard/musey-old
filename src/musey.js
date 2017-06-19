import load from '../data/sets/moma/load/artists.js'

load.push((err, res) => { (err) ? console.log(err.stack) : console.log(res) })

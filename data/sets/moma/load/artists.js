const fs = require('fs')
import postgres from '../../../drivers/postgres'

let load = (cb) => {
  fs.readFile('./data/sets/moma/raw/Artists.json', 'utf8', (err, data) => {
    (err) ?
      cb(new Error(err)) :
      cb(null, JSON.parse(data))
  })
}

let caress = (artists) =>
  artists.map((artist, index, artists) => ({
    momaId: artist.ConstituentID,
    displayName: artist.DisplayName,
    bio: artist.ArtistBio,
    nationality: artist.Nationality,
    gender: artist.Gender,
    born: artist.BeginDate,
    died: artist.EndDate,
    wikiQid: artist['Wiki QID'],
    ulan: artist.ULAN
  }))

let push = (cb) => {
  load((err, artists) => {
    if (err) {
      cb(new Error(err))
    } else {
      let arts = caress(artists)
      let queries = [];

      postgres.connect().then(function() {
        arts.forEach(function(art) {
          queries.push(postgres.query('insert into artists values', art))
        });

        promise.all(queries).then(() => {
          cb(null, 'done!');
        });
      });
    }
  })
}

export default { push }

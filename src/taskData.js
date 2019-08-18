export const getTaskData = () => ({
  title: [
    `Made for Each Other`,
    `Popeye Meets Sinbad`,
    `Sagebrush Trail`,
    `Santa Claus Conquers the Martians`,
    `The Dance of Life`,
    `The Great Flamarion`,
    `The Man with the Golden Arm`
  ][Math.floor(Math.random() * 7)],
  image: `./images/posters/${[
    `made-for-each-other.png`,
    `popeye-meets-sinbad.png`,
    `sagebrush-trail.jpg`,
    `santa-claus-conquers-the-martians.jpg`,
    `the-dance-of-life.jpg`,
    `the-great-flamarion.jpg`,
    `the-man-with-the-golden-arm.jpg`
  ][Math.floor(Math.random() * 7)]}`,
  description: [
    `Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…`,
    `Sentenced for a murder he did not commit, John Brant escapes from prison determined to find the real killer. By chance Brant's narrow escap…`,
    `Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on…`,
    `The Martians Momar ("Mom Martian") and Kimar ("King Martian") are worried that their children Girmar ("Girl Martian") and Bomar ("Boy Marti…`,
    `In this short, Sindbad the Sailor (presumably Bluto playing a "role") proclaims himself, in song, to be the greatest sailor, adventurer and…`,
    `The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback. The Grea…`,
    `John Mason (James Stewart) is a young, somewhat timid attorney in New York City. He has been doing his job well, and he has a chance of bei…`
  ][Math.floor(Math.random() * 7)],
  rating: (1 + Math.random() * (10 + 1 - 1)).toFixed(1),
  year: Math.round(1920 + Math.random() * (2019 + 1 - 1920)),
  genre: [
    `Musical`,
    `Western`,
    `Drama`,
    `Comedy`,
    `Cartoon`,
    `Mystery`
  ][Math.floor(Math.random() * 6)],
  comments: Math.floor(Math.random() * 6),
});

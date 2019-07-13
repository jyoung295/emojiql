const fs = require('fs')
const fetch = require('node-fetch')
const emojiURI = 'https://unpkg.com/emoji.json@1.2.0/emoji.json'

const formatEmojiData = async uri => {
  const origEmojiJson = await fetch(uri).then(response => response.json())

  // TODO:
  // 1. remove 'default'
  // 2. remove char from the end of date values
  // 3. reformat keywords from string to arr
  // 4. remove repetition from name values and reformat name to lowercase
  // 5. for flags add name of flag to keyword array

  origEmojiJson.map((emojiObj, i) => {
    emojiObj.keywords = emojiObj.keywords.split(` | `)
    emojiObj.name = emojiObj.name.split(`\n`)[0].toLowerCase()
    if (emojiObj.keywords.includes(`flag`)) {
      let flagNameArr = emojiObj.name.split(' ')
      emojiObj.keywords = [...emojiObj.keywords, ...flagNameArr]
      emojiObj.keywords.push(emojiObj.name)
    }
    emojiObj.date = emojiObj.date.slice(0, -1)
    delete emojiObj.default
  })
  return { ...origEmojiJson }
}

formatEmojiData(emojiURI).then(formattedEmojiData => {
  fs.writeFile('./data/emoji-data.json', JSON.stringify(formattedEmojiData), err => {
    if (err) return err
  })
})

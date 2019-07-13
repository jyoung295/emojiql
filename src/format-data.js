const fs = require('fs')
const fetch = require('node-fetch')
const emojiURI = 'https://unpkg.com/emoji.json@12.1.0/emoji.json'

const formatEmojiData = async uri => {
  const origEmojiJson = await fetch(uri).then(response => response.json())

  // TODO:
  // 1. create keyword array with the name
  // 1b. for flags remove colon from 'flag:'
  // 2. remove the parentheses content from the category

  origEmojiJson.map((emojiObj, i) => {
    emojiObj.keywords = emojiObj.name.split(` `)
    if (emojiObj.keywords.includes(`flag:`)) {
      emojiObj.keywords[0] = 'flag'
    }
    emojiObj.keywords.push(emojiObj.name)
    emojiObj.category = emojiObj.category.split(' (')[0]
  })
  console.log(origEmojiJson)
  return { ...origEmojiJson }
}

formatEmojiData(emojiURI).then(formattedEmojiData => {
  fs.writeFile('./data/emoji-data.json', JSON.stringify(formattedEmojiData), err => {
    if (err) return err
  })
})

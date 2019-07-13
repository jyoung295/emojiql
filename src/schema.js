const { buildSchema } = require('graphql')
const emojiData = require('../data/emoji-data.json')

exports.schema = buildSchema(`
  type Emoji {
    code: String
    char: String
    name: String
    category: String
    keywords: [String!]
  }

  type Query {
    emojisAll: [Emoji!]!
    emojisByKeyword(keyword: String!): [Emoji!]!
    emojisByCategory(category: String!): [Emoji!]!
  }
`)

exports.rootValue = {
  emojisAll: () => {
    return Object.keys(emojiData).map(key => emojiData[key])
  },
  emojisByKeyword: ({ keyword }) => {
    return Object.keys(emojiData)
      .map(key => emojiData[key])
      .filter(emoji => (emoji.keywords.includes(keyword) ? emoji : null))
  },
  emojisByCategory: ({ category }) => {
    return Object.keys(emojiData)
      .map(key => emojiData[key])
      .filter(emoji => (emoji.category.includes(category) ? emoji : null))
  }
}

const { graphql, buildSchema } = require('graphql')
const emojiData = require('../data/emoji-data.json')

exports.schema = buildSchema(`
  type Emoji {
    no: ID!
    code: String!
    char: String!
    name: String!
    date: String!
    keywords: [String!]!
  }

  type Query {
    emojisAll: [Emoji!]!
    emojisByKeyword(keyword: String!): [Emoji!]!
  }
`)

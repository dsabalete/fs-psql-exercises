const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./readinglist')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, as: 'readings', foreignKey: 'userId', otherKey: 'blogId' })
Blog.belongsToMany(User, { through: ReadingList, as: 'usersWhoRead', foreignKey: 'blogId', otherKey: 'userId' })

User.hasMany(ReadingList)
ReadingList.belongsTo(User)

Blog.hasMany(ReadingList)
ReadingList.belongsTo(Blog)

module.exports = {
    Blog,
    User,
    ReadingList
}
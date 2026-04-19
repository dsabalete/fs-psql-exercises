const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class ReadingList extends Model { }

ReadingList.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'userId is required'
            },
            isInt: {
                msg: 'userId must be an integer'
            },
            min: {
                args: [1],
                msg: 'userId must be a positive integer'
            }
        },
        references: {
            model: 'users',
            key: 'id'
        }
    },
    blogId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'blogId is required'
            },
            isInt: {
                msg: 'blogId must be an integer'
            },
            min: {
                args: [1],
                msg: 'blogId must be a positive integer'
            }
        },
        references: {
            model: 'blogs',
            key: 'id'
        }
    },
    read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'reading_list',
    validate: {
        async validUserId() {
            if (!Number.isInteger(this.userId) || this.userId < 1) {
                return
            }

            const UserModel = sequelize.models.user || sequelize.models.User
            if (!UserModel) {
                throw new Error('User model is not initialized')
            }

            const user = await UserModel.findByPk(this.userId)
            if (!user) {
                throw new Error('userId is invalid')
            }
        },
        async validBlogId() {
            if (!Number.isInteger(this.blogId) || this.blogId < 1) {
                return
            }

            const BlogModel = sequelize.models.blog || sequelize.models.Blog
            if (!BlogModel) {
                throw new Error('Blog model is not initialized')
            }

            const blog = await BlogModel.findByPk(this.blogId)
            if (!blog) {
                throw new Error('blogId is invalid')
            }
        }
    }
})

module.exports = ReadingList

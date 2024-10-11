const { Article } = require('../../models');
const attributes = ['id', 'name', 'content', 'createdAt', 'updatedAt'];
const { Op } = require('sequelize');
const { getPaginatedData } = require('../../utils/response');

/**
 * 获取所有分类
 * @returns {Promise<any>}
 */
exports.getAllArticles = async () => {
    return await Article.findAll({
        attributes: attributes,
        // exclude: ['id'],
        // order: [['id', 'DESC']]
    });
};

/**
 * 创建分类
 * @param {any} categoryData 
 * @returns {Promise<any>}
 */
exports.createArticle = async (articleData) => {
    return await Article.create(articleData, { attributes: attributes });
};

/**
 * 更新分类
 * @param {number} id 
 * @param {any} categoryData 
 * @returns {Promise<any>}
 */
exports.updateArticle = async (id, articleData) => {
    return await Article.update(articleData, { where: { id }, attributes: attributes });
};

/**
 * 删除分类
 * @param {number} id 
 * @returns {Promise<any>}
 */
exports.deleteArticle = async (id) => {
    return await Article.destroy({ where: { id }, attributes: attributes });
};

/**
 * 获取分类
 * @param {number} id 
 * @returns {Promise<any>}
 */
exports.getArticleById = async (id) => {
    return await Article.findByPk(id, { attributes: attributes });
}


/**
 * 通过名称获取分类
 * @param {*} name 
 * @returns 
 */

exports.getArticlesByName = async (name, currentPage, pageSize) => {
    const where = { name: { [Op.like]: `%${name}%` } };
    return getPaginatedData(Article, where, attributes, currentPage, pageSize);
}


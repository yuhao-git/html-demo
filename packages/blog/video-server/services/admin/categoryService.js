const { Category } = require('../../models');
const attributes = ['id', 'name', 'rank', 'createdAt', 'updatedAt'];
const { Op } = require('sequelize');

/**
 * 获取所有分类
 * @returns {Promise<any>}
 */
exports.getAllCategories = async () => {
    return await Category.findAll({
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
exports.createCategory = async (categoryData) => {
    return await Category.create(categoryData, { attributes: attributes });
};

/**
 * 更新分类
 * @param {number} id 
 * @param {any} categoryData 
 * @returns {Promise<any>}
 */
exports.updateCategory = async (id, categoryData) => {
    return await Category.update(categoryData, { where: { id }, attributes: attributes });
};

/**
 * 删除分类
 * @param {number} id 
 * @returns {Promise<any>}
 */
exports.deleteCategory = async (id) => {
    return await Category.destroy({ where: { id }, attributes: attributes });
};

/**
 * 获取分类
 * @param {number} id 
 * @returns {Promise<any>}
 */
exports.getCategoryById = async (id) => {
    return await Category.findByPk(id, { attributes: attributes });
}


/**
 * 通过名称获取分类
 * @param {*} name 
 * @returns 
 */
exports.getCategoryByName = async (name) => {
    return await Category.findAll({ where: { name: { [Op.like]: `%${name}%` } }, attributes: attributes });
}

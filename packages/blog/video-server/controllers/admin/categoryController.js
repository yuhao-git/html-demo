const CategoryService = require('../../services/admin/categoryService');
const { success, failure } = require('../../utils/response');
/**
 * 获取所有分类
 * @param {Request} req 
 * @param {Response} res 
 */
exports.list = async (req, res) => {
    try {
        const categories = await CategoryService.getAllCategories();
        success(res, categories);
    } catch (error) {
        failure(res, error);
    }
};

/**
 * 创建分类
 * @param {Request} req 
 * @param {Response} res 
 */
exports.create = async (req, res) => {
    try {
        const { name, rank } = req.body;
        const category = await CategoryService.createCategory({ name, rank });
        success(res, { message: '创建成功', data: category });
    } catch (error) {
        failure(res, error);
    }
};

/**
 * 更新分类
 * @param {Request} req 
 * @param {Response} res 
 */
exports.update = async (req, res) => {
    try {
        const { id, name, rank } = req.body;
        const categoryExists = await CategoryService.getCategoryById(id);
        if (!categoryExists) {
            throw new Error('参数错误，分类不存在！');
        }
        await CategoryService.updateCategory(id, { name, rank });
        success(res, { message: '更新成功' });
    } catch (error) {
        failure(res, error.message);
    }
};

/**
 * 删除分类
 * @param {Request} req 
 * @param {Response} res 
 */
exports.delete = async (req, res) => {
    try {
        const { id } = req.body;
        await CategoryService.deleteCategory(id);
        const categoryExists = await CategoryService.getCategoryById(id);
        if (!categoryExists) {
            throw new Error('参数错误，分类不存在！');
        }
        success(res, { message: '删除成功' });
    } catch (error) {
        failure(res, error.message);
    }
};

/**
 * 通过ID获取分类
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getById = async (req, res) => {
    try {
        const { id } = req.body;
        const category = await CategoryService.getCategoryById(id);
        if (!category) {
            throw new Error('参数错误，分类不存在！');
        }
        success(res, category);
    } catch (error) {
        failure(res, error.message);
    }
};


/**
 * 通过名称获取分类
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getByName = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await CategoryService.getCategoryByName(name);
        success(res, category);
    } catch (error) {
        failure(res, error.message);
    }
}
const ArticleService = require('../../services/admin/articleService');
const { success, failure } = require('../../utils/response');
/**
 * 获取所有文章
 * @param {Request} req 
 * @param {Response} res 
 */
exports.list = async (req, res) => {
    try {
        const articles = await ArticleService.getAllArticles();
        success(res, articles);
    } catch (error) {
        failure(res, error);
    }
};

/**
 * 创建文章
 * @param {Request} req 
 * @param {Response} res 
 */
exports.create = async (req, res) => {
    try {
        const { name, rank } = req.body;
        const article = await ArticleService.createArticle({ name, rank });
        success(res, { message: '创建成功', data: article });
    } catch (error) {
        failure(res, error);
    }
};

/**
 * 更新文章
 * @param {Request} req 
 * @param {Response} res 
 */
exports.update = async (req, res) => {
    try {
        const { id, name, rank } = req.body;
        const articleExists = await ArticleService.getArticleById(id);
        if (!articleExists) {
            throw new Error('参数错误，文章不存在！');
        }
        await ArticleService.updateArticle(id, { name, rank });
        success(res, { message: '更新成功' });
    } catch (error) {
        failure(res, error.message);
    }
};

/**
 * 删除文章
 * @param {Request} req 
 * @param {Response} res 
 */
exports.delete = async (req, res) => {
    try {
        const { id } = req.body;
        const articleExists = await ArticleService.getArticleById(id);
        if (!articleExists) {
            throw new Error('参数错误，文章不存在！');
        }
        await ArticleService.deleteArticle(id);
        success(res, { message: '删除成功' });
    } catch (error) {
        failure(res, error.message);
    }
};

/**
 * 通过ID获取文章
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getById = async (req, res) => {
    try {
        const { id } = req.body;
        const article = await ArticleService.getArticleById(id);
        if (!article) {
            throw new Error('参数错误，文章不存在！');
        }
        success(res, article);
    } catch (error) {
        failure(res, error.message);
    }
};


/**
 * 通过名称获取文章
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getByName = async (req, res) => {
    try {
        const { name = '', pageSize, currentPage } = req.body;
        const articles = await ArticleService.getArticlesByName(name, currentPage, pageSize);
        success(res, articles);
    } catch (error) {
        failure(res, error.message);
    }
}
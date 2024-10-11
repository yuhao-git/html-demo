
/**
 * 成功响应
 * @param {Response} res 
 * @param {any} data 
 */
function success(res, data) {
    res.json({
        code: 200,
        msg: data.message,
        data: data.data
    });
}

/**
 * 失败响应
 * @param {Response} res 
 * @param {string} message 
 * @param {number} code 
 */
function failure(res, message, code = 400) {
    if (message.name === "SequelizeUniqueConstraintError") {
        res.status(code).json({
            code: code,
            message: message.errors.map(error => error.message)
        });
    }
    else if (message.name === "SequelizeConnectionRefusedError") {
        res.status(code).json({
            code: code,
            message: [message.message]
        });
    }
    else if (message.name === "SequelizeDatabaseError") {
        res.status(code).json({
            code: code,
            message: [message.message]
        });
    } else {
        res.status(code).json({
            code: code,
            message: [message]
        });
    }
}

/**
 * 错误响应
 * @param {Response} res 
 * @param {string} message 
 * @param {number} code 
 */
function error(res, message, code = 500) {
    res.status(code).json({
        code: code,
        message: message
    });
}

/**
 * 分页响应格式
 * @param {Response} res 
 * @param {number} page 
 * @param {number} pageSize 
 * @param {number} total 
 * @param {any} data 
 */
function pagination(res, page, pageSize, total, data) {
    res.json({
        code: 200,
        data: data,
        page: page,
        pageSize: pageSize,
        total: total
    });
}

/**
 * 分页查询数据方法
 * @param {Model} model 
 * @param {object} where 
 * @param {array} attributes 
 * @param {number} currentPage 
 * @param {number} pageSize 
 * @param {boolean} useNativeSQL 
 * @returns 
 */
const getPaginatedData = async (model, where, attributes, currentPage = 1, pageSize = 10, useNativeSQL = false) => {
    const numericPageSize = parseInt(pageSize, 10);
    const offset = (currentPage - 1) * numericPageSize;
    let data;
    let totalCount;

    if (useNativeSQL) {
        const query = `SELECT ${attributes.join(', ')} FROM ${model.tableName} WHERE ${Object.keys(where).map((key, index) => `${key} = :${index}`).join(' AND ')} LIMIT :limit OFFSET :offset`;
        data = await model.sequelize.query(query, {
            replacements: {
                ...Object.keys(where).reduce((acc, key, index) => {
                    acc[`:${index}`] = where[key];
                    return acc;
                }, {}),
                ':limit': numericPageSize,
                ':offset': offset
            },
            type: model.sequelize.QueryTypes.SELECT
        });

        const countQuery = `SELECT COUNT(*) FROM ${model.tableName} WHERE ${Object.keys(where).map((key, index) => `${key} = :${index}`).join(' AND ')}`;
        totalCount = await model.sequelize.query(countQuery, {
            replacements: Object.keys(where).reduce((acc, key, index) => {
                acc[`:${index}`] = where[key];
                return acc;
            }, {}),
            type: model.sequelize.QueryTypes.SELECT
        })[0].count;
    } else {
        data = await model.findAll({
            where: where,
            attributes: attributes,
            offset: offset,
            limit: numericPageSize
        });
        totalCount = await model.count({ where: where });
    }

    const pagination = {
        currentPage: currentPage,
        pageSize: pageSize,
        totalCount: totalCount
    }
    return { data, pagination };
}



module.exports = {
    success,
    failure,
    error,
    pagination,
    getPaginatedData
};

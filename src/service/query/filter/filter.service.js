const { Op } = require("sequelize");
/**
 * Middleware for handling pagination and search queries.
 * Modifies `req.queryOptions` with the generated options.
 *
 * @param {object} req - HTTP request object.
 * @param {object} res - HTTP response object.
 * @param {function} next - Function to continue to the next middleware.
 */
function filterPagination(req, res, next) {
  const { search, include, limit, offset, pagination } = req.query;
  const queryOptions = {};

  //COURSE FILTER
  // TODO: Create a filter for course duration
  // Search configuration for courses
  if (req.baseUrl == "/courses") {
    if (search) {
      queryOptions.where = {
        [Op.or]: [
          { title: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } },
          { location: { [Op.iLike]: `%${search}%` } },
          { tags: { [Op.iLike]: `%${search}%` } },
        ],
      };
    }
  }

  // Search for minimum and maximum course costs
  const priceFilters = [];

  if (req.query.minPrice && !isNaN(req.query.minPrice)) {
    // Add price filter for minimum cost
    priceFilters.push({
      price: { [Op.gte]: parseFloat(req.query.minPrice) },
    });
  }

  if (req.query.maxPrice && !isNaN(req.query.maxPrice)) {
    // Add price filter for maximum price
    priceFilters.push({
      price: { [Op.lte]: parseFloat(req.query.maxPrice) },
    });
  }

  // If priceFilters contains filters, apply them with Op.and
  if (priceFilters.length > 0) {
    if (queryOptions.where) {
      queryOptions.where = {
        [Op.and]: [queryOptions.where, ...priceFilters],
      };
    } else {
      queryOptions.where = { [Op.and]: priceFilters };
    }
  }

  // COURSE CLASSIFICATION FILTER
  // Area
  if (req.query.area) {
    const areasArray = req.query.area.split(',');

    queryOptions.where.area = {
      [Op.in]: areasArray
    };
  }
  // Mode
  if (req.query.mode) {
    const modeArray = req.query.mode.split(',');
    queryOptions.where.mode = {
      [Op.in]: modeArray
    }
  }
  //Level
  if (req.query.level) {
    const levelArray = req.query.level.split(',')
    queryOptions.where.level = {
      [Op.in]: levelArray
    }
  }

  // USER FILTER:
  // Search configuration for users
  if (req.baseUrl == "/users") {
    if (search) {
      queryOptions.where = {
        [Op.or]: [
          { firstName: { [Op.iLike]: `%${search}%` } },
          { lastName: { [Op.iLike]: `%${search}%` } },
          //TODO: The search should only be for course suppliers
        ],
      };
    }
  }

  // COMMENT FILTER:
  // Search configuration for comments
  if (req.baseUrl == "/comments") {
    if (search) {
      queryOptions.where = {
        [Op.or]: [{ content: { [Op.iLike]: `%${search}%` } }],
      };
    }
  }

  // Handling relationships using `include`
  if (include) {
    if (Array.isArray(include)) {
      queryOptions.include = include.map((relation) => {
        return { association: relation };
      });
    } else {
      queryOptions.include = { association: include };
    }
  }
  // Pagination setup
  if (pagination === "true") {
    queryOptions.limit = limit && !isNaN(limit) ? parseInt(limit, 10) : 10;
    queryOptions.offset = offset && !isNaN(offset) ? parseInt(offset, 10) : 0;
  } else {
    delete queryOptions.limit;
    delete queryOptions.offset;
  }
  // Attach the query options to the request object
  req.queryOptions = queryOptions;
  next();
}
module.exports = { filterPagination };

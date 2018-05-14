const _ = require("lodash");

const groupDatesById = (results) =>  _(results)
    .groupBy((resultObject) => resultObject.property_id.N)
    .mapValues((datesByProperty) => datesByProperty.map((property) => property.date.S))
    .value();

exports.default = groupDatesById;

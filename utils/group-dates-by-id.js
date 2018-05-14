const _ = require("lodash");

const groupDatesById = (resuls) =>  _(resuls)
    .groupBy((resultObject) => resultObject.property_id.N)
    .mapValues((datesByProperty) => datesByProperty.map((property) => property.date.S))
    .value();

exports.default = groupDatesById;

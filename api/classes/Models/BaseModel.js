const category = require('../../models/category');

class BaseModel {


    async isExist(params) {

        let modelRefObj = params.modelRef;
        let query = params.query
        let data = await modelRefObj.findOne(query)
        return data != null
    }

    async insertData(params) {

        let modelRefObj = params.modelRef;
        let dataToInsert = params.data
        let arrayOfData = await modelRefObj.insertMany(dataToInsert)
        return arrayOfData

    }

    async getDataWithPagination(params) {

        let limit = params.limit;
        let skip = params.offset * limit;
        let modelRefObj = params.modelRef;
        let arrayOfData = await modelRefObj.find({}).skip(skip).limit(limit);
        return arrayOfData;

    }

    async getDataWithPaginationAndJoin(params) {

        let limit = params.limit;
        let skip = params.offset * limit;
        let modelRefObj = params.modelRef;
        let modelToJoinRefObj = params.modelToJoinRef

        let arrayOfData = await modelRefObj.find()
            .populate(`${modelToJoinRefObj}`)
            .skip(skip)
            .limit(limit);

        return arrayOfData;

    }

    async searchDataWithField(params) {

        let fieldName = params.fieldName;
        let fieldValue = params.fieldValue;
        let modelRefObj = params.modelRef
        let limit = params.limit;
        let skip = params.offset * limit
        let objOfData = await modelRefObj.find({ [`${fieldName}`]: fieldValue }).skip(skip).limit(limit)
        return objOfData

    }


    async searchDataWithFieldAndJoin(params) {

        let fieldName = params.fieldName;
        let fieldValue = params.fieldValue;
        let modelRefObj = params.modelRef
        let modelToJoinRefObj = params.modelToJoinRef
        let limit = params.limit;
        let skip = params.offset * limit
        let objOfData = await modelRefObj.find({ [`${fieldName}`]: fieldValue })
            .populate(`${modelToJoinRefObj}`)
            .skip(skip)
            .limit(limit)

        return objOfData
    }

}

module.exports = BaseModel
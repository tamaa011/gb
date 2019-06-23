const category = require('../../models/category');
const mongoose = require('mongoose');

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
    async createData(params) {

        let modelRefObj = params.modelRef;
        let dataToInsert = params.data;
        let _id = new mongoose.Types.ObjectId()
        let data = await modelRefObj.create({ ...dataToInsert, _id: _id })
        return data
    }

    getMongooseId(id) {
        return new mongoose.Types.ObjectId()

    }
    async replaceData(params) {

        let modelRefObj = params.modelRef;
        let dataToInsert = params.data
        let query = params.query
        let arrayOfData = await modelRefObj.replaceOne(query, dataToInsert)
        return arrayOfData

    }

    async deleteData(params) {

        let modelRefObj = params.modelRef;
        let query = params.query
        let data = await modelRefObj.remove(query)
        return data != null

    }

    async updateData(params) {

        let modelRefObj = params.modelRef;
        let query = params.query;
        let updatedData = params.data
        let updateResult = await modelRefObj.updateOne(query, updatedData);
        return updateResult

    }

    async getDataWithQuery(params) {

        let modelRefObj = params.modelRef;
        let query = params.query;
        let arrayOfData = await modelRefObj.find(query)
        return arrayOfData;

    }

    async getDataWithQueryAndJoin(params) {

        let modelRefObj = params.modelRef;
        let modelToJoinRefObj = params.modelToJoinRef
        let query = params.query;
        let arrayOfData

        if (params.normalJson)
            arrayOfData = await modelRefObj.find(query).populate(`${modelToJoinRefObj}`).lean()

        if (!params.normalJson)
            arrayOfData = await modelRefObj.find(query).populate(`${modelToJoinRefObj}`)

        return arrayOfData;

    }

    async getDataWithPagination(params) {

        let limit = params.limit;
        let skip = params.offset * limit;
        let modelRefObj = params.modelRef;
        let arrayOfData = await modelRefObj.find().skip(skip).limit(limit);
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

    async getDataWithQueryPaginationAndJoin(params) {

        let limit = params.limit;
        let skip = params.offset * limit;
        let modelRefObj = params.modelRef;
        let modelToJoinRefObj = params.modelToJoinRef
        let query = params.query;
        
        let arrayOfData = await modelRefObj.find(query)
            .populate(`${modelToJoinRefObj}`)
            .skip(skip)
            .limit(limit);

        return arrayOfData;

    }
    
    async getDataWithPaginationAndSort(params) {

        let limit = params.limit;
        let skip = params.offset * limit;
        let modelRefObj = params.modelRef;
        let sortField = params.sortField;
        let sortOrder = params.sortOrder
        let arrayOfData = await modelRefObj.find()
            .sort({ [`${sortField}`]: `${sortOrder}` })
            .skip(skip)
            .limit(limit);

        return arrayOfData;

    }

    async getDataWithPaginationAndJoinAndSort(params) {

        let limit = params.limit;
        let skip = params.offset * limit;
        let modelRefObj = params.modelRef;
        let modelToJoinRefObj = params.modelToJoinRef
        let arrayOfData = await modelRefObj.find()
            .sort(params.sortObj)
            .populate(`${modelToJoinRefObj}`)
            .skip(skip)
            .limit(limit);

        return arrayOfData;

    }

    async searchDataWithField(params) {

        let fieldName = params.fieldName;
        let fieldValue = params.fieldValue;
        let modelRefObj = params.modelRef
        let sortField = params.sortField;
        let sortOrder = params.sortOrder
        let limit = params.limit;
        let skip = params.offset * limit
        let objOfData = await modelRefObj
            .find({ [`${fieldName}`]: fieldValue })
            .skip(skip)
            .limit(limit)
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

    async searchDataWithFieldAndJoinAndSort(params) {

        let fieldName = params.fieldName;
        let fieldValue = params.fieldValue;
        let modelRefObj = params.modelRef
        let sortField = params.sortField;
        let sortOrder = params.sortOrder
        let limit = params.limit;
        let skip = params.offset * limit
        let objOfData = await modelRefObj
            .find({ [`${fieldName}`]: fieldValue })
            .sort({ [`${sortField}`]: sortOrder })
            .skip(skip)
            .limit(limit)


        return objOfData

    }


    async likeSearchDataWithFieldAndJoinAndSort(params) {

        let fieldName = params.fieldName;
        let fieldValue = params.fieldValue;
        let modelRefObj = params.modelRef
        let sortField = params.sortField;
        let sortOrder = params.sortOrder
        let limit = params.limit;
        let skip = params.offset * limit
        let objOfData = await modelRefObj
            .find({ [`${fieldName}`]: { $regex: '.*' + `${fieldValue}` + '.*' } })
            .sort({ [`${sortField}`]: sortOrder })
            .skip(skip)
            .limit(limit)


        return objOfData

    }
    async mathOperation(params) {

        let result = await params.modelRef.aggregate(
            [
                { $match: { [`${params.idField}`]: { $in: [mongoose.Types.ObjectId(params.idValue)] } } },
                { $group: { _id: `$${params.idField}`, hallsAverageRating: { [`$${params.operation}`]: `$${params.operationField}` } } }
            ]
        )

        return result;
    }

}

module.exports = BaseModel
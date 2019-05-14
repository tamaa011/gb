class BaseModel {

    async getDataObjectWithPagination(params) {

        try {

            let limit = params.limit;
            let skip = params.offset * limit;
            let modelRefObj = params.modelRef;
            let arrayOfData = await modelRefObj.find({}).skip(skip).limit(limit);
            return arrayOfData;

        } catch (error) {

            throw error
        }

    }

    async searchDataObjectWithField(params) {

        try {

            let fieldName = params.fieldName;
            let fieldValue = params.fieldValue;
            let modelRefObj = params.modelRef
            let limit = params.limit;
            let skip = params.offset * limit
            let objOfData = await modelRefObj.find({ [`${fieldName}`]: fieldValue }).skip(skip).limit(limit)
            return objOfData

        } catch (error) {
            throw error
        }


    }
}

module.exports = BaseModel
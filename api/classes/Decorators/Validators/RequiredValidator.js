const BaseDecorators = require("../BaseDecorators");

class RequiredValidator extends BaseDecorators {

    decoratorAction(targetMethodParams, decoratorParams) {

        let ValidationObj = targetMethodParams[0];
        for (let index = 0; index < decoratorParams.length; index++)
            if (!ValidationObj[decoratorParams[index]] || !ValidationObj[decoratorParams[index]].length)
                throw new Error(`${decoratorParams[index]} is required`)
    }

}

module.exports = (params) => new RequiredValidator().decorator(params)


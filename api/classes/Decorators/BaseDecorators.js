class BaseDecorators {

    decorator(decoratorParams) {

        let self = this;

        return function (target, key, descriptor) {

            let originalMethod = descriptor.value

            descriptor.value = function (...args) {

                try {

                    self.decoratorAction(args, decoratorParams);

                    return originalMethod.apply(this, args);

                } catch (error) {

                    console.log(error);
                    error.message = JSON.parse(error.message)
                    throw error
                }

            }

            return descriptor
        }

    }

    decoratorAction(targetMethodParams, decoratorParams) {

        throw new Error('decoratorAction is not implmented')
    }
}

module.exports = BaseDecorators
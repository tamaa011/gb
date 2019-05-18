const bcrypt = require('bcrypt');

class EncryptService {

    async hashText(plainText) {

        let hasedData = await bcrypt.hash(plainText, 10);
        return hasedData

    }

    async compareHashWithPlain(hasedText, plainText) {
        let result = await bcrypt.compare(plainText, hasedText)
        return result

    }

}

module.exports = new EncryptService();
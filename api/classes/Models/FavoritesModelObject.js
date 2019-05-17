const BaseModel = require("./BaseModel");
const favorites = require('../../models/favorites');

class FavoritesModelObject extends BaseModel {

    constructor() {
        super();
        this.modelRef = favorites
    }

}
module.exports = FavoritesModelObject
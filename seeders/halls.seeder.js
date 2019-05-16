var Seeder = require('mongoose-data-seed').Seeder;
const hall = require('../api/models/hall');


var data = [
    {
        "hallImage": [
            "15566401434381556493101800Banquet-hall.jpg",
            "15566401469681556491837123Ballroom-Wedding-hall-cover.jpg"
        ],
        "_id": "5cc87195568caa0024f6f741",
        "hallName": "test 2",
        "hallCategory": "5cdca5d543947c1d60058c49",
        "hallAdress": "helwan",
        "hallDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt re eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        "hallPrice": "2000",
        "hallLocationLong": "265555",
        "hallLocationLat": "5556655",
        "hallSpecialOffers": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        "hallPhoneNumber": "01143327612",
    },
    {
        "hallImage": [
            "1556640298230Ambience-Golf-Drive.jpg",
            "1556640301816Glenoaks-Ballroom-by-LA-Banquets-wedding-Glendale-CA-193891-orig_main.1508967464.jpg",
            "1556640303430Laneway ceremony high res-1755x878.jpg",
            "1556640312753Le Foyer Ballroom Los Angeles Wedding Venues and Banquet Halls in North Hollywood(31).jpg"
        ],
        "_id": "5cc87244568caa0024f6f743",
        "hallName": "test 4",
        "hallCategory": "5cdca5d543947c1d60058c49",
        "hallAdress": "helwan",
        "hallDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        "hallPrice": "2000",
        "hallLocationLong": "265555",
        "hallLocationLat": "5556655",
        "hallSpecialOffers": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        "hallPhoneNumber": "01143327612",
    },
    {
        "hallImage": [
            "1556640357013Glenoaks-Ballroom-by-LA-Banquets-wedding-Glendale-CA-193891-orig_main.1508967464.jpg",
            "1556640359046Laneway ceremony high res-1755x878.jpg",
            "15566403700171556491837123Ballroom-Wedding-hall-cover.jpg",
            "15566403719541556493101800Banquet-hall.jpg",
            "1556640373087Ambience-Golf-Drive.jpg"
        ],
        "_id": "5cc87275568caa0024f6f744",
        "hallName": "test 5",
        "hallCategory": "5cdca5d543947c1d60058c49",
        "hallAdress": "helwan",
        "hallDescription": "Lorem ipsum dolor sit amet, ",
        "hallPrice": "2000",
        "hallLocationLong": "265555",
        "hallLocationLat": "5556655",
        "hallSpecialOffers": "Lorem ipsum dolor sit amet, ",
        "hallPhoneNumber": "01143327612",
    },
    {
        "hallImage": [
            "15566405505971556491837123Ballroom-Wedding-hall-cover.jpg",
            "15566405547291556493101800Banquet-hall.jpg",
            "1556640557714Ambience-Golf-Drive.jpg",
            "1556640558566Glenoaks-Ballroom-by-LA-Banquets-wedding-Glendale-CA-193891-orig_main.1508967464.jpg",
            "1556640558991Laneway ceremony high res-1755x878.jpg",
            "1556640566285Le Foyer Ballroom Los Angeles Wedding Venues and Banquet Halls in North Hollywood(31).jpg"
        ],
        "_id": "5cc87341568caa0024f6f745",
        "hallName": "test 6",
        "hallCategory": "5cdca5d543947c1d60058c49",
        "hallAdress": "helwan",
        "hallDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        "hallPrice": "2000",
        "hallLocationLong": "265555",
        "hallLocationLat": "5556655",
        "hallSpecialOffers": "Lorem ipsum dolor sit amet, ",
        "hallPhoneNumber": "01143327612",
    },
    {
        "hallImage": [],
        "_id": "5cc95150ed46270024c80cd3",
        "hallName": "test 6",
        "hallCategory": "5cdca5d543947c1d60058c49",
        "hallAdress": "helwan",
        "hallDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        "hallPrice": "2000",
        "hallLocationLong": "265555",
        "hallLocationLat": "5556655",
        "hallSpecialOffers": "Lorem ipsum dolor sit amet, ",
        "hallPhoneNumber": "01143327612",
    },
    {
        "hallImage": [
            "1556697443062Asset 1.png",
            "1556697443252Asset 2.png"
        ],
        "_id": "5cc95163ed46270024c80cd4",
        "hallName": "test 6",
        "hallCategory": "5cdca5d543947c1d60058c49",
        "hallAdress": "helwan",
        "hallDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        "hallPrice": "2000",
        "hallLocationLong": "265555",
        "hallLocationLat": "5556655",
        "hallSpecialOffers": "Lorem ipsum dolor sit amet, ",
        "hallPhoneNumber": "01143327612",
    },
    {
        "hallImage": [
            "1556698355530Asset 1.png",
            "1556698355683Asset 2.png"
        ],
        "_id": "5cc954f4ed46270024c80cd5",
        "hallName": "asdf",
        "hallCategory": "5cdca5d543947c1d60058c49",
        "hallAdress": "sdf",
        "hallDescription": "sdfsd",
        "hallPrice": "2000",
        "hallLocationLong": "1455",
        "hallLocationLat": "424242",
        "hallSpecialOffers": "fghghfgh",
        "hallPhoneNumber": "011",
    },
    {
        "hallImage": [
            "1556698628448Asset 1.png",
            "1556698628597Asset 2.png"
        ],
        "_id": "5cc95604ed46270024c80cd7",
        "hallName": "asdf",
        "hallCategory": "5cdca5d543947c1d60058c49",
        "hallAdress": "sdf",
        "hallDescription": "sdfsd",
        "hallPrice": "2000",
        "hallLocationLong": "1455",
        "hallLocationLat": "424242",
        "hallSpecialOffers": "fghghfgh",
        "hallPhoneNumber": "011",
    },
    {
        "hallImage": [
            "1556742612628Asset 1.png",
            "1556742612755Asset 2.png"
        ],
        "_id": "5cca01d40f36610024af56bb",
        "hallName": "asdf",
        "hallCategory": "5cdca5d543947c1d60058c49",
        "hallAdress": "sdf",
        "hallDescription": "sdfsd",
        "hallPrice": "2000",
        "hallLocationLong": "1455",
        "hallLocationLat": "424242",
        "hallSpecialOffers": "fghghfgh",
        "hallPhoneNumber": "011",
    },
    {
        "hallImage": [
            "1556747294014154756.jpg",
            "1556747294742images.jpeg"
        ],
        "_id": "5cca141e0f36610024af56bc",
        "hallName": "Crolla Wedding Hall",
        "hallCategory": "5cdca5d543947c1d60058c49",
        "hallAdress": "Madinet Al Hawamdeyah, Al Hawamdeyah, Giza Governorate",
        "hallDescription": "In hotel wedding hall",
        "hallPrice": "23000",
        "hallLocationLong": "1333321.32212",
        "hallLocationLat": "31231123.3191293",
        "hallSpecialOffers": "ay offer",
        "hallPhoneNumber": " 0111 674 7449",
    }
]

var HallsSeeder = Seeder.extend({
    shouldRun:async function () {
        await hall.deleteMany({})
        console.log(await hall.find({}));
        return hall.countDocuments().exec().then(count => count === 0);
    },
    run: async function () {
        
        return hall.create(data);
    }
});

module.exports = HallsSeeder;
var Seeder = require('mongoose-data-seed').Seeder;
const roleActions = require('../api/models/rolesActions');
const mongoose = require('mongoose');

var data = [

    {
        role: "root",
        _id: mongoose.Types.ObjectId('5cf93d7712d19e20dc2ccb8f'),
        actions: {
            Halls: [
                "Add New Hall",
                "List All Halls",
                "BackGround List Halls Categories",
                "Search For Hall",
                "BackGround Filter By Category",
                "Updata Hall",
                "Delete Hall",
                "Add Category"
            ],
            Users: [
                "Add New User",
                "List All Users",
                "Delete User"
            ],
            Admin: [
                "Add New User",
                "List All Admins",
                "Update User Role",
                "Change password",
                "Delete Admin",
                "BackGround List Roles",
                "BackGround Delete Admin",
                "List Feedbacks",
                "Push Notification",
                "Add Privacy Policy And Service Terms",
            ],

        },

        sideNavActions: {
            "Halls": [
                "List halls",
                "List halls by category",
                "Search for hall",
                "List halls categories",
                "Add new hall"
            ],
            "Users": [
                "List all users"
            ],
            "Admins": [
                "List system admins",
                "Add new admin"
            ],
            "Other": [
                "List users feedback",
                "Send notification",
                "Privacy policy",
                "Terms of service"
            ]
        }
    },
    {
        role: "admin",
        _id: mongoose.Types.ObjectId('5cf93d7712d19e20dc2ccb91'),
        actions: {
            Halls: [
                "Add New Hall",
                "List All Halls",
                "BackGround List Halls Categories",
                "BackGround Filter By Category",
                "Search For Hall",
                "Updata Hall",
                "Add Category",
            ],
            Users: [
                "Add New User",
                "List All Users",
            ],

            Admin: [
                "Add New User",
                "List All Users",
                "Update User Role",
                "Change password",
                "List Feedbacks"
            ]
        },

        sideNavActions: {
            "Halls": [
                "List halls",
                "List halls by category",
                "Search for hall",
                "List halls categories",
                "Add new hall"
            ],
            "Users": [
                "List all users"
            ],
            "Admins": [
                "List system admins",
                "Add new admin"
            ],
            "Other": [
                "List users feedback",
            ]
        }
    },
    {
        role: "worker",
        _id: mongoose.Types.ObjectId('5cf93d7712d19e20dc2ccb93'),
        actions: {
            Halls: [

                "List All Halls",
                "BackGround List Halls Categories",
                "BackGround Filter By Category",
                "Search For Hall",
            ],
            Admin: [
                "Change password",
                "List Feedbacks"
            ]
        },
        sideNavActions: {
            "Halls": [
                "List halls",
                "List halls by category",
                "Search for hall",
                "List halls categories",
            ],
            "Other": [
                "List users feedback",
            ]
        }
    },
    {
        role: "user",
        _id: mongoose.Types.ObjectId('5cf93d7712d19e20dc2ccb95'),
        actions: {
            Halls: [
                "List All Halls",
                "BackGround List Halls Categories",
                "Search For Hall",
                "Rate Hall",
                "Add Favorite",
                "Remove Favorite",
                "List Favorites"
            ],
            Users: [
                "Change password",
                "Update Basic Info"
            ]
        }
    }
]

var RoleActionsSeeder = Seeder.extend({
    shouldRun: async function () {
        await roleActions.deleteMany()
        return roleActions.countDocuments().exec().then(count => count === 0);
    },
    run: async function () {

        return roleActions.create(data);
    }
});

module.exports = RoleActionsSeeder
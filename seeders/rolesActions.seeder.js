var Seeder = require('mongoose-data-seed').Seeder;
const roleActions = require('../api/models/rolesActions');

var data = [

    {
        role: "root",
        actions: {
            Halls: [
                "Add New Hall",
                "List All Halls",
                "BackGround List Halls Categories",
                "Search For Hall",
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
                "Push Notification",

            ]
        },
    },
    {
        role: "admin",
        actions: {
            Halls: [
                "Add New Hall",
                "List All Halls",
                "BackGround List Halls Categories",
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
                "Update Roles",
                "Change password",
            ]
        },
    },
    {
        role: "worker",
        actions: {
            Halls: [

                "List All Halls",
                "BackGround List Halls Categories",
                "Search For Hall",
            ],
            Admin: [
                "Change password",
            ]
        }
    },
    {
        role: "user",
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
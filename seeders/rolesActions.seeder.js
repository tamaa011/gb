var Seeder = require('mongoose-data-seed').Seeder;
const roleActions = require('../api/models/rolesActions');

var data = [
    {
        role: "root",
        actions: [
            {
                name: "delete hall"
            },
            {
                name: "update hall"
            },

            {
                name: "list halls"
            },
            {
                name: "create hall"
            },
            {
                name: 'view hall detail'
            },
            {
                name: "push notification"
            },
            {
                name: 'delete user'
            },
            {
                name: 'view user details'

            },
            {
                name: 'list users'
            },
            {
                name: 'change password'
            },

        ]
    },
    {
        role: "admin",
        actions: [

            {
                name: "update hall"
            },
            {
                name: "list halls"
            },
            {
                name: "create hall"
            },
            {
                name: 'view hall detail'
            },
            {
                name: "push notification"
            },
            {
                name: 'list users'
            },
            {
                name: 'view user details'

            },
            {
                name: 'change password'
            },
        ]
    },
    {
        role: "worker",
        actions: [
            {
                name: 'change password'

            },
            {
                name: 'list users'
            },
            {
                name: 'view hall detail'
            },
            {
                name: "list halls"
            },
            {
                name: 'view user details'

            },

        ]
    },
    {
        role : "user",
        actions :[
            {
                name : 'change password'
            },
            {
                name: 'view hall detail'
            },
            {
                name: 'list halls'
            },
            {
                name: 'add favoritel'
            },
            {
                name: 'remove favorite'
            },
        ]
    }
]

var RoleActionsSeeder = Seeder.extend({
    shouldRun: async function () {
        return roleActions.countDocuments().exec().then(count => count === 0);
    },
    run: async function () {

        return roleActions.create(data);
    }
});

module.exports = RoleActionsSeeder
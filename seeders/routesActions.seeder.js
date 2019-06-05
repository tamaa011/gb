var Seeder = require('mongoose-data-seed').Seeder;
const routeActions = require('../api/models/routeActions');

var data = [

    {
        route: '/users',
        actions: "List All Users"
    },
    {
        route: '/users/updatePassword',
        actions: 'Change password'

    },

    {
        route: '/users/delete',
        actions: 'Delete User'

    },

    {
        route: '/roles/listRoles',
        actions: 'BackGround List Roles'

    },

    {
        route: '/rating/rateHalls',
        actions: 'Rate hall'
    },

    {
        route: '/notification/pushNotification',
        actions: 'Push Notification'
    },
    {
        route: '/halls/listHalls',
        actions: 'List All Halls'
    },

    {
        route: '/halls',
        actions: 'Add New Hall'
    },

    {
        route: '/halls/update',
        actions: 'Updata Hall'
    },


    {
        route: '/halls/delete',
        actions: 'Delete Hall'
    },

    {
        route: '/halls/deActivate',
        actions: 'deActivate hall'
    },

    {
        route: '/halls/activate',
        actions: 'activate hall'
    },

    {
        route: '/favorites/addToFavorites',
        actions: 'Add Favorite'
    },

    {
        route: '/favorites/deleteFromFavorites',
        actions: 'Remove favorite'
    },
    {
        route: '/favorites/deleteFromFavorites',
        actions: 'Remove favorite'
    },
]

var RouteActionsSeeder = Seeder.extend({
    shouldRun: async function () {
        await routeActions.deleteMany()
        return routeActions.countDocuments().exec().then(count => count === 0);
    },
    run: async function () {

        return routeActions.create(data);
    }
});

module.exports = RouteActionsSeeder
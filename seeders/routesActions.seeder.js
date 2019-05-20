var Seeder = require('mongoose-data-seed').Seeder;
const routeActions = require('../api/models/routeActions');

var data = [

    {
        route: '/users',
        actions: 'list users'
    },
    {
        route: '/users/updatePassword',
        actions: 'change password'

    },
    {
        route: '/users/getUser',
        actions: 'view user details'

    },

    {
        route: '/users/delete',
        actions: 'delete user'

    },

    {
        route: '/rating/rateHalls',
        actions: 'rate hall'
    },

    {
        route: '/notification/pushNotification',
        actions: 'push notification'
    },

    {
        route: '/halls',
        actions: 'create hall'
    },

    {
        route: '/halls/update',
        actions: 'update hall'
    },

    {
        route: '/halls/getHall',
        actions: 'view hall detail'
    },

    {
        route: '/halls/delete',
        actions: 'delete hall'
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
        actions: 'add favorite'
    },

    {
        route: '/favorites/deleteFromFavorites',
        actions: 'remove favorite'
    },
]

var RouteActionsSeeder = Seeder.extend({
    shouldRun: async function () {
        return routeActions.countDocuments().exec().then(count => count === 0);
    },
    run: async function () {

        return routeActions.create(data);
    }
});

module.exports = RouteActionsSeeder
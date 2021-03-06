var Seeder = require('mongoose-data-seed').Seeder;
const routeActions = require('../api/models/routeActions');

var data = [

    {
        route: '/users/',
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
        route: '/users/addUser',
        actions: 'Add New User'

    },
    {
        route: '/users/listSystemUsers',
        actions: 'List All Admins'

    },
    {
        route: '/users/deleteAdmin',
        actions: 'Delete Admin'

    },
    {
        route: '/users/updateBasicInfo',
        actions: 'Update Basic Info'

    },
    {
        route: '/users/updateRole',
        actions: 'Update User Role'

    },
    
    {
        route: '/roles/listRoles',
        actions: 'BackGround List Roles'

    },
    {
        route: '/halls/',
        actions: 'Add New Hall'
    },
    {
        route: '/rating/rateHalls',
        actions: 'Rate Hall'
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
        route: '/halls/searchByName',
        actions: 'Search For Halls'
    },
    {
        route: '/halls/searchByName',
        actions: 'Search For Halls'
    },

    {
        route: '/halls/searchByCategory',
        actions: 'BackGround Filter By Category'
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
        route: '/category/addCategory',
        actions: 'Add Category'
    },

    {
        route: '/category/listCategories',
        actions: 'BackGround List Halls Categories'
    },

    {
        route: '/policyAndPrivacy/addPolicyAndPrivacy',
        actions: 'Add Privacy Policy And Service Terms'
    },

    {
        route: '/favorites/addToFavorites',
        actions: 'Add Favorite'
    },

    {
        route: '/favorites/deleteFromFavorites',
        actions: 'Remove Favorite'
    },
    {
        route: '/feedback/listFeedback',
        actions: 'List Feedbacks'
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
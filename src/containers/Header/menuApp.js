export const adminMenu = [
    { 
        // User manage
        name: 'menu.admin.user',
        menus: [
            {
                name: 'menu.admin.manage-admin', link: '/system/user-redux'
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'
            }, 
            {
                name: 'menu.admin.manage-schedule', link: '/system/manage-schedule'
            }, 
            // {
            //     name: 'menu.admin.crud-redux', link: '/system/user-manage'
            // }
        ]

    },
    { 
        // Speciality manage
        name: 'menu.admin.speciality',
        menus: [
            {
                name: 'menu.admin.manage-admin', link: '/system/manage-admin'
            },
            
        ]

    },
    { 
        // User manage
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.admin.manage-admin', link: '/system/manage-admin'
            }
        ]

    },
    { 
        // User manage
        name: 'menu.admin.handbook',
        menus: [
            {
                name: 'menu.admin.manage-admin', link: '/system/manage-admin'
            }
        ]

    }
];
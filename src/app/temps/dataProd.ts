export var listaProductos = [

    {
        name: 'Alma mora',
        id: '001',
        price: 320,
        description: 'Vino 750ml',
        stock: 30,
        demand: false,
        image: 'assets/img/jeg.jpg'
    },
    {
        name: 'Alma mora',
        id: '002',
        price: 320,
        description: 'Vino 750ml',
        stock: 30,
        demand: false,
        image: 'assets/img/jeg.jpg'
    },{
        name: 'Alma mora',
        id: '003',
        price: 320,
        description: 'Vino 750ml',
        stock: 30,
        demand: false,
        image: 'assets/img/jeg.jpg'
    },{
        name: 'Alma mora',
        id: '004',
        price: 320,
        description: 'Vino 750ml',
        stock: 30,
        demand: false,
        image: 'assets/img/jeg.jpg'
    },



];


export var listaCat = [
    {
        id: '001', 
        name: 'Vinos',
        view: true,
        subs: [
            {
                id: '001-1',
                name: 'Malbec',
                view: true
            },
            {
                id: '001-2',
                name: 'Cabernet',
                view: true
            },
            {
                id: '001-3',
                name: 'Blanco',
                view: true
            },
            {
                id: '001-4',
                name: 'Dulce',
                view: true
            },

        ]
    },
    {
        id: '002', 
        name: 'Cervezas',
        view: true,
        subs: [
            {
                id: '002-1',
                name: 'Industrializada',
                view: true
            },
            {
                id: '002-2',
                name: 'Artesanal',
                view: true
            }
        ]
    },
    {
        id: '003', 
        name: 'Whiskey',
        view: true,
        subs: [
            {
                id: '003-1',
                name: 'Nacional',
                view: true
            },
            {
                id: '003-2',
                name: 'Importado',
                view: true
            }
        ]
    },
    {
        id: '005', 
        name: 'Otras Bebidas',
        view: true,
        subs: [
            {
                id: '005-1',
                name: 'Vodka',
                view: true
            },
            {
                id: '005-2',
                name: 'Vermut',
                view: true
            },
            {
                id: '005-2',
                name: 'Ron',
                view: true
            },
            {
                id: '005-2',
                name: 'Gin',
                view: true
            }
        ]
    },
    {
        id: '006', 
        name: 'Combos',
        view: true
    },
    
    {
        id: '007', 
        name: 'Otros',
        view: true,
        subs: [
            {
                id: '007-1',
                name: 'Delicatesen',
                view: true
            },
            {
                id: '007-2',
                name: 'Snack',
                view: true
            },
            {
                id: '007-2',
                name: 'Golosinas',
                view: true
            }
        ]
    },
]
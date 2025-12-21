export const POOLS = [
    {
        id: '1',
        name: 'Piscine Municipale Centre',
        address: '12 Rue de la Paix, Paris',
        type: 'Public',
        lastMaintenance: '2023-10-25',
        status: 'Active',
        image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=500',
    },
    {
        id: '2',
        name: 'Résidence Les Palmiers',
        address: '45 Avenue des Palmiers, Nice',
        type: 'Privée',
        lastMaintenance: '2023-10-20',
        status: 'Maintenance',
        image: 'https://images.unsplash.com/photo-1562778612-e1e0cda9915c?auto=format&fit=crop&q=80&w=500',
    },
    {
        id: '3',
        name: 'Club Sportif Alpha',
        address: '8 Boulevard du Sport, Lyon',
        type: 'Club',
        lastMaintenance: '2023-10-26',
        status: 'Active',
        image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=500',
    },
];

export const EMPLOYEES = [
    {
        id: '1',
        name: 'Ahmed Benali',
        phone: '+33 6 12 34 56 78',
        languages: ['Français', 'Arabe'],
        status: 'Disponible',
        avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=200',
    },
    {
        id: '2',
        name: 'Sarah Connor',
        phone: '+33 6 98 76 54 32',
        languages: ['Anglais', 'Français', 'Espagnol'],
        status: 'Occupé',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    },
    {
        id: '3',
        name: 'John Doe',
        phone: '+33 6 11 22 33 44',
        languages: ['Anglais'],
        status: 'Disponible',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200',
    },
];

export const TASKS = [
    {
        id: '1',
        title: 'Nettoyage filtres',
        date: '2023-10-27',
        time: '09:00',
        description: 'Nettoyer les filtres de la pompe principale.',
        poolId: '1',
        employeeId: '1',
        status: 'En cours',
    },
    {
        id: '2',
        title: 'Analyse pH',
        date: '2023-10-27',
        time: '14:00',
        description: 'Vérifier et ajuster le niveau de pH.',
        poolId: '2',
        employeeId: '2',
        status: 'À faire',
    },
    {
        id: '3',
        title: 'Réparation carrelage',
        date: '2023-10-28',
        time: '10:00',
        description: 'Remplacer les carreaux cassés au fond.',
        poolId: '3',
        employeeId: null,
        status: 'À faire',
    },
];

export const CLIENTS = [
    {
        id: '1',
        name: 'Jean Dupont',
        email: 'jean.dupont@email.com',
        phone: '+33 6 00 00 00 01',
        address: '12 Rue de la Paix, Paris',
        type: 'Particulier',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    },
    {
        id: '2',
        name: 'Marie Martin',
        email: 'marie.martin@email.com',
        phone: '+33 6 00 00 00 02',
        address: '45 Avenue des Palmiers, Nice',
        type: 'Professionnel',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
    },
    {
        id: '3',
        name: 'Pierre Durand',
        email: 'pierre.durand@email.com',
        phone: '+33 6 00 00 00 03',
        address: '8 Boulevard du Sport, Lyon',
        type: 'Particulier',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    },
];

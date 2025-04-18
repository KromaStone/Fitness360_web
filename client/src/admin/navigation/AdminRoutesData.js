
export const RoutesData = [
    {
        title: "Dashboard",
        icon: "material-symbols:home-rounded",
        path: "/admin/dashboard",
    },
    {
        title: "Users",
        icon: "mdi:clipboard-user",
        path: "/admin/user",
    },
    {
        title: "Trainer",
        icon: "mdi:folder-user",
        path: "/admin/trainer",
    },
    {
        title: "Workout",
        icon: "material-symbols-light:exercise",
        path: "/admin/workout",
    },
    {
        title: "Product",
        icon: "ix:product-management",
        path: "/admin/product",
    },
    {
        title: "Plans",
        icon: "ic:baseline-discount",
        path: "/admin/plans",
        children: [
            { title: "Yoga Plans", path: "/admin/plans", icon: "mdi:cart-discount", },
            { title: "XYZ Plans", path: "/admin/dashboard", icon: "mdi:cloud-discount", },
        ],
    },
    {
        title: "Settings",
        icon: "material-symbols:settings-rounded",
        path: "/settings",
    },
];

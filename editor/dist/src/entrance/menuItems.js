/** Функция возвращает массив данных для генерации меню выше формы */
export function getMenuItems(regMenuMsg) {
    return [
        { to: '/reg', label: regMenuMsg.reg },
        { to: '/enter', label: regMenuMsg.enter },
        { to: '/reset-password', label: regMenuMsg.reset }
    ];
}
//# sourceMappingURL=menuItems.js.map
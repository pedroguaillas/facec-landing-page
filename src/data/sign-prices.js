/**
 * Precios base de la Firma Electrónica
 * quantity + period identifican cada plan; savings = 0 si no hay promo activa
 */
export const pricings = [
    {
        quantity: 7,
        period: "dias",
        normalPrice: 7.77,
        promoPrice: 7.77,
        savings: 0,
        currency: "USD",
    },
    {
        quantity: 30,
        period: "dias",
        normalPrice: 9.99,
        promoPrice: 9.99,
        savings: 0,
        currency: "USD",
    },
    {
        quantity: 1,
        period: "año",
        normalPrice: 18.18,
        promoPrice: 18.18,
        savings: 0,
        currency: "USD",
    },
    {
        quantity: 2,
        period: "años",
        normalPrice: 29.29,
        promoPrice: 24.90,
        savings: 4.39,
        currency: "USD",
    },
    {
        quantity: 3,
        period: "años",
        normalPrice: 39.39,
        promoPrice: 33.48,
        savings: 5.91,
        currency: "USD",
    },
    {
        quantity: 4,
        period: "años",
        normalPrice: 49.49,
        promoPrice: 42.07,
        savings: 7.42,
        currency: "USD",
    },
    {
        quantity: 5,
        period: "años",
        normalPrice: 59.59,
        promoPrice: 50.65,
        savings: 8.94,
        currency: "USD",
    },
];

/**
 * Promoción activa de Mes de la Mujer — Marzo 2026
 */
const promoMesMujer = {
    id: "firma-marzo-2026",
    active: true,
    period: {
        startDate: "2026-03-11",
        endDate: "2026-03-31",
    },
    // Solo los planes anuales tienen descuento; "period" aquí es la cantidad de años
    pricings: pricings
        .filter((p) => p.period === "años" && p.savings > 0)
        .map((p) => ({ ...p, period: p.quantity })),
    display: {
        badge: "15% OFF",
        title: "Promoción Día de la Mujer",
        subtitle: "Firma Electrónica de dos años por $24.90",
        urgency: "Solo válido en marzo 2026",
        highlight: "¡Hasta $8.94 USD de ahorro!",
    },
    terms: [
        "Válido solo para compras en marzo 2026",
        "No acumulable con otras promociones",
    ],
};

/**
 * Retorna la promoción activa si estamos dentro de su periodo, o undefined
 */
export const getCurrentPromotion = () => {
    const now = new Date();
    const start = new Date(promoMesMujer.period.startDate);
    const end = new Date(promoMesMujer.period.endDate + "T23:59:59");

    return promoMesMujer.active && now >= start && now <= end
        ? promoMesMujer
        : undefined;
};

/**
 * Días restantes de la promoción (0 si ya expiró)
 */
export const getDaysRemaining = (promo) => {
    const diff = new Date(promo.period.endDate + "T23:59:59") - new Date();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
};

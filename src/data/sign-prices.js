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
        normalPrice: 18.11,
        promoPrice: 18.11,
        savings: 0,
        currency: "USD",
    },
    {
        quantity: 2,
        period: "años",
        normalPrice: 28.18,
        promoPrice: 28.18,
        savings: 0,
        currency: "USD",
    },
    {
        quantity: 3,
        period: "años",
        normalPrice: 37.23,
        promoPrice: 37.23,
        savings: 0,
        currency: "USD",
    },
    {
        quantity: 4,
        period: "años",
        normalPrice: 46.29,
        promoPrice: 46.29,
        savings: 0,
        currency: "USD",
    },
    {
        quantity: 5,
        period: "años",
        normalPrice: 54.34,
        promoPrice: 54.34,
        savings: 0,
        currency: "USD",
    },
];

/**
 * Promoción activa de Semana Santa — Abril 2026
 */
const promoSemanaSanta = {
    id: "firma-semana-santa-2026",
    active: true,
    period: {
        startDate: "2026-04-01",
        endDate: "2026-04-06",
    },
    // Planes anuales (1-5 años) con descuento
    pricings: pricings
        .filter((p) => (p.period === "año" || p.period === "años") && p.savings > 0)
        .map((p) => ({ ...p, period: p.quantity })),
    display: {
        badge: "15% OFF",
        title: "Promoción Semana Santa",
        subtitle: "Firma Electrónica de dos años por $24.90",
        urgency: "Solo válido del 1 al 6 de abril 2026",
        highlight: "¡Hasta $8.94 USD de ahorro!",
    },
    terms: ["Válido solo del 1 al 6 de abril 2026", "No acumulable con otras promociones"],
};

/**
 * Retorna la promoción activa si estamos dentro de su periodo, o undefined
 */
export const getCurrentPromotion = () => {
    const now = new Date();
    const start = new Date(promoSemanaSanta.period.startDate);
    const end = new Date(promoSemanaSanta.period.endDate + "T23:59:59");

    return promoSemanaSanta.active && now >= start && now <= end ? promoSemanaSanta : undefined;
};

/**
 * Días restantes de la promoción (0 si ya expiró)
 */
export const getDaysRemaining = (promo) => {
    const diff = new Date(promo.period.endDate + "T23:59:59") - new Date();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
};

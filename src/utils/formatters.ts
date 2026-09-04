import confetti from 'canvas-confetti';
import { BCV_EXCHANGE_RATE } from '../data/mockData';
import { CartItem, DeliveryMethod, PaymentMethod } from '../types';

export const formatUSD = (val: number): string => {
  return `$${val.toFixed(2)}`;
};

export const formatBS = (valUSD: number): string => {
  const bs = valUSD * BCV_EXCHANGE_RATE;
  return formatBSDirect(bs);
};

export const formatBSDirect = (bs: number): string => {
  const parts = bs.toFixed(2).split('.');
  const intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const decPart = parts[1];
  return `Bs. ${intPart},${decPart}`;
};

export const triggerConfetti = () => {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#5DBB63', '#82C91E', '#FFA500', '#1E3A8A', '#ffffff'],
    });
  } catch (e) {
    console.log('Confetti triggered', e);
  }
};

export const generateWhatsAppOrderLink = ({
  items,
  subtotal,
  discount,
  deliveryCost,
  total,
  deliveryMethod,
  paymentMethod,
  ticketsEarned,
  storeName,
  deliveryAddress,
  notes,
}: {
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryCost: number;
  total: number;
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
  ticketsEarned: number;
  storeName: string;
  deliveryAddress: string;
  notes?: string;
}): string => {
  const paymentMethodLabels: Record<PaymentMethod, string> = {
    cashea: 'Cashea (Cuotas sin interés)',
    pagomovil: 'Pago Móvil BDV / Banesco',
    giftcard: 'Gift Card Digital Aikoz',
    zelle: 'Zelle / Tarjetas Internacionales',
  };

  const deliveryLabels: Record<DeliveryMethod, string> = {
    delivery: `Delivery Express (${deliveryAddress})`,
    pickup: `Pick-up en Tienda (${storeName})`,
  };

  const itemsList = items
    .map(
      (item) =>
        `• ${item.quantity}x ${item.product.name} - ${formatUSD(
          item.product.priceUSD * item.quantity
        )}`
    )
    .join('\n');

  const text = `🛒 *NUEVO PEDIDO - AIKOZ HIPERMERCADO*
🏪 *Sede:* ${storeName}
🛵 *Modalidad:* ${deliveryLabels[deliveryMethod]}

📦 *PRODUCTOS:*
${itemsList}

💵 *Subtotal:* ${formatUSD(subtotal)}
🏷️ *Descuentos/Cupones:* -${formatUSD(discount)}
🛵 *Envío:* ${deliveryCost === 0 ? '¡GRATIS!' : formatUSD(deliveryCost)}
💰 *TOTAL A PAGAR:* ${formatUSD(total)} / ${formatBS(total)}
(Tasa oficial BCV: Bs. ${BCV_EXCHANGE_RATE.toFixed(2)}/$)

💳 *Método de Pago:* ${paymentMethodLabels[paymentMethod]}
🎟️ *Boletos Sorteo 0 KM generados:* ${ticketsEarned} Boletos Digitales
${notes ? `\n📝 *Nota:* ${notes}` : ''}

¡Hola Aikoz! Deseo confirmar este pedido para su despacho.`;

  return `https://wa.me/584140000000?text=${encodeURIComponent(text)}`;
};

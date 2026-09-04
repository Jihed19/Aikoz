import React, { useState } from 'react';
import {
  ArrowLeft,
  Car,
  Check,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Gift,
  HelpCircle,
  Lock,
  Minus,
  Plus,
  PlusCircle,
  Share2,
  ShoppingBag,
  Sparkles,
  Tag,
  Trash2,
  Truck,
  Smartphone,
  Building,
  Ticket,
} from 'lucide-react';
import { BCV_EXCHANGE_RATE } from '../data/mockData';
import { CartItem, Coupon, DeliveryMethod, PaymentMethod, Product, StoreLocation, UserProfile } from '../types';
import { formatBS, formatUSD, generateWhatsAppOrderLink, triggerConfetti } from '../utils/formatters';
import { AikozLogo } from './AikozLogo';

interface CarritoViewProps {
  cart: CartItem[];
  user: UserProfile;
  currentStore: StoreLocation;
  appliedCoupons: Coupon[];
  onBack: () => void;
  onUpdateQuantity: (product: Product, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onApplyCouponCode: (code: string) => boolean;
  onAddBoosterProduct: () => void;
  onOrderSuccess: (orderData: any) => void;
}

export const CarritoView: React.FC<CarritoViewProps> = ({
  cart,
  user,
  currentStore,
  appliedCoupons,
  onBack,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onApplyCouponCode,
  onAddBoosterProduct,
  onOrderSuccess,
}) => {
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cashea');
  const [useClubPoints, setUseClubPoints] = useState(true);
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  // Calculations
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.priceUSD * item.quantity,
    0
  );

  // Raffle calculation: $30 per ticket + extra ticket if at least 3 Aikoz brand products
  const aikozBrandCount = cart
    .filter((item) => item.product.isAikozBrand)
    .reduce((acc, item) => acc + item.quantity, 0);
  const baseTicketsFromOrder = Math.floor(subtotal / 30);
  const bonusAikozTicket = aikozBrandCount >= 3 ? 1 : 0;
  const orderTicketsEarned = Math.max(
    subtotal >= 25 ? 2 : 1, // as shown in screenshot: "Esta orden genera 2 Boletos"
    baseTicketsFromOrder + bonusAikozTicket
  );

  // Progress to next ticket:
  const raffleTarget = 30.0;
  const raffleCurrent = subtotal >= raffleTarget ? (subtotal % raffleTarget) : subtotal;
  const raffleRemaining = Math.max(0, raffleTarget - raffleCurrent);
  const rafflePercent = Math.min(100, Math.round((raffleCurrent / raffleTarget) * 100));

  // Delivery fee logic
  const baseDeliveryCost = deliveryMethod === 'delivery' ? 2.50 : 0.00;
  const hasFreeDeliveryCoupon = appliedCoupons.some(
    (c) => c.discountType === 'delivery'
  );
  const deliveryDiscount = (deliveryMethod === 'delivery' && hasFreeDeliveryCoupon) ? 2.50 : 0.00;
  const effectiveDeliveryFee = Math.max(0, baseDeliveryCost - deliveryDiscount);

  // Points discount: $1.00 off for 100 points
  const pointsDiscount = useClubPoints ? 1.00 : 0.00;

  // Total discounts
  const totalDiscount = deliveryDiscount + pointsDiscount;
  const finalTotal = Math.max(0, subtotal + baseDeliveryCost - totalDiscount);

  // Cashea 3 installments
  const casheaFirstPayment = finalTotal / 4;
  const casheaInstallment = casheaFirstPayment;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = onApplyCouponCode(couponInput.trim());
    if (success) {
      setCouponSuccess(`¡Cupón "${couponInput.toUpperCase()}" aplicado con éxito!`);
      setCouponError('');
      setCouponInput('');
      triggerConfetti();
    } else {
      setCouponError('Cupón inválido o no cumple con el monto mínimo.');
      setCouponSuccess('');
    }
  };

  const handleConfirmOrder = () => {
    triggerConfetti();
    setShowConfirmationModal(true);
  };

  return (
    <div className="pb-36 bg-slate-50 min-h-screen">
      {/* 1. TOP HEADER */}
      <div className="sticky top-0 z-40 bg-white border-b border-slate-100 px-4 py-3 shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              id="btn-cart-back"
              onClick={onBack}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-base font-black text-slate-900 leading-tight">
                Mi Carrito & Pagar
              </h1>
              <span className="text-[11px] text-slate-400 block">
                {currentStore.name} • Despacho Inmediato
              </span>
            </div>
          </div>
          <span className="bg-emerald-100 text-[#0F7638] text-xs font-black px-2.5 py-1 rounded-full">
            🛍 {totalItemsCount} Ítems
          </span>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-center gap-2 mt-3 pt-2 border-t border-slate-100 text-xs font-bold">
          <div className="flex items-center gap-1 text-[#0F7638]">
            <span className="w-5 h-5 rounded-full bg-[#0F7638] text-white flex items-center justify-center text-[10px] font-black">
              1
            </span>
            <span>Carrito</span>
          </div>
          <span className="w-6 h-0.5 bg-[#0F7638]/40"></span>
          <div className="flex items-center gap-1 text-slate-400">
            <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px]">
              2
            </span>
            <span>Entrega</span>
          </div>
          <span className="w-6 h-0.5 bg-slate-200"></span>
          <div className="flex items-center gap-1 text-slate-400">
            <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px]">
              3
            </span>
            <span>Pago</span>
          </div>
        </div>
      </div>

      {cart.length === 0 ? (
        <div className="px-4 py-16 text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#0F7638] mx-auto flex items-center justify-center">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-base font-black text-slate-800">
            Tu carrito está vacío
          </h2>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Explora nuestros pasillos y agrega productos con precios oficiales BCV para participar en el Sorteo 0 KM.
          </p>
          <button
            onClick={onBack}
            className="mt-2 px-6 py-2.5 bg-[#0F7638] text-white rounded-full text-xs font-black shadow-md"
          >
            Ir a Comprar
          </button>
        </div>
      ) : (
        <div className="px-4 pt-3 space-y-4">
          {/* 2. DELIVERY SELECTOR */}
          <div className="bg-slate-200/80 p-1 rounded-2xl grid grid-cols-2 gap-1 text-xs font-black">
            <button
              id="btn-method-delivery"
              onClick={() => setDeliveryMethod('delivery')}
              className={`py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                deliveryMethod === 'delivery'
                  ? 'bg-white text-[#0F7638] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>Delivery Express</span>
            </button>

            <button
              id="btn-method-pickup"
              onClick={() => setDeliveryMethod('pickup')}
              className={`py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                deliveryMethod === 'pickup'
                  ? 'bg-white text-[#0F7638] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building className="w-4 h-4" />
              <span>Pick-up Venecia</span>
              <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-sm">
                GRATIS
              </span>
            </button>
          </div>

          {/* 3. RAFFLE MILESTONE CARD WITH BOOSTER BUTTON */}
          <div
            id="card-cart-sorteo-progress"
            className="bg-linear-to-br from-[#1E3A8A] via-[#1E40AF] to-[#0F172A] text-white rounded-3xl p-4 shadow-md relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#FFA500] text-slate-950 flex items-center justify-center text-[9px] font-black">
                  ★
                </span>
                <span className="text-[9px] font-black tracking-wider uppercase text-amber-200">
                  CAMPAÑA OFICIAL AIKOZ
                </span>
              </div>
              <span className="text-[10px] text-blue-200 font-bold uppercase">
                GRAN RIFA 0 KM
              </span>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center">
                <Car className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <h3 className="text-xs font-black tracking-tight text-white leading-tight">
                  Meta: Manos al Volante
                </h3>
                <span className="text-[10px] text-blue-100">
                  ¡Suma boletos para el Sedán 2025!
                </span>
              </div>
            </div>

            {/* Progress labels */}
            <div className="flex items-center justify-between text-[11px] font-bold mb-1">
              <span>Llevas {formatUSD(subtotal)}</span>
              <span className="text-amber-300">
                Meta {formatUSD(raffleTarget)} ({orderTicketsEarned} Boleto{orderTicketsEarned > 1 ? 's' : ''})
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-black/30 rounded-full h-2.5 overflow-hidden p-0.5 mb-2.5">
              <div
                className="bg-linear-to-r from-[#FFA500] to-emerald-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${rafflePercent}%` }}
              />
            </div>

            {/* Booster quick-add button */}
            <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/10 text-xs">
              <span className="text-[11px] text-blue-100">
                ⊕ Faltan solo <strong className="text-white">{formatUSD(raffleRemaining)}</strong> para 1 boleto...
              </span>
              <button
                id="btn-quick-booster"
                onClick={onAddBoosterProduct}
                className="bg-[#FFA500] hover:bg-amber-400 text-slate-950 px-3 py-1 rounded-full text-[11px] font-black flex items-center gap-1 shadow-xs active:scale-95 transition-all shrink-0"
              >
                <span>+ $1.50 Galleta</span>
                <span>🍪</span>
              </button>
            </div>
          </div>

          {/* 4. ARTÍCULOS EN TU ORDEN */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black text-slate-900">
                Artículos en tu orden
              </h2>
              <button
                id="btn-clear-cart"
                onClick={onClearCart}
                className="text-xs font-bold text-slate-400 hover:text-red-600 transition-colors"
              >
                Limpiar todo
              </button>
            </div>

            <div className="space-y-2.5">
              {cart.map((item) => {
                const itemTotal = item.product.priceUSD * item.quantity;
                return (
                  <div
                    key={item.product.id}
                    id={`cart-item-${item.product.id}`}
                    className="bg-white rounded-2xl p-3 border border-slate-100 shadow-2xs flex items-center gap-3 relative"
                  >
                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-xl bg-slate-50 overflow-hidden shrink-0 relative">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                      {item.product.badge && (
                        <span className="absolute top-1 left-1 bg-[#FFA500] text-slate-900 text-[7px] font-black px-1 rounded-sm uppercase">
                          {item.product.badge.split(' ')[0]}
                        </span>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] font-bold text-emerald-700 uppercase block">
                        {item.product.brand}
                      </span>
                      <h4 className="text-xs font-bold text-slate-800 truncate leading-tight">
                        {item.product.name}
                      </h4>
                      <div className="mt-1">
                        <span className="text-sm font-black text-slate-900">
                          {formatUSD(itemTotal)}
                        </span>
                        <span className="text-[10px] text-slate-400 block -mt-0.5">
                          {formatBS(itemTotal)} ({formatUSD(item.product.priceUSD)} c/u)
                        </span>
                      </div>
                    </div>

                    {/* Stepper + Delete */}
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-slate-300 hover:text-red-500 p-1 transition-colors"
                        title="Eliminar producto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
                        <button
                          onClick={() => onUpdateQuantity(item.product, item.quantity - 1)}
                          className="w-6 h-6 rounded-md bg-white flex items-center justify-center text-slate-700 hover:bg-slate-200 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-black px-2 text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product, item.quantity + 1)}
                          className="w-6 h-6 rounded-md bg-[#0F7638] text-white flex items-center justify-center hover:bg-[#0D622F] transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5. CUPONES Y PUNTOS CLUB */}
          <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-2xs space-y-3">
            <div className="flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-emerald-600" />
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wide">
                Cupones y Puntos Club
              </h3>
            </div>

            {/* Input Form */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                id="input-cart-coupon"
                type="text"
                placeholder="Código de cupón..."
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold uppercase outline-hidden focus:border-[#0F7638] focus:bg-white"
              />
              <button
                type="submit"
                id="btn-apply-coupon-cart"
                className="bg-[#0F7638] hover:bg-[#0D622F] text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shrink-0"
              >
                Aplicar
              </button>
            </form>

            {couponSuccess && (
              <span className="text-[11px] text-emerald-700 font-bold block">
                {couponSuccess}
              </span>
            )}
            {couponError && (
              <span className="text-[11px] text-red-600 font-bold block">
                {couponError}
              </span>
            )}

            {/* Active Coupon Banner */}
            {hasFreeDeliveryCoupon && (
              <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-extrabold block leading-tight">
                      Cupón &quot;DELIVERY-GRATIS&quot; aplicado
                    </span>
                    <span className="text-[10px] text-emerald-700">
                      Ahorras $2.50 en costo de envío
                    </span>
                  </div>
                </div>
                <span className="font-black text-emerald-700">-$2.50</span>
              </div>
            )}

            {/* Club Points Checkbox */}
            <label className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={useClubPoints}
                onChange={(e) => setUseClubPoints(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded-sm text-[#0F7638] focus:ring-[#0F7638]"
              />
              <div className="flex-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">
                    Canjear 100 Puntos Aikoz
                  </span>
                  <span className="font-black text-emerald-700">-$1.00</span>
                </div>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Descuento directo de $1.00 en caja ({user.clubPoints} disponibles)
                </span>
              </div>
            </label>

            {/* Sorteo Ticket Counter in Cart */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-blue-900 font-bold">
                <Ticket className="w-4 h-4 text-blue-600" />
                <span>Boletos acumulados para el carro:</span>
              </div>
              <span className="font-black text-[#1E3A8A] bg-blue-50 px-2 py-0.5 rounded-md">
                {orderTicketsEarned} Boletos
              </span>
            </div>
          </div>

          {/* 6. MÉTODO DE PAGO MULTIMONEDA */}
          <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-[#0F7638]" />
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wide">
                  Método de Pago
                </h3>
              </div>
              <span className="bg-emerald-50 text-[#0F7638] text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                MULTIMONEDA
              </span>
            </div>

            <div className="space-y-2">
              {/* Option 1: Cashea */}
              <label
                id="radio-pay-cashea"
                className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'cashea'
                    ? 'bg-blue-50/60 border-blue-500 ring-1 ring-blue-500'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="cashea"
                    checked={paymentMethod === 'cashea'}
                    onChange={() => setPaymentMethod('cashea')}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-black text-slate-900">
                        Cashea (Cuotas Sin Interés)
                      </span>
                      <span className="bg-blue-100 text-blue-800 text-[8px] font-black px-1.5 py-0.5 rounded-sm uppercase">
                        POPULAR
                      </span>
                    </div>
                    <span className="text-[11px] text-blue-700 block mt-0.5 font-medium">
                      Paga hoy {formatUSD(casheaFirstPayment)} y 3 cuotas cada 14 días
                    </span>
                  </div>
                </div>
                <div className="w-7 h-7 rounded-md bg-blue-600 text-white flex items-center justify-center font-black text-xs">
                  C
                </div>
              </label>

              {/* Option 2: Pago Móvil */}
              <label
                id="radio-pay-pagomovil"
                className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'pagomovil'
                    ? 'bg-emerald-50/60 border-emerald-500 ring-1 ring-emerald-500'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="pagomovil"
                    checked={paymentMethod === 'pagomovil'}
                    onChange={() => setPaymentMethod('pagomovil')}
                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                  />
                  <div>
                    <span className="text-xs font-black text-slate-900 block">
                      Pago Móvil BDV / Banesco
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      Tasa Oficial BCV: Bs. {BCV_EXCHANGE_RATE.toFixed(2)} / USD
                    </span>
                  </div>
                </div>
                <Smartphone className="w-5 h-5 text-emerald-600" />
              </label>

              {/* Option 3: Gift Card */}
              <label
                id="radio-pay-giftcard"
                className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'giftcard'
                    ? 'bg-emerald-50/60 border-emerald-500 ring-1 ring-emerald-500'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="giftcard"
                    checked={paymentMethod === 'giftcard'}
                    onChange={() => setPaymentMethod('giftcard')}
                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-black text-slate-900">
                        Gift Card Digital Aikoz
                      </span>
                      <span className="bg-emerald-100 text-emerald-800 text-[8px] font-black px-1.5 py-0.5 rounded-sm uppercase">
                        DISPONIBLE
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      Saldo disponible: {formatUSD(user.giftCardBalance)}
                    </span>
                  </div>
                </div>
                <Gift className="w-5 h-5 text-[#FFA500]" />
              </label>

              {/* Option 4: Zelle */}
              <label
                id="radio-pay-zelle"
                className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'zelle'
                    ? 'bg-purple-50/60 border-purple-500 ring-1 ring-purple-500'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="zelle"
                    checked={paymentMethod === 'zelle'}
                    onChange={() => setPaymentMethod('zelle')}
                    className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                  />
                  <div>
                    <span className="text-xs font-black text-slate-900 block">
                      Zelle / Tarjetas Internacionales
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      Verificación automática 24/7
                    </span>
                  </div>
                </div>
                <Building className="w-5 h-5 text-purple-600" />
              </label>
            </div>
          </div>

          {/* 7. RESUMEN DE CUENTA */}
          <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-2xs space-y-2.5">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wide">
              Resumen de cuenta
            </h3>

            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span>Subtotal productos ({totalItemsCount})</span>
                <span className="font-bold text-slate-900">{formatUSD(subtotal)}</span>
              </div>

              {deliveryDiscount > 0 && (
                <div className="flex items-center justify-between text-emerald-700">
                  <span>🏷 Cupón de Entrega Gratis</span>
                  <span className="font-bold">-{formatUSD(deliveryDiscount)}</span>
                </div>
              )}

              {pointsDiscount > 0 && (
                <div className="flex items-center justify-between text-emerald-700">
                  <span>★ Puntos Club Canjeados</span>
                  <span className="font-bold">-{formatUSD(pointsDiscount)}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-slate-600">
                <span>Tarifa de Entrega</span>
                {effectiveDeliveryFee === 0 ? (
                  <span className="font-bold text-emerald-700">
                    <s className="text-slate-400 font-normal mr-1">{formatUSD(2.50)}</s>
                    ¡GRATIS!
                  </span>
                ) : (
                  <span className="font-bold text-slate-900">{formatUSD(effectiveDeliveryFee)}</span>
                )}
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between">
                <div>
                  <span className="text-sm font-black text-slate-900 block">
                    Total a pagar
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Tasa BCV: {BCV_EXCHANGE_RATE.toFixed(2)} Bs./$
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-[#0F7638] leading-none">
                    {formatUSD(finalTotal)}
                  </div>
                  <div className="text-xs font-bold text-slate-700 mt-1">
                    {formatBS(finalTotal)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. STICKY FOOTER CTA & WHATSAPP INTEGRATION */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 max-w-lg mx-auto shadow-2xl">
          {/* Raffle Alert Banner */}
          <div className="mb-2 bg-emerald-50 text-[#0F7638] text-[11px] font-extrabold py-1.5 px-3 rounded-xl flex items-center justify-between border border-emerald-200/60">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#5DBB63]" />
              <span>
                ¡Esta orden genera <strong className="underline">{orderTicketsEarned} Boletos Digitales</strong> para el Sedán 0 KM!
              </span>
            </div>
            <span>›</span>
          </div>

          {/* Main Action Button */}
          <button
            id="btn-confirm-and-pay"
            onClick={handleConfirmOrder}
            className="w-full py-3 px-4 bg-[#0F7638] hover:bg-[#0D622F] text-white rounded-2xl font-black flex items-center justify-between shadow-lg active:scale-98 transition-all"
          >
            <div className="flex items-center gap-2.5 text-left">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <Lock className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-xs font-black block leading-tight">
                  Confirmar y Pagar
                </span>
                <span className="text-[10px] text-emerald-100 block font-medium">
                  Transacción 100% Protegida
                </span>
              </div>
            </div>

            <div className="text-right leading-tight">
              <span className="text-base font-black block">
                {formatUSD(finalTotal)}
              </span>
              <span className="text-[10px] text-emerald-200 font-medium">
                {formatBS(finalTotal)}
              </span>
            </div>
          </button>
        </div>
      )}

      {/* ORDER CONFIRMATION MODAL & WHATSAPP GENERATOR */}
      {showConfirmationModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl p-5 max-w-sm w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="text-center flex flex-col items-center">
              <div className="mb-2">
                <AikozLogo size="sm" showSubtitle={true} />
              </div>
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#0F7638] mx-auto flex items-center justify-center mb-1.5">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase shadow-2xs">
                +{orderTicketsEarned} Boletos Sorteo 0 KM
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-1.5">
                ¡Orden Lista para Procesar!
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mt-0.5">
                Tu pedido en {currentStore.name} ha sido preparado con éxito.
              </p>
            </div>

            {/* Order Summary Box */}
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between font-bold text-slate-700">
                <span>Total Productos:</span>
                <span>{totalItemsCount} artículos</span>
              </div>
              <div className="flex justify-between font-bold text-slate-700">
                <span>Método de Entrega:</span>
                <span>{deliveryMethod === 'delivery' ? 'Delivery Express' : 'Pick-up'}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-700">
                <span>Método de Pago:</span>
                <span className="uppercase text-blue-700">{paymentMethod}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between font-black text-slate-900 text-sm">
                <span>Total a Pagar:</span>
                <span className="text-[#0F7638]">
                  {formatUSD(finalTotal)} / {formatBS(finalTotal)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <a
                id="btn-send-whatsapp-order"
                href={generateWhatsAppOrderLink({
                  items: cart,
                  subtotal,
                  discount: totalDiscount,
                  deliveryCost: effectiveDeliveryFee,
                  total: finalTotal,
                  deliveryMethod,
                  paymentMethod,
                  ticketsEarned: orderTicketsEarned,
                  storeName: currentStore.name,
                  deliveryAddress: 'Lechería (Casa)',
                  notes: orderNotes,
                })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  onOrderSuccess({
                    items: cart,
                    total: finalTotal,
                    ticketsEarned: orderTicketsEarned,
                  });
                }}
                className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <span>Enviar Pedido por WhatsApp</span>
                <Share2 className="w-4 h-4" />
              </a>

              <button
                onClick={() => {
                  onOrderSuccess({
                    items: cart,
                    total: finalTotal,
                    ticketsEarned: orderTicketsEarned,
                  });
                  setShowConfirmationModal(false);
                }}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
              >
                Continuar en la App
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

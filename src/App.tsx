import React, { useState, useEffect } from 'react';
import { BottomNav, TabType } from './components/BottomNav';
import { CarritoView } from './components/CarritoView';
import { CasheaModal } from './components/CasheaModal';
import { CuentaView } from './components/CuentaView';
import { CuponesView } from './components/CuponesView';
import { GiftCardModal } from './components/GiftCardModal';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { PasillosView } from './components/PasillosView';
import { ScannerModal } from './components/ScannerModal';
import { SorteoView } from './components/SorteoView';
import { TicketDetailsModal } from './components/TicketDetailsModal';
import {
  INITIAL_COUPONS,
  INITIAL_PRODUCTS,
  INITIAL_TICKETS,
  INITIAL_USER,
  STORE_LOCATIONS,
} from './data/mockData';
import { CartItem, Coupon, Product, StoreLocation, Ticket, UserProfile } from './types';
import { triggerConfetti } from './utils/formatters';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('inicio');
  const [currentStore, setCurrentStore] = useState<StoreLocation>(STORE_LOCATIONS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Initial simulated data fetch to demonstrate clean skeleton loaders
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectStore = (store: StoreLocation) => {
    setCurrentStore(store);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 450);
  };

  // Initial cart pre-loaded matching Screenshot 6 ($28.50, 4 items)
  const [cart, setCart] = useState<CartItem[]>([
    { product: INITIAL_PRODUCTS[0], quantity: 2 }, // Aceite Soya 800ml x 2 ($4.24)
    { product: INITIAL_PRODUCTS[1], quantity: 1 }, // Pan Árabe 6 Und x 1 ($1.12)
    { product: INITIAL_PRODUCTS[3], quantity: 1 }, // Café Molido 200g x 1 ($1.83)
    { product: INITIAL_PRODUCTS[4], quantity: 1 }, // Champú Dove x 1 ($21.31)
  ]);

  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);

  // Modals state
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [selectedTicketForDetails, setSelectedTicketForDetails] = useState<Ticket | null>(null);
  const [isCasheaModalOpen, setIsCasheaModalOpen] = useState(false);
  const [giftCardAction, setGiftCardAction] = useState<'recharge' | 'transfer' | null>(null);

  // Cart total calculations
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotalUSD = cart.reduce(
    (acc, item) => acc + item.product.priceUSD * item.quantity,
    0
  );

  // Add to cart handler
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  // Update quantity handler
  const handleUpdateQuantity = (product: Product, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(product.id);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === product.id ? { ...item, quantity } : item
      )
    );
  };

  // Remove item
  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Clear cart
  const handleClearCart = () => {
    setCart([]);
  };

  // Booster button (quick add biscuit to hit $30 milestone)
  const handleAddBoosterProduct = () => {
    const booster = INITIAL_PRODUCTS.find((p) => p.id === 'prod-6');
    if (booster) {
      handleAddToCart(booster);
      triggerConfetti();
    }
  };

  // Apply coupon code handler
  const handleApplyCouponCode = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code.toUpperCase() === clean);
    if (found) {
      setCoupons((prev) =>
        prev.map((c) =>
          c.id === found.id
            ? { ...c, isApplied: true }
            : c
        )
      );
      return true;
    }
    return false;
  };

  const handleApplyCouponDirect = (coupon: Coupon) => {
    setCoupons((prev) =>
      prev.map((c) =>
        c.id === coupon.id ? { ...c, isApplied: !c.isApplied } : c
      )
    );
    triggerConfetti();
  };

  // New ticket scanned handler
  const handleTicketScanned = (newTicket: Ticket) => {
    setTickets((prev) => [newTicket, ...prev]);
    setUser((prev) => ({
      ...prev,
      ticketsCount: prev.ticketsCount + 1,
    }));
  };

  // Order success handler
  const handleOrderSuccess = ({
    total,
    ticketsEarned,
  }: {
    total: number;
    ticketsEarned: number;
  }) => {
    // Generate new digital raffle tickets
    const generatedTickets: Ticket[] = Array.from({ length: ticketsEarned }).map((_, i) => ({
      id: `t-order-${Date.now()}-${i}`,
      code: `AKZ-${Math.floor(10000 + Math.random() * 90000)}`,
      date: 'Hoy, ' + new Date().toLocaleDateString('es-VE', { day: 'numeric', month: 'short' }),
      store: currentStore.name,
      purchaseAmount: total,
      isValidated: true,
      source: 'app',
      opportunities: 1,
    }));

    setTickets((prev) => [...generatedTickets, ...prev]);
    setUser((prev) => ({
      ...prev,
      ticketsCount: prev.ticketsCount + ticketsEarned,
      clubPoints: prev.clubPoints + Math.round(total * 2),
    }));

    // Reset cart
    setCart([]);
    setActiveTab('sorteo');
  };

  // Filtered products for search query
  const displayedProducts = searchQuery
    ? products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  return (
    <div className="min-h-screen bg-slate-200 flex justify-center selection:bg-[#5DBB63] selection:text-white">
      {/* Mobile Shell (max-w-md centered with native iOS/Android feel) */}
      <div className="w-full max-w-md bg-white min-h-screen flex flex-col shadow-2xl relative border-x border-slate-200">
        {/* Sticky Header (Hidden on full checkout view to match screenshot 6) */}
        {activeTab !== 'carrito' && (
          <Header
            currentStore={currentStore}
            stores={STORE_LOCATIONS}
            onSelectStore={handleSelectStore}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onOpenScanner={() => setIsScannerOpen(true)}
            onOpenSorteo={() => setActiveTab('sorteo')}
            onOpenCasheaInfo={() => setIsCasheaModalOpen(true)}
          />
        )}

        {/* View Routing */}
        <main className="flex-1 overflow-x-hidden">
          {activeTab === 'inicio' && (
            <HomeView
              products={displayedProducts}
              cart={cart}
              ticketsCount={tickets.length}
              isLoading={isLoading}
              onAddToCart={handleAddToCart}
              onUpdateQuantity={handleUpdateQuantity}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onOpenCasheaInfo={() => setIsCasheaModalOpen(true)}
            />
          )}

          {activeTab === 'pasillos' && (
            <PasillosView
              products={displayedProducts}
              cart={cart}
              isLoading={isLoading}
              onAddToCart={handleAddToCart}
              onUpdateQuantity={handleUpdateQuantity}
              onOpenSorteo={() => setActiveTab('sorteo')}
              onOpenCasheaInfo={() => setIsCasheaModalOpen(true)}
            />
          )}

          {activeTab === 'sorteo' && (
            <SorteoView
              tickets={tickets}
              onOpenScanner={() => setIsScannerOpen(true)}
              onOpenTicketDetails={(ticket) => setSelectedTicketForDetails(ticket)}
              onDownloadPDF={() => {
                if (tickets.length > 0) {
                  setSelectedTicketForDetails(tickets[0]);
                }
              }}
            />
          )}

          {activeTab === 'cupones' && (
            <CuponesView
              user={user}
              tickets={tickets}
              coupons={coupons}
              onApplyCoupon={handleApplyCouponDirect}
              onOpenScanner={() => setIsScannerOpen(true)}
              onOpenGiftCardAction={(action) => setGiftCardAction(action)}
              onOpenTicketDetails={(ticket) => setSelectedTicketForDetails(ticket)}
            />
          )}

          {activeTab === 'cuenta' && (
            <CuentaView
              user={user}
              currentStore={currentStore}
              onChangeStore={() => {
                const nextStore =
                  STORE_LOCATIONS.find((s) => s.id !== currentStore.id) || STORE_LOCATIONS[0];
                handleSelectStore(nextStore);
              }}
              onOpenSorteo={() => setActiveTab('sorteo')}
              onOpenOrders={() => setActiveTab('carrito')}
              onOpenCasheaInfo={() => setIsCasheaModalOpen(true)}
            />
          )}

          {activeTab === 'carrito' && (
            <CarritoView
              cart={cart}
              user={user}
              currentStore={currentStore}
              appliedCoupons={coupons.filter((c) => c.isApplied)}
              onBack={() => setActiveTab('inicio')}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onClearCart={handleClearCart}
              onApplyCouponCode={handleApplyCouponCode}
              onAddBoosterProduct={handleAddBoosterProduct}
              onOrderSuccess={handleOrderSuccess}
            />
          )}
        </main>

        {/* Bottom Nav Bar with Floating Cart Pill */}
        <BottomNav
          activeTab={activeTab}
          onSelectTab={(tab) => setActiveTab(tab)}
          cartItemCount={cartItemCount}
          cartTotalUSD={cartTotalUSD}
          showFloatingCart={activeTab !== 'carrito'}
        />

        {/* Modals */}
        <ScannerModal
          isOpen={isScannerOpen}
          onClose={() => setIsScannerOpen(false)}
          onTicketScanned={handleTicketScanned}
        />

        <TicketDetailsModal
          ticket={selectedTicketForDetails}
          onClose={() => setSelectedTicketForDetails(null)}
        />

        <CasheaModal
          isOpen={isCasheaModalOpen}
          onClose={() => setIsCasheaModalOpen(false)}
        />

        <GiftCardModal
          isOpen={giftCardAction !== null}
          action={giftCardAction}
          currentBalance={user.giftCardBalance}
          onClose={() => setGiftCardAction(null)}
          onUpdateBalance={(newBalance) =>
            setUser((prev) => ({ ...prev, giftCardBalance: newBalance }))
          }
        />
      </div>
    </div>
  );
}

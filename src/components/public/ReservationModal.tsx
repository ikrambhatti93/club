import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Sparkles,
  Calendar,
  Clock,
  Users,
  Building,
  Gift,
  Car,
  CheckCircle2,
  ShieldCheck,
  MessageCircle,
  Copy,
  Check
} from 'lucide-react';
import { Reservation } from '../../types';

export const ReservationModal: React.FC = () => {
  const {
    clubs,
    packages,
    isBookingModalOpen,
    setIsBookingModalOpen,
    bookingPrefill,
    addReservation,
    settings,
    t
  } = useApp();

  const [clubId, setClubId] = useState<number | undefined>(undefined);
  const [packageId, setPackageId] = useState<number | undefined>(undefined);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestWhatsapp, setGuestWhatsapp] = useState('');
  const [reservationDate, setReservationDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [preferredTime, setPreferredTime] = useState('23:00');
  const [numberOfGuests, setNumberOfGuests] = useState(4);
  const [pickupRequested, setPickupRequested] = useState(false);
  const [pickupLocation, setPickupLocation] = useState('');
  const [pickupVehicle, setPickupVehicle] = useState('Lincoln Stretch Limousine');
  const [customerNotes, setCustomerNotes] = useState('');
  const [consentTerms, setConsentTerms] = useState(true);
  const [isAgeConfirmed, setIsAgeConfirmed] = useState(true);

  const [completedReservation, setCompletedReservation] = useState<Reservation | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  // Sync prefill values
  useEffect(() => {
    if (bookingPrefill) {
      if (bookingPrefill.clubId) setClubId(bookingPrefill.clubId);
      if (bookingPrefill.packageId) setPackageId(bookingPrefill.packageId);
    }
  }, [bookingPrefill]);

  if (!isBookingModalOpen) return null;

  // Calculate pricing
  const selectedClub = clubs.find(c => c.id === clubId);
  const selectedPackage = packages.find(p => p.id === packageId);

  let totalAmount = 0;
  if (selectedPackage) {
    totalAmount += (selectedPackage.sale_price || selectedPackage.regular_price);
  } else if (selectedClub) {
    totalAmount += selectedClub.entry_fee * numberOfGuests;
  } else {
    totalAmount = 250; // standard table baseline
  }

  if (pickupRequested) {
    totalAmount += 180; // limo upgrade baseline
  }

  const depositAmount = Math.round(totalAmount * (settings.deposit_percentage / 100));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !guestPhone) return;

    const res = addReservation({
      club_id: clubId,
      package_id: packageId,
      guest_name: guestName,
      guest_email: guestEmail,
      guest_phone: guestPhone,
      guest_whatsapp: guestWhatsapp || guestPhone,
      reservation_date: reservationDate,
      preferred_time: preferredTime,
      number_of_guests: numberOfGuests,
      pickup_requested: pickupRequested,
      pickup_location: pickupRequested ? pickupLocation : undefined,
      pickup_vehicle_type: pickupRequested ? pickupVehicle : undefined,
      total_amount: totalAmount,
      customer_notes: customerNotes
    });

    setCompletedReservation(res);
  };

  const handleCopy = () => {
    if (completedReservation) {
      navigator.clipboard.writeText(completedReservation.booking_reference);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2500);
    }
  };

  const handleWhatsAppForward = () => {
    if (!completedReservation) return;
    const cleanNumber = settings.whatsapp_number.replace(/[^0-9]/g, '');
    const msg = `Hello BCN Concierge! I just placed VIP booking reference: *${completedReservation.booking_reference}* for *${completedReservation.guest_name}* on *${completedReservation.reservation_date}* at *${completedReservation.preferred_time}* for ${completedReservation.number_of_guests} guests. Please confirm our arrangements.`;
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleClose = () => {
    setIsBookingModalOpen(false);
    setCompletedReservation(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl border border-[#d4af37]/40 bg-[#10121a] shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/50">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#d4af37]" />
            <h2 className="text-lg font-bold text-white font-serif">
              {completedReservation ? t('booking_confirmed') : 'Reserve VIP Table & Hospitality'}
            </h2>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6">
          {completedReservation ? (
            /* Confirmation Screen */
            <div className="text-center py-6 space-y-6">
              <div className="w-20 h-20 rounded-full bg-[#25d366]/20 border-2 border-[#25d366] flex items-center justify-center text-[#25d366] mx-auto shadow-xl">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs text-[#d4af37] font-semibold uppercase tracking-widest block mb-1">
                  VIP Booking Received
                </span>
                <h3 className="text-2xl font-bold text-white font-serif mb-2">
                  Thank You, {completedReservation.guest_name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto">
                  Your VIP reservation request has been placed into our concierge dispatch system.
                </p>
              </div>

              {/* Reference Card */}
              <div className="max-w-md mx-auto rounded-xl bg-black/70 border border-[#d4af37]/40 p-4">
                <div className="text-xs text-gray-400 mb-1">{t('booking_ref_label')}</div>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-2xl font-mono font-bold text-[#f3e5ab] tracking-wider">
                    {completedReservation.booking_reference}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white"
                    title="Copy Reference"
                  >
                    {copiedRef ? <Check className="w-4 h-4 text-[#25d366]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="text-[11px] text-gray-500 mt-2">
                  Date: {completedReservation.reservation_date} • Time: {completedReservation.preferred_time} • {completedReservation.number_of_guests} Guests
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 max-w-md mx-auto">
                <button
                  onClick={handleWhatsAppForward}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-black bg-[#25d366] hover:brightness-110 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-black" />
                  <span>Connect with Concierge on WhatsApp Now</span>
                </button>

                <button
                  onClick={handleClose}
                  className="w-full py-2.5 rounded-xl border border-white/15 text-xs text-gray-300 hover:bg-white/5 transition"
                >
                  Close & Return to Website
                </button>
              </div>
            </div>
          ) : (
            /* Reservation Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Venue & Package Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Select Club / Venue</span>
                  </label>
                  <select
                    value={clubId || ''}
                    onChange={(e) => setClubId(e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full h-11 px-3 rounded-xl bg-black/60 border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="">Let Concierge Recommend Best Club</option>
                    {clubs.filter(c => c.status === 'active').map(c => (
                      <option key={c.id} value={c.id}>{c.name} ({c.neighborhood})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1 flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Select Package (Optional)</span>
                  </label>
                  <select
                    value={packageId || ''}
                    onChange={(e) => setPackageId(e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full h-11 px-3 rounded-xl bg-black/60 border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="">Custom Table / Bottle on Arrival</option>
                    {packages.filter(p => p.is_active).map(p => (
                      <option key={p.id} value={p.id}>{p.name} (€{p.sale_price || p.regular_price})</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date, Time & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Reservation Date *</span>
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={reservationDate}
                    onChange={(e) => setReservationDate(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl bg-black/60 border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Estimated Arrival</span>
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl bg-black/60 border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-[#d4af37]"
                  >
                    {['22:00', '22:30', '23:00', '23:30', '00:00', '00:30', '01:00', '01:30', '02:00'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Number of Guests *</span>
                  </label>
                  <select
                    value={numberOfGuests}
                    onChange={(e) => setNumberOfGuests(Number(e.target.value))}
                    className="w-full h-11 px-3 rounded-xl bg-black/60 border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-[#d4af37]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25, 30].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Guest Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    Lead Guest Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Liam Gallagher"
                    className="w-full h-11 px-3 rounded-xl bg-black/60 border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="liam@example.com"
                    className="w-full h-11 px-3 rounded-xl bg-black/60 border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    Phone Number with Country Code *
                  </label>
                  <input
                    type="tel"
                    required
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="+44 7911 123456"
                    className="w-full h-11 px-3 rounded-xl bg-black/60 border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    WhatsApp Number (for instant confirmation)
                  </label>
                  <input
                    type="tel"
                    value={guestWhatsapp}
                    onChange={(e) => setGuestWhatsapp(e.target.value)}
                    placeholder="Leave blank if same as phone"
                    className="w-full h-11 px-3 rounded-xl bg-black/60 border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              {/* Limousine Transfer Option */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pickupRequested}
                    onChange={(e) => setPickupRequested(e.target.checked)}
                    className="w-4 h-4 accent-[#d4af37] rounded"
                  />
                  <div className="flex items-center gap-2 text-xs font-semibold text-white">
                    <Car className="w-4 h-4 text-[#d4af37]" />
                    <span>Include Private Limousine / Chauffeur Pickup (+€180.00)</span>
                  </div>
                </label>

                {pickupRequested && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/5">
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">
                        Pickup Location / Hotel Name
                      </label>
                      <input
                        type="text"
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                        placeholder="e.g. W Barcelona or Hotel Arts"
                        className="w-full h-10 px-3 rounded-lg bg-black/60 border border-white/15 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">
                        Vehicle Type
                      </label>
                      <select
                        value={pickupVehicle}
                        onChange={(e) => setPickupVehicle(e.target.value)}
                        className="w-full h-10 px-3 rounded-lg bg-black/60 border border-white/15 text-xs text-white"
                      >
                        <option value="Lincoln Stretch Limousine">Lincoln Stretch Limousine (up to 8)</option>
                        <option value="Hummer H2 Luxury Limousine">Hummer H2 Luxury Limousine (up to 12)</option>
                        <option value="Mercedes V-Class VIP Van">Mercedes V-Class VIP Van (up to 7)</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Special Requests / Notes */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  Special Notes / Stag Groom Name / Bottle Preference
                </label>
                <textarea
                  rows={2}
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  placeholder="e.g. Groom's name is George, celebrating his 30th stag weekend..."
                  className="w-full p-3 rounded-xl bg-black/60 border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* Consents */}
              <div className="space-y-2 pt-2 border-t border-white/10 text-xs text-gray-300">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={isAgeConfirmed}
                    onChange={(e) => setIsAgeConfirmed(e.target.checked)}
                    className="w-4 h-4 accent-[#d4af37] rounded"
                  />
                  <span>I confirm that all members of our party are at least 18 years of age.</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={consentTerms}
                    onChange={(e) => setConsentTerms(e.target.checked)}
                    className="w-4 h-4 accent-[#d4af37] rounded"
                  />
                  <span>I agree to the booking terms, privacy policy, and lawful venue regulations.</span>
                </label>
              </div>

              {/* Summary and Submit */}
              <div className="rounded-xl bg-black/60 border border-[#d4af37]/30 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-gray-400">Total Package Amount:</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-[#f3e5ab]">
                      €{totalAmount.toFixed(2)}
                    </span>
                    <span className="text-xs text-[#25d366]">
                      (Deposit to reserve: €{depositAmount.toFixed(2)})
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-black bg-gradient-to-r from-[#f6e05e] via-[#d4af37] to-[#b7791f] hover:brightness-110 shadow-lg shadow-[#d4af37]/20 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>Confirm Reservation Request</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

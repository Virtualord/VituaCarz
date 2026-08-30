import React, { useEffect } from "react";

const BookingModal = ({
  car,
  pickupDate,
  setPickupDate,
  returnDate,
  setReturnDate,
  onClose,
  onBooking,
}) => {
  // Close modal when Escape is pressed
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  // Calculate number of rental days
  const calculateDays = () => {
    if (!pickupDate || !returnDate) return 0;

    const pickup = new Date(pickupDate);
    const dropoff = new Date(returnDate);

    const difference = dropoff - pickup;

    const days = Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );

    return days >= 0 ? days + 1 : 0;
  };

  const rentalDays = calculateDays();
  const totalPrice = rentalDays * Number(car?.price || 0);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal */}
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-[#3f3f3f] bg-[#2f2f2f] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#3f3f3f] px-6 py-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#737373]">
              New Booking
            </p>

            <h2 className="mt-1 text-xl font-semibold text-[#f5f5f5]">
              Book {car?.name}
            </h2>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-[#a3a3a3] transition hover:bg-[#383838] hover:text-[#ececec]"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="space-y-6 p-6">

          {/* Car Preview */}
          <div className="flex items-center gap-4 rounded-xl border border-[#3f3f3f] bg-[#212121] p-3">
            <img
              src={car?.image}
              alt={car?.name}
              className="h-16 w-24 rounded-lg object-cover"
            />

            <div>
              <h3 className="font-medium text-[#ececec]">
                {car?.name}
              </h3>

              <p className="mt-1 text-sm text-[#a3a3a3]">
                ₹{car?.price} / day
              </p>
            </div>
          </div>

          {/* Dates */}
          <div className="grid gap-4 sm:grid-cols-2">

            {/* Pickup */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#e5e5e5]">
                Pickup Date
              </label>

              <input
                type="date"
                value={pickupDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full rounded-xl border border-[#404040] bg-[#212121] px-4 py-3 text-sm text-[#ececec] outline-none transition focus:border-[#737373] focus:ring-2 focus:ring-[#737373]/30"
              />
            </div>

            {/* Return */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#e5e5e5]">
                Return Date
              </label>

              <input
                type="date"
                value={returnDate}
                min={pickupDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full rounded-xl border border-[#404040] bg-[#212121] px-4 py-3 text-sm text-[#ececec] outline-none transition focus:border-[#737373] focus:ring-2 focus:ring-[#737373]/30"
              />
            </div>

          </div>

          {/* Booking Summary */}
          <div className="rounded-xl border border-[#3f3f3f] bg-[#212121] p-4">

            <h3 className="mb-4 text-sm font-semibold text-[#ececec]">
              Booking Summary
            </h3>

            <div className="space-y-3 text-sm">

              <div className="flex justify-between">
                <span className="text-[#a3a3a3]">
                  Price per day
                </span>

                <span className="text-[#ececec]">
                  ₹{car?.price}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#a3a3a3]">
                  Rental duration
                </span>

                <span className="text-[#ececec]">
                  {rentalDays} {rentalDays === 1 ? "day" : "days"}
                </span>
              </div>

              <div className="h-px bg-[#3f3f3f]" />

              <div className="flex items-center justify-between">
                <span className="font-medium text-[#ececec]">
                  Total
                </span>

                <span className="text-xl font-bold text-[#f5f5f5]">
                  ₹{totalPrice}
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse gap-3 border-t border-[#3f3f3f] px-6 py-5 sm:flex-row sm:justify-end">

          <button
            onClick={onClose}
            className="rounded-xl border border-[#525252] px-5 py-2.5 text-sm font-medium text-[#ececec] transition hover:bg-[#383838]"
          >
            Cancel
          </button>

          <button
            onClick={onBooking}
            className="rounded-xl bg-[#ececec] px-5 py-2.5 text-sm font-semibold text-[#171717] transition hover:bg-[#d4d4d4] active:scale-[0.98]"
          >
            Confirm Booking
          </button>

        </div>
      </div>
    </div>
  );
};

export default BookingModal;
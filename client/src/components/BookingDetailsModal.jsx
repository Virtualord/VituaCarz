
import React from "react";

const BookingDetailsModal = ({
  booking,
  setBookingDetailsModal,
}) => {
  if (!booking) return null;

  // Calculate rental duration
  const pickup = new Date(booking.pickupDate);
  const returnDate = new Date(booking.returnDate);

  const rentalDays = Math.max(
    1,
    Math.ceil(
      (returnDate - pickup) / (1000 * 60 * 60 * 24)
    )
  );

  const totalPrice = rentalDays * booking.price;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const onClose = () => {
    setBookingDetailsModal(false);
  };

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
              Booking Details
            </p>

            <h2 className="mt-1 text-xl font-semibold text-[#f5f5f5]">
              {booking.carName}
            </h2>
          </div>

          {/* Close Button */}
          <button
            type="button"
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
              src={booking.carImage}
              alt={booking.carName}
              className="h-20 w-28 rounded-lg object-cover"
            />

            <div>
              <h3 className="font-medium text-[#ececec]">
                {booking.carName}
              </h3>

              <p className="mt-1 text-sm text-[#a3a3a3]">
                ₹{booking.price} / day
              </p>
            </div>
          </div>

          {/* Booking Information */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-[#ececec]">
              Rental Information
            </h3>

            <div className="overflow-hidden rounded-xl border border-[#3f3f3f]">

              {/* Pickup */}
              <div className="flex items-center justify-between border-b border-[#3f3f3f] px-4 py-3">
                <span className="text-sm text-[#a3a3a3]">
                  Pickup Date
                </span>

                <span className="text-sm font-medium text-[#ececec]">
                  {formatDate(booking.pickupDate)}
                </span>
              </div>

              {/* Return */}
              <div className="flex items-center justify-between border-b border-[#3f3f3f] px-4 py-3">
                <span className="text-sm text-[#a3a3a3]">
                  Return Date
                </span>

                <span className="text-sm font-medium text-[#ececec]">
                  {formatDate(booking.returnDate)}
                </span>
              </div>

              {/* Duration */}
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-sm text-[#a3a3a3]">
                  Rental Duration
                </span>

                <span className="text-sm font-medium text-[#ececec]">
                  {rentalDays}{" "}
                  {rentalDays === 1 ? "day" : "days"}
                </span>
              </div>

            </div>
          </div>

          {/* Booking Summary */}
          <div className="rounded-xl border border-[#3f3f3f] bg-[#212121] p-4">

            <h3 className="mb-4 text-sm font-semibold text-[#ececec]">
              Payment Summary
            </h3>

            <div className="space-y-3 text-sm">

              <div className="flex justify-between">
                <span className="text-[#a3a3a3]">
                  Price per day
                </span>

                <span className="text-[#ececec]">
                  ₹{booking.price}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#a3a3a3]">
                  Rental duration
                </span>

                <span className="text-[#ececec]">
                  {rentalDays}{" "}
                  {rentalDays === 1 ? "day" : "days"}
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
        <div className="flex justify-end border-t border-[#3f3f3f] px-6 py-5">

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-[#ececec] px-5 py-2.5 text-sm font-semibold text-[#171717] transition hover:bg-[#d4d4d4] active:scale-[0.98]"
          >
            Close
          </button>

        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;

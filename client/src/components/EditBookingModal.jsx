import React from "react";

const EditBookingModal = ({
  booking,
  startDate,
  setStartDate,
  returnDate,
  setReturnDate,
  handleUpdate,
  loading,
  setEditBookingModal,
}) => {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
      onClick={() => setEditBookingModal(false)}
    >
      {/* Modal */}
      <div
        className="w-full max-w-md overflow-hidden rounded-2xl border border-[#3f3f3f] bg-[#2f2f2f] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#3f3f3f] px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-[#ececec]">
              Edit Booking
            </h2>
            <p className="mt-1 text-sm text-[#a3a3a3]">
              {booking?.carName || "Update your booking dates"}
            </p>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={() => setEditBookingModal(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-xl text-[#a3a3a3] transition hover:bg-[#404040] hover:text-[#ececec]"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
          className="space-y-5 p-6"
        >
          {/* Start Date */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#ececec]">
              Pickup Date
            </label>
            <input
              type="date"
              value={startDate}
              min={today}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded-xl border border-[#525252] bg-[#212121] px-4 py-3 text-sm text-[#ececec] outline-none transition focus:border-[#737373] focus:ring-1 focus:ring-[#737373]"
            />
          </div>

          {/* Return Date */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#ececec]">
              Return Date
            </label>
            <input
              type="date"
              value={returnDate}
              min={startDate || today}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full rounded-xl border border-[#525252] bg-[#212121] px-4 py-3 text-sm text-[#ececec] outline-none transition focus:border-[#737373] focus:ring-1 focus:ring-[#737373]"
            />
          </div>

          {/* Penalty Notice */}
          <div className="rounded-xl border border-yellow-800/50 bg-yellow-950/30 px-4 py-3">
            <p className="text-xs text-yellow-400">
              ⚠ A ₹200 penalty will be added to your total price for modifying booking dates.
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#3f3f3f]" />

          {/* Buttons */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setEditBookingModal(false)}
              className="rounded-xl border border-[#525252] px-5 py-2.5 text-sm font-medium text-[#ececec] transition hover:bg-[#404040]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[#ececec] px-5 py-2.5 text-sm font-semibold text-[#171717] transition hover:bg-white active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookingModal;

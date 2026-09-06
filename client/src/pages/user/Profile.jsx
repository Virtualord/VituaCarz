import React, { useState } from "react";
import EditModal from "../../components/EditModal";
import BookingDetailsModal from "../../components/BookingDetailsModal";

const Profile = () => {
  const [editModal, setEditModal] = useState(false);
  const [bookingDetailsModal, setBookingDetailsModal] = useState(false);

  // Example booking data
  const [selectedBooking, setSelectedBooking] = useState(null);

  const bookings = [
    {
      id: 1,
      carName: "Audi Q7",
      carImage:
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6",
      price: 5000,
      pickupDate: "2026-10-03",
      returnDate: "2026-10-05",
      status: "Pending",
    },
  ];

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setBookingDetailsModal(true);
  };

  return (
    <section className="min-h-[80vh] bg-[#212121] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Page Header */}
        <div className="mb-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#737373]">
            Account
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#f5f5f5]">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-[#a3a3a3]">
            Manage your account and view your car bookings.
          </p>
        </div>

        {/* Profile Card */}
        <div className="rounded-2xl border border-[#3f3f3f] bg-[#2f2f2f] p-6 shadow-xl sm:p-8">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

            {/* User Information */}
            <div>
              <h2 className="text-xl font-semibold text-[#ececec]">
                Personal Information
              </h2>

              <div className="mt-5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:gap-2">
                  <span className="text-sm text-[#737373]">
                    Name
                  </span>

                  <span className="text-sm font-medium text-[#ececec]">
                    Your Name
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:gap-2">
                  <span className="text-sm text-[#737373]">
                    Email
                  </span>

                  <span className="text-sm font-medium text-[#ececec]">
                    adityapatkar81@gmail.com
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:gap-2">
                  <span className="text-sm text-[#737373]">
                    Phone
                  </span>

                  <span className="text-sm font-medium text-[#ececec]">
                    +91 0123456789
                  </span>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <button
              type="button"
              onClick={() => setEditModal(true)}
              className="rounded-xl bg-[#ececec] px-5 py-2.5 text-sm font-semibold text-[#171717] transition hover:bg-[#d4d4d4] active:scale-[0.98]"
            >
              Edit Details
            </button>

          </div>
        </div>

        {/* Bookings */}
        <div className="mt-8 rounded-2xl border border-[#3f3f3f] bg-[#2f2f2f] shadow-xl">

          {/* Bookings Header */}
          <div className="border-b border-[#3f3f3f] px-6 py-5 sm:px-8">
            <h2 className="text-xl font-semibold text-[#ececec]">
              Your Bookings
            </h2>

            <p className="mt-1 text-sm text-[#a3a3a3]">
              View your current and previous car bookings.
            </p>
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left">

              {/* Table Header */}
              <thead>
                <tr className="border-b border-[#3f3f3f]">
                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-[#737373]">
                    Car
                  </th>

                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-[#737373]">
                    Journey Date
                  </th>

                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-[#737373]">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-[#737373]">
                    Details
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b border-[#3f3f3f] transition hover:bg-[#383838]"
                  >

                    {/* Car */}
                    <td className="px-6 py-5">
                      <span className="font-medium text-[#ececec]">
                        {booking.carName}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-5 text-sm text-[#a3a3a3]">
                      {new Date(
                        booking.pickupDate
                      ).toLocaleDateString("en-IN")}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      <span className="inline-flex rounded-full border border-[#525252] bg-[#212121] px-3 py-1 text-xs font-medium text-[#d4d4d4]">
                        {booking.status}
                      </span>
                    </td>

                    {/* View */}
                    <td className="px-6 py-5 text-right">
                      <button
                        type="button"
                        onClick={() => handleViewBooking(booking)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#a3a3a3] transition hover:bg-[#404040] hover:text-[#ececec]"
                        aria-label={`View ${booking.carName} booking`}
                      >
                        <i className="fa-solid fa-eye" />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

        {/* Empty State */}
        {bookings.length === 0 && (
          <div className="mt-8 rounded-2xl border border-[#3f3f3f] bg-[#2f2f2f] p-10 text-center">
            <i className="fa-solid fa-car text-3xl text-[#737373]" />

            <h3 className="mt-4 text-lg font-semibold text-[#ececec]">
              No bookings yet
            </h3>

            <p className="mt-2 text-sm text-[#a3a3a3]">
              Your bookings will appear here once you book a car.
            </p>
          </div>
        )}

      </div>

      {/* Edit Modal */}
      {editModal && (
        <EditModal
          setEditModal={setEditModal}
        />
      )}

      {/* Booking Details Modal */}
      {bookingDetailsModal && selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          setBookingDetailsModal={setBookingDetailsModal}
        />
      )}

    </section>
  );
};

export default Profile;

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import CarsData from "../../Data/carsData.json";
import toast from "react-hot-toast";
import BookingModal from "../../components/BookingModal";

const CarDetails = () => {
  const { id } = useParams();

  const [carDetails, setCarDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const [pickupDate, setPickupDate] = useState(today);
  const [returnDate, setReturnDate] = useState(today);

  // Booking function
  const handleBooking = () => {
    if (!pickupDate || !returnDate) {
      toast.error("Please select pickup and return dates");
      return;
    }

    if (new Date(returnDate) < new Date(pickupDate)) {
      toast.error("Return date cannot be before pickup date");
      return;
    }

    toast.success(`${carDetails.name} booked successfully!`);

    setShow(false);
  };

  useEffect(() => {
    const getCarInfo = () => {
      try {
        setLoading(true);

        const carInfo = CarsData.find(
          (car) => car.id === Number(id)
        );

        setCarDetails(carInfo || null);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load car details");
      } finally {
        setLoading(false);
      }
    };

    getCarInfo();
  }, [id]);

  // Loading State
  if (loading) {
    return (
      <section className="flex min-h-[80vh] items-center justify-center bg-[#212121]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#525252] border-t-[#ececec]" />

          <p className="text-sm text-[#a3a3a3]">
            Loading car details...
          </p>
        </div>
      </section>
    );
  }

  // Car Not Found
  if (!carDetails) {
    return (
      <section className="flex min-h-[80vh] items-center justify-center bg-[#212121] px-4">
        <div className="max-w-md rounded-2xl border border-[#3f3f3f] bg-[#2f2f2f] p-8 text-center">
          <h2 className="text-2xl font-semibold text-[#ececec]">
            Car not found
          </h2>

          <p className="mt-3 text-sm text-[#a3a3a3]">
            The car you're looking for doesn't exist or may have been removed.
          </p>

          <Link
            to="/cars"
            className="mt-6 inline-block rounded-xl bg-[#ececec] px-5 py-2.5 text-sm font-semibold text-[#171717] transition hover:bg-[#d4d4d4]"
          >
            Browse Cars
          </Link>
        </div>
      </section>
    );
  }

  // Car specifications
  const specifications = [
    { label: "Year", value: carDetails.year },
    { label: "Model", value: carDetails.model },
    { label: "Category", value: carDetails.category },
    { label: "Fuel", value: carDetails.fuel },
    { label: "Seats", value: carDetails.seats },
    { label: "Mileage", value: carDetails.milage },
    {
      label: "Transmission",
      value: carDetails.transmission ? "Automatic" : "Manual",
    },
  ];

  return (
    <section className="min-h-[80vh] bg-[#212121] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Back Button */}
        <Link
          to="/cars"
          className="mb-8 inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-[#a3a3a3] transition hover:bg-[#2f2f2f] hover:text-[#ececec]"
        >
          <span className="text-lg">←</span>
          Back to cars
        </Link>

        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl border border-[#3f3f3f] bg-[#2f2f2f] shadow-2xl">
          <div className="grid md:grid-cols-2">

            {/* Car Image */}
            <div className="relative min-h-[300px] bg-[#171717] md:min-h-[600px]">
              <img
                src={carDetails.image}
                alt={carDetails.name}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Car Details */}
            <div className="flex flex-col p-6 sm:p-8 md:p-10">

              {/* Heading */}
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#737373]">
                  Vehicle Details
                </p>

                <h1 className="text-3xl font-bold tracking-tight text-[#f5f5f5] sm:text-4xl">
                  {carDetails.name}
                </h1>
              </div>

              <div className="my-6 h-px bg-[#3f3f3f]" />

              {/* Description */}
              <p className="leading-7 text-[#b4b4b4]">
                {carDetails.about}
              </p>

              {/* Specifications */}
              <div className="mt-8">
                <h2 className="mb-4 text-lg font-semibold text-[#ececec]">
                  Specifications
                </h2>

                <div className="overflow-hidden rounded-xl border border-[#3f3f3f]">
                  {specifications.map((spec, index) => (
                    <div
                      key={spec.label}
                      className={`flex items-center justify-between px-4 py-3 text-sm ${
                        index !== specifications.length - 1
                          ? "border-b border-[#3f3f3f]"
                          : ""
                      }`}
                    >
                      <span className="text-[#a3a3a3]">
                        {spec.label}
                      </span>

                      <span className="font-medium text-[#ececec]">
                        {spec.value || "N/A"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="mt-6 rounded-xl border border-[#3f3f3f] bg-[#212121] p-4">
                <p className="text-sm text-[#a3a3a3]">
                  Rental Price
                </p>

                <p className="mt-1 text-2xl font-bold text-[#f5f5f5]">
                  ₹{carDetails.price}
                  <span className="ml-1 text-sm font-normal text-[#737373]">
                    / day
                  </span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => setShow(true)}
                  className="flex-1 rounded-xl bg-[#ececec] px-6 py-3 text-sm font-semibold text-[#171717] transition hover:bg-[#d4d4d4] active:scale-[0.98]"
                >
                  Book this car
                </button>

                <Link
                  to="/contact"
                  className="flex-1 rounded-xl border border-[#525252] px-6 py-3 text-center text-sm font-medium text-[#ececec] transition hover:bg-[#383838]"
                >
                  Contact seller
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {show && (
        <BookingModal
          car={carDetails}
          pickupDate={pickupDate}
          setPickupDate={setPickupDate}
          returnDate={returnDate}
          setReturnDate={setReturnDate}
          onClose={() => setShow(false)}
          onBooking={handleBooking}
        />
      )}
    </section>
  );
};

export default CarDetails;

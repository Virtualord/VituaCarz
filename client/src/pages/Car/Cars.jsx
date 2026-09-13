import React, { useEffect } from "react";
import CarCard from "../../components/CarCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllCars } from "../../store/features/carSlice";

const Cars = () => {
  const dispatch = useDispatch();
  const { cars, loading, error } = useSelector((state) => state.cars);

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  return (
    <section className="min-h-[80vh] bg-[#212121] px-4 py-12 sm:px-6 lg:px-8">

      {/* Page Header */}
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-[#737373]">
          Our Collection
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-[#f5f5f5] sm:text-4xl">
          Explore our car collection
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-[#a3a3a3] sm:text-base">
          Browse our available vehicles and find the perfect car for your next
          journey. Click on any car to explore specifications and pricing.
        </p>
      </div>

      {/* Divider */}
      <div className="mx-auto mb-10 h-px max-w-6xl bg-[#3f3f3f]" />

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center mt-10">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#525252] border-t-[#ececec]" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="mx-auto mt-10 max-w-md rounded-2xl border border-red-800 bg-red-950 p-6 text-center">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {/* Cars Grid */}
      {!loading && !error && (
        <div className="mx-auto grid max-w-6xl grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && cars.length === 0 && (
        <div className="mx-auto mt-10 max-w-md rounded-2xl border border-[#3f3f3f] bg-[#2f2f2f] p-8 text-center">
          <h2 className="text-xl font-semibold text-[#ececec]">
            No cars available
          </h2>
          <p className="mt-2 text-sm text-[#a3a3a3]">
            Check back later for new vehicles.
          </p>
        </div>
      )}

    </section>
  );
};

export default Cars;

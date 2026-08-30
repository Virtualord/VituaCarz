import { Link } from "react-router";

const CarCard = ({ car }) => {
  return (
    <Link
      to={`/cars/${car?.id}`}
      className="group block w-full max-w-sm"
    >
      <article className="m-2 overflow-hidden rounded-2xl border border-[#3f3f3f] bg-[#2f2f2f] shadow-lg transition duration-300 hover:-translate-y-1 hover:border-[#525252] hover:shadow-2xl">

        {/* Car Image */}
        <div className="relative h-52 w-full overflow-hidden bg-[#171717]">
          <img
            src={car?.image}
            alt={car?.name || "Car"}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {/* Card Content */}
        <div className="p-5">

          {/* Car Name */}
          <h3 className="mb-2 truncate text-xl font-semibold tracking-tight text-[#ececec]">
            {car?.name}
          </h3>

          {/* Description */}
          <p className="mb-5 line-clamp-2 text-sm leading-6 text-[#a3a3a3]">
            {car?.about || "No description available."}
          </p>

          {/* Divider */}
          <div className="mb-4 h-px w-full bg-[#3f3f3f]" />

          {/* Price + CTA */}
          <div className="flex items-center justify-between gap-3">

            {/* Price */}
            <div>
              <p className="text-xs text-[#737373]">
                Starting from
              </p>

              <p className="text-base font-semibold text-[#ececec]">
                ₹{car?.price}
                <span className="ml-1 text-xs font-normal text-[#737373]">
                  / day
                </span>
              </p>
            </div>

            {/* CTA */}
            <span className="rounded-lg bg-[#ececec] px-3.5 py-2 text-sm font-semibold text-[#171717] transition group-hover:bg-[#d4d4d4]">
              View details →
            </span>

          </div>
        </div>

      </article>
    </Link>
  );
};

export default CarCard;
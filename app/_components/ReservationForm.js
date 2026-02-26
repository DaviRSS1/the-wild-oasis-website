"use client";

import { differenceInDays } from "date-fns";
import { useReservation } from "./ReservationContext";
import { createReservationActions } from "../_lib/actions";
import { useFormStatus } from "react-dom";
import { useState } from "react";

function ReservationForm({ cabin, user, settings }) {
  const { range, resetRange } = useReservation();

  const { breakfastPrice } = settings;

  const { maxCapacity, regularPrice, discount, id } = cabin;

  const startDate = range.from;
  const endDate = range.to;

  const numNights =
    startDate && endDate ? differenceInDays(endDate, startDate) : 0;
  const cabinPrice = numNights * (regularPrice - discount);
  const [numGuests, setNumGuests] = useState(0);
  const [hasBreakfast, setHasBreakfast] = useState(false);

  const breakfastTotal = numGuests ? numNights * numGuests * breakfastPrice : 0;

  const totalPrice = cabinPrice + breakfastTotal;

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
    breakfastTotal,
    totalPrice,
  };

  const createReservationWithData = createReservationActions.bind(
    null,
    bookingData,
  );

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <img
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
        action={async (formData) => {
          await createReservationWithData(formData);
          resetRange();
        }}
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
            onChange={(e) => setNumGuests(Number(e.target.value))}
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="hasBreakfast"
              onChange={(e) => setHasBreakfast(e.target.checked)}
            />
            Add breakfast (${breakfastPrice} per person/night (${breakfastTotal}
            ))
          </label>
        </div>

        <div className="flex justify-end items-center gap-6">
          {startDate && endDate ? (
            <div className="flex gap-2.5 items-center">
              <span className="text-2xl">
                ${totalPrice}{" "}
                {hasBreakfast && (
                  <span className="text-sm text-primary-300">
                    ({cabinPrice} + {breakfastTotal})
                  </span>
                )}
              </span>
              <Button />
            </div>
          ) : (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export function Button() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
    >
      {pending ? "Reserving..." : "Reserve now"}
    </button>
  );
}

export default ReservationForm;

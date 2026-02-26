import EditReservationForm from "@/app/_components/EditReservationForm";
import { getBooking, getCabin } from "@/app/_lib/data-service";

export async function generateMetadata({ params }) {
  const { reservationId } = await params;

  return {
    title: `Reservation ${reservationId}`,
  };
}

export default async function Page({ params }) {
  const { reservationId } = await params;
  const booking = await getBooking(reservationId);
  const { maxCapacity } = await getCabin(booking.cabinId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <EditReservationForm
        booking={booking}
        maxCapacity={maxCapacity}
        reservationId={reservationId}
      />
    </div>
  );
}

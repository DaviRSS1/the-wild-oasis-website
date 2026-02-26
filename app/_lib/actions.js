"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings, getCabin, getSettings } from "./data-service";
import { redirect } from "next/navigation";
import { differenceInDays } from "date-fns";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuestAction(formData) {
  const session = await auth();

  if (!session) {
    throw new Error("You must be logged in");
  }

  const nationalID = formData.get("nationalId");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  const nationalIdRegex = /^[a-zA-Z0-9]{6,12}$/;

  if (!nationalIdRegex.test(nationalID)) {
    throw new Error(
      "National ID must be alphanumeric and between 6 and 12 characters",
    );
  }

  const updatedGuest = { nationalID, nationality, countryFlag };

  const { error } = await supabase
    .from("guests")
    .update(updatedGuest)
    .eq("id", session.user.guestId);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }

  revalidatePath("/account");
}

export async function deleteReservationAction(bookingId) {
  const session = await auth();

  if (!session) {
    throw new Error("You must be logged in");
  }

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);
  console.log(bookingId);

  if (!guestBookingsIds.includes(bookingId))
    throw new Error("You're not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
}

export async function updateReservationAction(formData) {
  const session = await auth();

  if (!session) {
    throw new Error("You must be logged in");
  }

  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations").slice(0, 1000);
  const reservationId = formData.get("reservationId");

  const updatedReservation = { numGuests, observations };

  const { error } = await supabase
    .from("bookings")
    .update(updatedReservation)
    .eq("id", reservationId)
    .eq("guestId", session.user.guestId);

  if (error) {
    console.error(error);
    throw new Error("Reservation could not be updated");
  }

  revalidatePath("/account/reservations");
  redirect("/account/reservations");
}

export async function createReservationActions(bookingData, formData) {
  const session = await auth();

  if (!session) {
    throw new Error("You must be logged in");
  }

  const hasBreakfast = formData.get("hasBreakfast") === "on";
  const numGuests = Number(formData.get("numGuests"));

  const { startDate, endDate, cabinId } = bookingData;

  const cabin = await getCabin(cabinId);
  const { breakfastPrice } = await getSettings();

  const numNights = differenceInDays(new Date(endDate), new Date(startDate));

  const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);

  const extrasPrice = hasBreakfast ? numNights * numGuests * breakfastPrice : 0;

  const totalPrice = cabinPrice + extrasPrice;

  const newBooking = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    extrasPrice,
    totalPrice,
    cabinId,
    guestId: session.user.guestId,
    numGuests,
    observations: formData.get("observations")?.slice(0, 1000) ?? "",
    isPaid: false,
    hasBreakfast,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    console.error(error);
    throw new Error("Reservation could not be created");
  }

  revalidatePath(`/cabins/${cabinId}`);
  redirect("/cabins/thankyou");
}

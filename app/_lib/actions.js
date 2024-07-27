"use server"
import {auth, signIn, signOut} from "@/app/_lib/auth";
import {supabase} from "@/app/_lib/supabase";
import {revalidatePath} from "next/cache";
import {getBookings} from "@/app/_lib/data-service";
import {redirect} from "next/navigation";

export async function updateProfile(formData) {
	const session = await auth();
	if(!session) throw new Error("You must be logged in");

	const nationalID = formData.get('nationalID');
	const [nationality, countryFlag] = formData.get('nationality').split('%');

	if(!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) { // отработка ошибок вместо try catch block и выставление error boundary
		throw new Error("Please provide a valid national ID");
	}

	const updateData = {nationality, countryFlag, nationalID};

	const { data, error } = await supabase
		.from("guests")
		.update(updateData)
		.eq("id", session.user.guestId)
		.select()
		.single();

	if (error) {
		console.error(error);
		throw new Error("Guest could not be updated");
	}

	revalidatePath("/account/profile")
	return data;
}

export async function deleteReservation(bookingId) {
	const session = await auth();
	if(!session) throw new Error("You must be logged in");

	// получаем все брони юзера и даем ему удалять только его
	const guestBookings = await getBookings(session.user.guestId);
	const guestBookingsId = guestBookings.map((booking) => booking.id);

	if(!guestBookingsId.includes(bookingId)){
		throw new Error("You are not allowed to delete this booking")
	}

	const {error } = await supabase.from("bookings").delete().eq("id", bookingId);

	if (error) {
		console.error(error);
		throw new Error("Booking could not be deleted");
	}

	revalidatePath("/account/reservations")
}

export async function updateBooking(formData){
	// auth
	const session = await auth();
	if(!session) throw new Error("You must be logged in");

	// authorization
	const guestBookings = await getBookings(session.user.guestId);
	const guestBookingsId = guestBookings.map((booking) => booking.id);

	// building update data
	const updateData = {
		numGuests: Number(formData.get('numGuests')),
		observations: formData.get('observations').slice(0, 1000)
	}

	const bookingId = +formData.get("bookingId");
	if(!guestBookingsId.includes(bookingId)){
		throw new Error("You are not allowed to update this booking")
	}

	// mutation
	const { data, error } = await supabase
		.from("bookings")
		.update(updateData)
		.eq("id", bookingId)
		.select()
		.single();

	if (error) {
		console.error(error);
		throw new Error("Booking could not be updated");
	}

	// revalidation
	revalidatePath(`/account/reservations/edit/${bookingId}`);
	revalidatePath(`/account/reservations`);

	// redirecting
	redirect('/account/reservations');
}

export async function createBooking(bookingData, formData) {
	const session = await auth();
	if (!session) throw new Error("You must be logged in");

	const newBooking = {
		...bookingData,
		guestId: session.user.guestId,
		numGuests: Number(formData.get("numGuests")),
		observations: formData.get("observations").slice(0, 1000),
		extrasPrice: 0,
		totalPrice: bookingData.cabinPrice,
		isPaid: false,
		hasBreakfast: false,
		status: "unconfirmed",
	};

	const { error } = await supabase.from("bookings").insert([newBooking]);

	if (error) throw new Error("Booking could not be created");

	revalidatePath(`/cabins/${bookingData.cabinId}`);

	redirect("/cabins/thankyou");
}

export async function signInAction() {
	await signIn("google", {redirectTo: "/account"});
}

export async function signOutAction(){
	await signOut({redirectTo: "/"});
}
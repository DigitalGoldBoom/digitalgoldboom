import { redirect } from "next/navigation";

/**
 * The waitlist and the free-chapters offer are ONE action now: signing up for the free chapters
 * also puts you on the list for the full book. So /waitlist just routes to the single capture page.
 */
export default function WaitlistPage() {
  redirect("/free");
}

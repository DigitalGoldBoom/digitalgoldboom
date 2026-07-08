import { redirect } from "next/navigation";

/**
 * The book is not yet for sale (payment/checkout not live). The former "$37 buy" page now routes to
 * the free first-5-chapters capture, which carries the book pitch + email capture. Rebuild this as a
 * full book-info + capture page when the LemonSqueezy checkout is switched on.
 */
export default function BookPage() {
  redirect("/free");
}

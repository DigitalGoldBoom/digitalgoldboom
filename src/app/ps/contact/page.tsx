import type { Metadata } from "next";
import PsContactForm from "../_components/PsContactForm";

export const metadata: Metadata = {
  title: "Contact — PixelShovel",
  description:
    "Get in touch with PixelShovel — questions about Digital Gold Boom, partnerships, press, or working with us.",
};

const DETAILS = [
  { label: "Email", value: "fletcher@digitalgoldboom.com", href: "mailto:fletcher@digitalgoldboom.com" },
  { label: "Melbourne", value: "Australia" },
  { label: "Panama City", value: "Panama" },
];

export default function PsContactPage() {
  return (
    <section className="ps-section pt-40" style={{ background: "var(--ps-bg)" }}>
      <div className="ps-wrap grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="flex flex-col items-start gap-6">
          <p className="ps-eyebrow">Contact</p>
          <h1 className="text-[clamp(2.2rem,5vw,4rem)]">Let&rsquo;s talk.</h1>
          <p className="max-w-[42ch] text-lg text-[var(--ps-text-2)]">
            Questions about the book, partnerships, press, or joining the team — write to us here and
            a real person answers.
          </p>

          <dl className="mt-4 flex flex-col gap-5">
            {DETAILS.map((d) => (
              <div key={d.label} className="flex flex-col gap-1">
                <dt className="ps-eyebrow">{d.label}</dt>
                <dd className="text-[var(--ps-text-2)]">
                  {d.href ? (
                    <a href={d.href} className="text-white underline-offset-4 hover:underline">
                      {d.value}
                    </a>
                  ) : (
                    d.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          className="rounded-[var(--ps-r-card)] border p-6 sm:p-8"
          style={{ borderColor: "var(--ps-line)", background: "var(--ps-bg-soft)" }}
        >
          <PsContactForm source="ps-contact" />
        </div>
      </div>
    </section>
  );
}

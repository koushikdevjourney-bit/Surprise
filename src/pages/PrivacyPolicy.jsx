import {
  Clock,
  Database,
  FileText,
  Lock,
  Mail,
  MapPin,
  Server,
  ShieldCheck,
  Sparkles,
  Trash2,
  UserCheck,
  Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import SeoHead from '../components/SeoHead'

const sections = [
  { id: 'introduction', label: '1. Introduction & Scope' },
  { id: 'data-collection', label: '2. Information We Collect' },
  { id: 'location-data', label: '3. Location & Address Information' },
  { id: 'api-backend', label: '4. API & Backend Communication' },
  { id: 'database-storage', label: '5. Database Storage (MongoDB)' },
  { id: 'third-party-services', label: '6. Third-Party Integrations' },
  { id: 'how-we-use-data', label: '7. How We Use Information' },
  { id: 'data-storage-protection', label: '8. Storage & Security Safeguards' },
  { id: 'data-sharing', label: '9. Data Sharing & Disclosure' },
  { id: 'data-retention', label: '10. Data Retention' },
  { id: 'user-rights-deletion', label: '11. User Rights & Data Deletion' },
  { id: 'children-privacy', label: '12. Children’s Privacy' },
  { id: 'policy-changes', label: '13. Changes to This Policy' },
  { id: 'contact-info', label: '14. Contact Information' },
]

export default function PrivacyPolicy() {
  return (
    <Layout>
      <SeoHead
        title="Privacy Policy — Surprise Planner"
        description="Official Privacy Policy for Surprise Planner. Learn how we collect, store, protect, and handle user, recipient, location, and order data."
        path="/privacy-policy"
      />

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Header Badge & Title */}
        <div className="border-b border-line pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-pink/30 bg-pink/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-pink-hot">
              <ShieldCheck className="h-3.5 w-3.5" />
              Privacy & Data Protection
            </span>
            <span className="text-xs text-fog">Effective Date: October 2026</span>
          </div>

          <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-snow sm:text-4xl lg:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-fog sm:text-lg">
            At <strong className="text-snow">Surprise Planner</strong> (&ldquo;Surprise&rdquo;, &ldquo;we&rdquo;,
            &ldquo;us&rdquo;, or &ldquo;our&rdquo;), we respect your privacy and are committed to protecting the
            personal information you share with us. This Privacy Policy details the data collected through our
            mobile applications, web application, and associated services, and explains how that information is
            used, stored, protected, and shared.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-fog">
            <span className="inline-flex items-center gap-1 rounded-md bg-panel px-2.5 py-1.5 border border-line">
              <Lock className="h-3.5 w-3.5 text-pink-hot" /> Publicly Accessible (No Login Required)
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-panel px-2.5 py-1.5 border border-line">
              <Server className="h-3.5 w-3.5 text-emerald-400" /> Compliant with Google Play Developer Policies
            </span>
          </div>
        </div>

        {/* Layout with Side Navigation on Desktop */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr]">
          {/* Sticky Table of Contents on Desktop */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-line bg-panel/70 p-5 backdrop-blur-sm">
              <p className="font-ui text-xs font-semibold uppercase tracking-widest text-pink-hot">
                Table of Contents
              </p>
              <nav className="mt-4 space-y-1.5 text-xs">
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="block rounded-lg px-2.5 py-1.5 text-fog transition-colors hover:bg-white/5 hover:text-snow"
                  >
                    {sec.label}
                  </a>
                ))}
              </nav>

              <div className="mt-6 border-t border-line/60 pt-4 text-[11px] text-fog/80">
                Need help or wish to request data deletion?
                <a
                  href="mailto:privacy@surpriseplanner.com"
                  className="mt-1.5 block font-medium text-pink-hot hover:underline"
                >
                  privacy@surpriseplanner.com
                </a>
              </div>
            </div>
          </aside>

          {/* Policy Document Content */}
          <div className="space-y-12 text-sm leading-relaxed text-fog sm:text-base">
            {/* Section 1 */}
            <section id="introduction" className="scroll-mt-24 rounded-2xl border border-line bg-panel/40 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink/10 text-pink-hot">
                  <FileText className="h-5 w-5" />
                </div>
                <h2 className="font-display text-xl font-bold text-snow sm:text-2xl">
                  1. Introduction &amp; Scope
                </h2>
              </div>
              <div className="mt-4 space-y-3">
                <p>
                  Surprise Planner provides an on-demand surprise experience platform where users can select, design,
                  schedule, and execute real-world surprise missions (such as birthday celebrations, anniversaries,
                  musical performances, and custom gift deliveries) for loved ones, coordinated by vetted on-ground
                  crews.
                </p>
                <p>
                  This Privacy Policy applies to all users of our Android mobile application, web client deployed on
                  Vercel, customer support channels, and crew partner portals. By using Surprise Planner, you agree to
                  the collection and use of information in accordance with this policy.
                </p>
                <p>
                  This page is publicly accessible without requiring account login or authentication, fulfilling Google
                  Play Store policy requirements for public transparency.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section id="data-collection" className="scroll-mt-24 rounded-2xl border border-line bg-panel/40 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink/10 text-pink-hot">
                  <UserCheck className="h-5 w-5" />
                </div>
                <h2 className="font-display text-xl font-bold text-snow sm:text-2xl">
                  2. Information We Collect
                </h2>
              </div>

              <div className="mt-4 space-y-4">
                <p>
                  We only collect information necessary to deliver personalized surprise services, manage your account,
                  verify delivery partners, and fulfill customer requests:
                </p>

                <div className="space-y-4">
                  <div className="rounded-xl border border-line/70 bg-void/60 p-4">
                    <h3 className="font-semibold text-snow">A. Account Registration &amp; Profile Details</h3>
                    <p className="mt-1 text-sm text-fog">
                      When you create an account or sign in, we collect your name, email address, phone number,
                      and account credentials. This information is used to authenticate your identity, secure your
                      account, maintain your booking history, and provide customer notifications.
                    </p>
                  </div>

                  <div className="rounded-xl border border-line/70 bg-void/60 p-4">
                    <h3 className="font-semibold text-snow">B. Surprise Mission &amp; Order Details</h3>
                    <p className="mt-1 text-sm text-fog">
                      When you customize or book a surprise mission, you provide details about the recipient and the event:
                    </p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-fog">
                      <li>
                        <strong className="text-snow">Recipient Information:</strong> Full name of the recipient, their
                        relationship to you (e.g., partner, friend, parent, colleague), and contact phone number
                        required for on-ground delivery coordination.
                      </li>
                      <li>
                        <strong className="text-snow">Mission Personalization:</strong> Occasion type (Birthday,
                        Anniversary, Proposal, Congratulations, etc.), recipient likes/interests, dislikes or allergies,
                        personalized greeting messages or letters, and special crew instructions.
                      </li>
                      <li>
                        <strong className="text-snow">Custom Package Components:</strong> Selected performers (singers,
                        dancers, magicians, cake artists, photographers), cakes, floral arrangements, balloons, and
                        requested add-ons.
                      </li>
                      <li>
                        <strong className="text-snow">Schedule:</strong> The designated date and execution time window for
                        the surprise.
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-xl border border-line/70 bg-void/60 p-4">
                    <h3 className="font-semibold text-snow">C. Crew &amp; Partner Applications</h3>
                    <p className="mt-1 text-sm text-fog">
                      For individuals applying to join our vetted Surprise Crew, we collect applicant full name, contact
                      phone number (WhatsApp enabled), operating city, performance skills, portfolio or video links,
                      Instagram profile handle, bio, experience level, availability windows, and consent for identity
                      and skill verification.
                    </p>
                  </div>

                  <div className="rounded-xl border border-line/70 bg-void/60 p-4">
                    <h3 className="font-semibold text-snow">D. Session &amp; Client Storage Information</h3>
                    <p className="mt-1 text-sm text-fog">
                      To provide a smooth booking flow and prevent data loss, the application uses local device storage
                      (<code className="rounded bg-line/60 px-1 py-0.5 text-xs text-pink-hot">sessionStorage</code> and{' '}
                      <code className="rounded bg-line/60 px-1 py-0.5 text-xs text-pink-hot">localStorage</code>) to
                      temporarily cache active drafts, planner inputs, reveal codes, and active session tokens.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="location-data" className="scroll-mt-24 rounded-2xl border border-line bg-panel/40 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink/10 text-pink-hot">
                  <MapPin className="h-5 w-5" />
                </div>
                <h2 className="font-display text-xl font-bold text-snow sm:text-2xl">
                  3. Location &amp; Address Information
                </h2>
              </div>

              <div className="mt-4 space-y-3">
                <p>
                  Physical location data is essential for our business operations because our core service consists of
                  dispatching on-ground crews to physical venues across supported Indian metropolitan areas (including
                  Hyderabad, Mumbai, Bangalore, Delhi, Pune, Chennai, and Kolkata).
                </p>
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-snow">
                  <strong className="text-amber-300">How Location is Collected &amp; Handled:</strong>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-fog">
                    <li>
                      <strong className="text-snow">User-Provided Venue Address:</strong> You explicitly input the
                      destination city, street address, building/flat details, and landmark instructions during the
                      &ldquo;When &amp; Where&rdquo; phase of booking.
                    </li>
                    <li>
                      <strong className="text-snow">Operational Purpose Only:</strong> Venue addresses are used strictly to
                      navigate our vetted crew to the delivery point at the scheduled time.
                    </li>
                    <li>
                      <strong className="text-snow">No Continuous Background Tracking:</strong> Surprise Planner does NOT
                      silently track or harvest your background GPS location when the app is closed. Any location input is
                      deliberate and user-provided for order fulfillment.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section id="api-backend" className="scroll-mt-24 rounded-2xl border border-line bg-panel/40 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink/10 text-pink-hot">
                  <Server className="h-5 w-5" />
                </div>
                <h2 className="font-display text-xl font-bold text-snow sm:text-2xl">
                  4. API &amp; Backend Communication
                </h2>
              </div>

              <div className="mt-4 space-y-3">
                <p>
                  All interactions between the Surprise Planner mobile app or web client and our backend servers are
                  conducted over modern, encrypted protocols:
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    <strong className="text-snow">Encrypted HTTPS/TLS:</strong> All API requests, authentication payloads,
                    and form submissions are encrypted in transit using industry-standard TLS encryption to prevent
                    eavesdropping, interception, or tampering.
                  </li>
                  <li>
                    <strong className="text-snow">Authentication Headers:</strong> Protected administrative and operational
                    endpoints require cryptographically verified bearer tokens, safeguarding confidential customer and
                    order records against unauthorized access.
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 5 */}
            <section id="database-storage" className="scroll-mt-24 rounded-2xl border border-line bg-panel/40 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink/10 text-pink-hot">
                  <Database className="h-5 w-5" />
                </div>
                <h2 className="font-display text-xl font-bold text-snow sm:text-2xl">
                  5. Database Storage (MongoDB)
                </h2>
              </div>

              <div className="mt-4 space-y-3">
                <p>
                  Surprise Planner stores persistent application records, order lifecycle statuses, crew profiles, and
                  customer accounts in managed <strong className="text-snow">MongoDB</strong> database clusters:
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    <strong className="text-snow">Encryption at Rest:</strong> Database volumes are encrypted at rest using
                    standard AES-256 encryption.
                  </li>
                  <li>
                    <strong className="text-snow">Strict Access Controls:</strong> Access to production MongoDB databases
                    is tightly restricted to authorized backend services via secure credentials, virtual private
                    networks (VPC), and IP whitelisting.
                  </li>
                  <li>
                    <strong className="text-snow">Automated Backups:</strong> Regular encrypted snapshots are maintained to
                    prevent data loss and ensure platform resilience.
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 6 */}
            <section id="third-party-services" className="scroll-mt-24 rounded-2xl border border-line bg-panel/40 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink/10 text-pink-hot">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h2 className="font-display text-xl font-bold text-snow sm:text-2xl">
                  6. Third-Party Services &amp; Integrations
                </h2>
              </div>

              <div className="mt-4 space-y-4">
                <p>
                  We integrate with select third-party service providers to deliver key features. We only share the minimum
                  data required for each provider to perform its function:
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-line bg-void/50 p-4">
                    <h3 className="font-semibold text-snow">Anthropic AI (Claude)</h3>
                    <p className="mt-1 text-xs text-fog leading-relaxed">
                      Powers our creative AI Surprise Planner. When you request a custom surprise suggestion, your
                      creative prompt (occasion, relationship, city) is sent securely to Anthropic API to generate tailored
                      mission ideas and crew notes. Personal identifiers like full address and payment details are never
                      sent to the AI model.
                    </p>
                  </div>

                  <div className="rounded-xl border border-line bg-void/50 p-4">
                    <h3 className="font-semibold text-snow">Cloudinary Media CDN</h3>
                    <p className="mt-1 text-xs text-fog leading-relaxed">
                      Used for hosting, transcoding, and streaming video reels and promotional media assets for
                      experiences. Media delivery does not collect or transmit user personal identifiers.
                    </p>
                  </div>

                  <div className="rounded-xl border border-line bg-void/50 p-4">
                    <h3 className="font-semibold text-snow">Mapping &amp; Navigation Services</h3>
                    <p className="mt-1 text-xs text-fog leading-relaxed">
                      Mapping integrations (including Google Maps) may be utilized for address geocoding, route
                      optimization, and providing driving directions for crew members traveling to the celebration venue.
                    </p>
                  </div>

                  <div className="rounded-xl border border-line bg-void/50 p-4">
                    <h3 className="font-semibold text-snow">Vercel Cloud Hosting</h3>
                    <p className="mt-1 text-xs text-fog leading-relaxed">
                      Our web frontend is hosted on Vercel&apos;s global edge network. Vercel processes standard web access
                      logs (IP address, user-agent, request timestamp) for security, DDoS protection, and reliability.
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-line/70 bg-void/60 p-4 text-xs">
                  <strong className="text-snow">Payment Processors:</strong> We partner with trusted, RBI-authorized and
                  PCI-DSS certified payment gateways (such as UPI providers, Razorpay, or Stripe). When paying for a
                  surprise, your sensitive financial details (card numbers, UPI PINs) are processed directly by the payment
                  processor. Surprise Planner never stores or sees your complete payment credentials.
                </div>
              </div>
            </section>

            {/* Section 7 */}
            <section id="how-we-use-data" className="scroll-mt-24 rounded-2xl border border-line bg-panel/40 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink/10 text-pink-hot">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h2 className="font-display text-xl font-bold text-snow sm:text-2xl">
                  7. How We Use Information
                </h2>
              </div>

              <div className="mt-4 space-y-3">
                <p>We use the data we collect solely for legitimate business purposes:</p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>To coordinate, assemble, and execute physical surprise missions at the requested time and address.</li>
                  <li>To provide live order tracking, timeline updates, and interactive scratch-card reveals.</li>
                  <li>To enable verified crew members to fulfill deliveries, musical performances, photography, and decor.</li>
                  <li>To process booking transactions and issue digital confirmations and invoices.</li>
                  <li>To review, verify, and onboard performers and crew applicants.</li>
                  <li>To provide prompt customer assistance via WhatsApp support, email, or telephone.</li>
                  <li>To detect and prevent fraudulent bookings, abuse, or unauthorized access.</li>
                </ul>
              </div>
            </section>

            {/* Section 8 */}
            <section id="data-storage-protection" className="scroll-mt-24 rounded-2xl border border-line bg-panel/40 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink/10 text-pink-hot">
                  <Lock className="h-5 w-5" />
                </div>
                <h2 className="font-display text-xl font-bold text-snow sm:text-2xl">
                  8. Storage &amp; Security Safeguards
                </h2>
              </div>

              <div className="mt-4 space-y-3">
                <p>
                  We implement robust administrative, technical, and physical security measures to protect your personal
                  data against unauthorized access, destruction, loss, alteration, or disclosure:
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>End-to-end HTTPS/TLS data encryption across all web and mobile communications.</li>
                  <li>Role-based access controls limiting order visibility strictly to assigned staff and crew.</li>
                  <li>Regular auditing of server environments, database credentials, and operational access keys.</li>
                  <li>Contractual non-disclosure and privacy obligations binding all verified crew performers.</li>
                </ul>
              </div>
            </section>

            {/* Section 9 */}
            <section id="data-sharing" className="scroll-mt-24 rounded-2xl border border-line bg-panel/40 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink/10 text-pink-hot">
                  <Users className="h-5 w-5" />
                </div>
                <h2 className="font-display text-xl font-bold text-snow sm:text-2xl">
                  9. Data Sharing &amp; Disclosure
                </h2>
              </div>

              <div className="mt-4 space-y-3">
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-200">
                  <strong>We do not sell your personal data:</strong> Surprise Planner does not sell, rent, monetize, or
                  lease your personal information or recipient details to third-party advertisers, data aggregators, or
                  telemarketers under any circumstance.
                </div>
                <p className="mt-3">We share data only under the following limited conditions:</p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    <strong className="text-snow">Assigned Surprise Crew:</strong> The on-ground performers assigned to your
                    booking receive only the specific mission brief (recipient name, venue address, delivery time, and contact
                    phone) strictly needed to carry out the surprise.
                  </li>
                  <li>
                    <strong className="text-snow">Cloud Service Providers:</strong> Trusted infrastructure and database
                    vendors (Vercel, MongoDB, Cloudinary) who host and run our services under strict confidentiality agreements.
                  </li>
                  <li>
                    <strong className="text-snow">Legal Obligations:</strong> When required by Indian law, judicial summons,
                    or lawful government request to protect the rights, property, or physical safety of our users, crew, or the public.
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 10 */}
            <section id="data-retention" className="scroll-mt-24 rounded-2xl border border-line bg-panel/40 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink/10 text-pink-hot">
                  <Clock className="h-5 w-5" />
                </div>
                <h2 className="font-display text-xl font-bold text-snow sm:text-2xl">
                  10. Data Retention
                </h2>
              </div>

              <div className="mt-4 space-y-3">
                <p>
                  We retain personal data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy:
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    <strong className="text-snow">Booking &amp; Order History:</strong> Retained for active customer
                    service, re-ordering, financial auditing, and taxation requirements in accordance with applicable Indian laws.
                  </li>
                  <li>
                    <strong className="text-snow">Temporary Client Sessions:</strong> Draft surprise configurations stored
                    in your browser or device session storage expire when cleared or when the browser session terminates.
                  </li>
                  <li>
                    <strong className="text-snow">Partner Applications:</strong> Partner information is retained for the
                    duration of the evaluation and crew membership, or until a deletion request is received.
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 11 */}
            <section id="user-rights-deletion" className="scroll-mt-24 rounded-2xl border border-line bg-panel/40 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink/10 text-pink-hot">
                  <Trash2 className="h-5 w-5" />
                </div>
                <h2 className="font-display text-xl font-bold text-snow sm:text-2xl">
                  11. User Rights &amp; Data Deletion Process
                </h2>
              </div>

              <div className="mt-4 space-y-3">
                <p>
                  You have full control over your personal data. In compliance with global privacy regulations and Google
                  Play Store user data requirements, you possess the right to:
                </p>
                <ul className="list-disc space-y-1 pl-5">
                  <li>Request access to the personal data we hold about you.</li>
                  <li>Request correction of inaccurate or incomplete information.</li>
                  <li>Request permanent deletion of your account and associated personal data.</li>
                  <li>Withdraw consent for optional data processing.</li>
                </ul>

                <div className="mt-4 rounded-xl border border-line bg-void/70 p-5">
                  <h3 className="font-semibold text-snow">How to Request Account &amp; Data Deletion:</h3>
                  <p className="mt-2 text-sm text-fog">
                    To delete your account, order history, or any personal data associated with your profile or email:
                  </p>
                  <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-fog">
                    <li>
                      Send an email to{' '}
                      <a href="mailto:privacy@surpriseplanner.com" className="font-semibold text-pink-hot hover:underline">
                        privacy@surpriseplanner.com
                      </a>{' '}
                      or{' '}
                      <a href="mailto:support@surprise.india" className="font-semibold text-pink-hot hover:underline">
                        support@surprise.india
                      </a>
                    </li>
                    <li>Use the subject line: <code className="rounded bg-line px-1.5 py-0.5 text-snow">Data Deletion Request - [Your Name / Email]</code></li>
                    <li>Specify whether you wish to delete your complete account, specific order records, or crew application data.</li>
                  </ol>
                  <p className="mt-3 text-xs text-fog">
                    Our privacy team will verify your identity and process your deletion request within <strong className="text-snow">30 days</strong>,
                    permanently removing your records from our MongoDB database, subject only to statutory tax or legal retention requirements.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 12 */}
            <section id="children-privacy" className="scroll-mt-24 rounded-2xl border border-line bg-panel/40 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink/10 text-pink-hot">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h2 className="font-display text-xl font-bold text-snow sm:text-2xl">
                  12. Children&apos;s Privacy
                </h2>
              </div>

              <div className="mt-4 space-y-3">
                <p>
                  Surprise Planner is intended for general audiences aged 18 and above. Our services, booking platform,
                  and crew applications are not directed to individuals under the age of 13 (or under 18 without parental or
                  guardian authorization).
                </p>
                <p>
                  We do not knowingly collect personal data from children under 13. If you become aware that a minor has
                  provided us with personal information without parental consent, please contact us immediately at{' '}
                  <a href="mailto:privacy@surpriseplanner.com" className="text-pink-hot hover:underline">
                    privacy@surpriseplanner.com
                  </a>
                  , and we will promptly delete such information.
                </p>
              </div>
            </section>

            {/* Section 13 */}
            <section id="policy-changes" className="scroll-mt-24 rounded-2xl border border-line bg-panel/40 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink/10 text-pink-hot">
                  <FileText className="h-5 w-5" />
                </div>
                <h2 className="font-display text-xl font-bold text-snow sm:text-2xl">
                  13. Changes to This Privacy Policy
                </h2>
              </div>

              <div className="mt-4 space-y-3">
                <p>
                  We may update our Privacy Policy periodically to reflect enhancements in our application features, legal
                  standards, or operational practices. Any modifications will be posted directly on this page at{' '}
                  <code className="rounded bg-line px-1.5 py-0.5 text-xs text-pink-hot">/privacy-policy</code> with an updated
                  &ldquo;Effective Date&rdquo;.
                </p>
                <p>
                  We encourage you to review this policy periodically. Continued use of our mobile app or web platform
                  following the posting of changes constitutes your acceptance of the updated policy.
                </p>
              </div>
            </section>

            {/* Section 14 */}
            <section id="contact-info" className="scroll-mt-24 rounded-2xl border border-line bg-panel/40 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink/10 text-pink-hot">
                  <Mail className="h-5 w-5" />
                </div>
                <h2 className="font-display text-xl font-bold text-snow sm:text-2xl">
                  14. Contact Information &amp; Grievances
                </h2>
              </div>

              <div className="mt-4 space-y-4">
                <p>
                  If you have questions, feedback, or grievance inquiries regarding this Privacy Policy or our data
                  handling practices, please contact our Data Protection and Support team:
                </p>

                <div className="rounded-xl border border-line bg-void/60 p-5 space-y-2 text-sm">
                  <p>
                    <strong className="text-snow">Entity Name:</strong> Surprise Planner (&ldquo;Surprise India&rdquo;)
                  </p>
                  <p>
                    <strong className="text-snow">Privacy &amp; Data Rights:</strong>{' '}
                    <a href="mailto:privacy@surpriseplanner.com" className="text-pink-hot hover:underline">
                      privacy@surpriseplanner.com
                    </a>
                  </p>
                  <p>
                    <strong className="text-snow">General Customer Support:</strong>{' '}
                    <a href="mailto:support@surprise.india" className="text-pink-hot hover:underline">
                      support@surprise.india
                    </a>
                  </p>
                  <p>
                    <strong className="text-snow">WhatsApp Support:</strong> Available directly via our web &amp; mobile app
                  </p>
                  <p>
                    <strong className="text-snow">Operating Region:</strong> India
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 rounded-xl border border-line bg-panel px-4 py-2.5 text-xs font-semibold text-snow transition-colors hover:border-pink-hot/50 hover:text-pink-hot"
                  >
                    ← Return to Home
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </Layout>
  )
}

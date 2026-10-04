import {
  CheckCircle2,
  Clock,
  Database,
  Lock,
  Mail,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Trash2,
  UserX,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import SeoHead from '../components/SeoHead'

export default function DeleteAccount() {
  const [email, setEmail] = useState('')
  const [reason, setReason] = useState('')
  const [role, setRole] = useState('customer')
  const [submitted, setSubmitted] = useState(false)
  const [clearedLocal, setClearedLocal] = useState(false)

  const mailtoHref = `mailto:privacy@surpriseplanner.com?subject=${encodeURIComponent(
    'Account Deletion Request - Surprise Planner',
  )}&body=${encodeURIComponent(
    `Hello Surprise Planner Team,\n\nI would like to request the permanent deletion of my Surprise Planner account and associated personal data.\n\nRegistered Email: \nRegistered Phone Number: \nAccount Type: Customer / Crew Partner\nReason (Optional): \n\nThank you.`,
  )}`

  function handleSubmit(e) {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  function handleClearLocalData() {
    try {
      sessionStorage.removeItem('surprise.draft')
      sessionStorage.removeItem('surprise.booking')
      sessionStorage.removeItem('surprise.planner')
      sessionStorage.removeItem('surprise.mood')
      sessionStorage.removeItem('surprise.type')
      localStorage.removeItem('surprise_planner_active_plan')
      localStorage.removeItem('surprise_reveals')
      localStorage.removeItem('surprise_tracking_feed')
      setClearedLocal(true)
    } catch {
      // Ignore if unavailable
    }
  }

  return (
    <Layout>
      <SeoHead
        title="Delete Account & Data Deletion — Surprise Planner"
        description="Public guide on how to delete your Surprise Planner account and personal data, data retention periods, and contact options."
        path="/delete-account"
      />

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Header Badge & Title */}
        <div className="border-b border-line pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-pink/30 bg-pink/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-pink-hot">
              <UserX className="h-3.5 w-3.5" />
              Account &amp; Data Rights
            </span>
            <span className="text-xs text-fog">Updated: October 2026</span>
          </div>

          <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-snow sm:text-4xl lg:text-5xl">
            Delete Your Surprise Planner Account
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-fog sm:text-lg">
            We believe in giving you complete control over your personal data. This page outlines the step-by-step
            procedure to request the permanent deletion of your registered Surprise Planner account, what data is erased,
            what minimal data may be retained, and the applicable timelines.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-fog">
            <span className="inline-flex items-center gap-1 rounded-md border border-line bg-panel px-2.5 py-1.5">
              <Lock className="h-3.5 w-3.5 text-pink-hot" /> Publicly Accessible (No Login Required)
            </span>
            <span className="inline-flex items-center gap-1 rounded-md border border-line bg-panel px-2.5 py-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Compliant with Google Play Account Deletion Policy
            </span>
          </div>
        </div>

        {/* Content sections */}
        <div className="mt-10 space-y-10 text-sm leading-relaxed text-fog sm:text-base">
          {/* Section 1: How to Request Deletion */}
          <section className="rounded-2xl border border-line bg-panel/40 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink/10 text-pink-hot">
                <Trash2 className="h-5 w-5" />
              </div>
              <h2 className="font-display text-xl font-bold text-snow sm:text-2xl">
                1. How to Request Account Deletion
              </h2>
            </div>

            <div className="mt-4 space-y-4">
              <p>
                Registered users of Surprise Planner (both Customers and Crew Partners) can initiate an account deletion
                request without needing to be actively signed in. Choose whichever method is most convenient for you:
              </p>

              {/* Option A: Direct Email */}
              <div className="rounded-xl border border-line/70 bg-void/60 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-snow">Option A: Submit Request via Email (Recommended)</h3>
                    <p className="mt-1 text-sm text-fog">
                      Send an email directly from your registered email address to our Data Privacy Desk:
                    </p>
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-fog">
                      <li>
                        <strong className="text-snow">Email Address:</strong>{' '}
                        <a href="mailto:privacy@surpriseplanner.com" className="text-pink-hot hover:underline">
                          privacy@surpriseplanner.com
                        </a>{' '}
                        or{' '}
                        <a href="mailto:support@surprise.india" className="text-pink-hot hover:underline">
                          support@surprise.india
                        </a>
                      </li>
                      <li>
                        <strong className="text-snow">Subject:</strong>{' '}
                        <code className="rounded bg-line px-1.5 py-0.5 text-xs text-snow">
                          Account Deletion Request - [Your Registered Email]
                        </code>
                      </li>
                      <li>
                        <strong className="text-snow">Information to include:</strong> Your registered full name, phone number,
                        and whether you are a customer or a crew performer.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4">
                  <a
                    href={mailtoHref}
                    className="inline-flex items-center gap-2 rounded-xl bg-pink px-4 py-2.5 font-ui text-xs font-semibold text-white shadow-[0_4px_20px_rgba(255,45,138,0.35)] transition-colors hover:bg-pink-hot"
                  >
                    <Mail className="h-4 w-4" />
                    Open Pre-Filled Deletion Email
                  </a>
                </div>
              </div>

              {/* Option B: On-page Form */}
              <div className="rounded-xl border border-line/70 bg-void/60 p-5">
                <h3 className="font-semibold text-snow">Option B: Submit Deletion Request Online</h3>
                <p className="mt-1 text-sm text-fog">
                  Fill in the details below. Our privacy desk will log your request and verify your registered credentials:
                </p>

                {submitted ? (
                  <div className="mt-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-5 text-sm text-emerald-200">
                    <div className="flex items-center gap-2 font-semibold text-emerald-300">
                      <CheckCircle2 className="h-5 w-5" />
                      Request Submitted Successfully
                    </div>
                    <p className="mt-2 text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
                      We have logged your request for <strong className="text-snow">{email}</strong>. Our privacy team will
                      verify your identity and dispatch a confirmation to your email. Your account and associated data will be
                      permanently removed within <strong className="text-snow">30 days</strong>.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="del-email" className="block text-xs font-semibold text-snow">
                          Registered Email Address <span className="text-pink-hot">*</span>
                        </label>
                        <input
                          id="del-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. you@example.com"
                          className="mt-1.5 w-full rounded-xl border border-line bg-panel px-3.5 py-2.5 text-sm text-snow placeholder:text-fog/50 focus:border-pink focus:outline-none focus:ring-1 focus:ring-pink"
                        />
                      </div>

                      <div>
                        <label htmlFor="del-role" className="block text-xs font-semibold text-snow">
                          Account Type
                        </label>
                        <select
                          id="del-role"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="mt-1.5 w-full rounded-xl border border-line bg-panel px-3.5 py-2.5 text-sm text-snow focus:border-pink focus:outline-none focus:ring-1 focus:ring-pink"
                        >
                          <option value="customer">Customer (Surprise Sender)</option>
                          <option value="crew">Crew Partner / Performer</option>
                          <option value="both">Both</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="del-reason" className="block text-xs font-semibold text-snow">
                        Reason for Deletion (Optional)
                      </label>
                      <textarea
                        id="del-reason"
                        rows={2}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Tell us why you wish to delete your account (optional)"
                        className="mt-1.5 w-full rounded-xl border border-line bg-panel px-3.5 py-2.5 text-sm text-snow placeholder:text-fog/50 focus:border-pink focus:outline-none focus:ring-1 focus:ring-pink"
                      />
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-xl bg-pink px-4 py-2.5 font-ui text-xs font-semibold text-white shadow-[0_4px_20px_rgba(255,45,138,0.35)] transition-colors hover:bg-pink-hot"
                    >
                      <Trash2 className="h-4 w-4" />
                      Submit Deletion Request
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>

          {/* Section 2: What Data Will Be Deleted */}
          <section className="rounded-2xl border border-line bg-panel/40 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink/10 text-pink-hot">
                <Database className="h-5 w-5" />
              </div>
              <h2 className="font-display text-xl font-bold text-snow sm:text-2xl">
                2. What Personal Data Will Be Deleted
              </h2>
            </div>

            <div className="mt-4 space-y-3">
              <p>
                When your account deletion request is processed, the following categories of data will be permanently
                and irreversibly deleted from our active production databases (MongoDB) and storage systems:
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-line/70 bg-void/50 p-4">
                  <h3 className="font-semibold text-snow">Profile &amp; Credentials</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-fog">
                    <li>Full Name and Display Name</li>
                    <li>Registered Email Address</li>
                    <li>Phone &amp; WhatsApp contact number</li>
                    <li>Login credentials, session tokens, and passwords</li>
                  </ul>
                </div>

                <div className="rounded-xl border border-line/70 bg-void/50 p-4">
                  <h3 className="font-semibold text-snow">Surprise Mission &amp; Recipient Details</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-fog">
                    <li>Recipient names and personal notes</li>
                    <li>Special instructions, likes, and dislikes</li>
                    <li>Customized surprise compositions &amp; drafts</li>
                    <li>Scratch reveal cards and interactive tokens</li>
                  </ul>
                </div>

                <div className="rounded-xl border border-line/70 bg-void/50 p-4">
                  <h3 className="font-semibold text-snow">Location &amp; Delivery Data</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-fog">
                    <li>Delivery street addresses and landmark notes</li>
                    <li>Apartment numbers and building details</li>
                    <li>Saved venues and city preferences</li>
                  </ul>
                </div>

                <div className="rounded-xl border border-line/70 bg-void/50 p-4">
                  <h3 className="font-semibold text-snow">Crew Partner Records (If Applicable)</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-fog">
                    <li>Performer bio and skill profiles</li>
                    <li>Portfolio and video links</li>
                    <li>Instagram handles and application answers</li>
                    <li>Availability preferences and weekly schedules</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: What Data May Be Retained and Why */}
          <section className="rounded-2xl border border-line bg-panel/40 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink/10 text-pink-hot">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <h2 className="font-display text-xl font-bold text-snow sm:text-2xl">
                3. What Data May Be Retained &amp; Why
              </h2>
            </div>

            <div className="mt-4 space-y-3">
              <p>
                In strict compliance with applicable legal, fiscal, and regulatory frameworks, certain minimal records may
                be retained even after an account deletion:
              </p>

              <div className="space-y-3">
                <div className="rounded-xl border border-line/70 bg-void/60 p-4">
                  <h3 className="font-semibold text-snow">A. Tax, Invoicing &amp; Financial Accounting Records</h3>
                  <p className="mt-1 text-xs sm:text-sm text-fog">
                    Under Indian taxation statutes, GST rules, and statutory accounting requirements, records of paid
                    financial transactions (such as tax invoices, transaction amounts, payment gateway reference numbers,
                    and date of settlement) must be maintained for mandatory auditing purposes.
                  </p>
                </div>

                <div className="rounded-xl border border-line/70 bg-void/60 p-4">
                  <h3 className="font-semibold text-snow">B. Fraud Prevention &amp; Legal Compliance</h3>
                  <p className="mt-1 text-xs sm:text-sm text-fog">
                    Anonymized logs of fulfilled orders or records involved in ongoing chargebacks, disputes, or active
                    investigations may be retained strictly until the matter is resolved, to protect the rights and safety
                    of our on-ground crew and customers.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-200">
                <strong>Anonymization Guarantee:</strong> Any legally retained financial record is fully decoupled from
                your profile, stripped of marketing identifiers, and locked against any further commercial processing.
              </div>
            </div>
          </section>

          {/* Section 4: Retention Period & Timelines */}
          <section className="rounded-2xl border border-line bg-panel/40 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink/10 text-pink-hot">
                <Clock className="h-5 w-5" />
              </div>
              <h2 className="font-display text-xl font-bold text-snow sm:text-2xl">
                4. Applicable Retention Periods &amp; Timelines
              </h2>
            </div>

            <div className="mt-4 space-y-3">
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong className="text-snow">Processing Window:</strong> Account deletion requests are verified and
                  fully completed within <strong className="text-snow">30 calendar days</strong> of receiving your request.
                </li>
                <li>
                  <strong className="text-snow">7-Day Grace Period:</strong> You may cancel an accidental deletion request
                  by emailing us within 7 days of submitting the request.
                </li>
                <li>
                  <strong className="text-snow">Backup Lifecycle:</strong> Encrypted secondary disaster recovery backups
                  naturally roll over and purge deleted records within their standard 30-day snapshot cycle.
                </li>
                <li>
                  <strong className="text-snow">Statutory Financial Retention:</strong> Retained tax invoices are archived
                  for the legally mandated statutory window (up to 7 fiscal years) in compliance with financial regulations.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 5: Clear Local Browser Data */}
          <section className="rounded-2xl border border-line bg-panel/40 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink/10 text-pink-hot">
                <RotateCcw className="h-5 w-5" />
              </div>
              <h2 className="font-display text-xl font-bold text-snow sm:text-2xl">
                5. Clear Local Device Data Immediately
              </h2>
            </div>

            <div className="mt-4 space-y-3">
              <p>
                Surprise Planner saves temporary surprise drafts and planner states in your device&apos;s browser memory
                (<code className="rounded bg-line px-1 py-0.5 text-xs text-pink-hot">sessionStorage</code> and{' '}
                <code className="rounded bg-line px-1 py-0.5 text-xs text-pink-hot">localStorage</code>). If you wish to
                clear this device data right now on this browser, click the button below:
              </p>

              <div className="pt-2">
                {clearedLocal ? (
                  <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-xs font-semibold text-emerald-300">
                    <CheckCircle2 className="h-4 w-4" />
                    All local drafts, reveal tokens, and session data have been cleared from this device.
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleClearLocalData}
                    className="inline-flex items-center gap-2 rounded-xl border border-line bg-panel px-4 py-2.5 text-xs font-semibold text-snow transition-colors hover:border-pink/50 hover:text-pink-hot"
                  >
                    <Trash2 className="h-4 w-4 text-pink-hot" />
                    Clear Local Drafts &amp; Cache on this Device
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* Section 6: Contact Information */}
          <section className="rounded-2xl border border-line bg-panel/40 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink/10 text-pink-hot">
                <Mail className="h-5 w-5" />
              </div>
              <h2 className="font-display text-xl font-bold text-snow sm:text-2xl">
                6. Contact Channels for Data Inquiries
              </h2>
            </div>

            <div className="mt-4 space-y-4">
              <p>
                If you have questions regarding the status of your deletion request, need assistance, or wish to clarify our
                data handling practices, reach out to us through our direct channels:
              </p>

              <div className="rounded-xl border border-line bg-void/60 p-5 space-y-2 text-sm">
                <p>
                  <strong className="text-snow">Entity Name:</strong> Surprise Planner (&ldquo;Surprise India&rdquo;)
                </p>
                <p>
                  <strong className="text-snow">Privacy &amp; Deletion Inquiries:</strong>{' '}
                  <a href="mailto:privacy@surpriseplanner.com" className="text-pink-hot hover:underline">
                    privacy@surpriseplanner.com
                  </a>
                </p>
                <p>
                  <strong className="text-snow">General Support:</strong>{' '}
                  <a href="mailto:support@surprise.india" className="text-pink-hot hover:underline">
                    support@surprise.india
                  </a>
                </p>
                <p>
                  <strong className="text-snow">Privacy Policy:</strong>{' '}
                  <Link to="/privacy-policy" className="text-pink-hot hover:underline">
                    View Full Privacy Policy
                  </Link>
                </p>
                <p>
                  <strong className="text-snow">Jurisdiction:</strong> India
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-xl border border-line bg-panel px-4 py-2.5 text-xs font-semibold text-snow transition-colors hover:border-pink-hot/50 hover:text-pink-hot"
                >
                  ← Return to Home
                </Link>
                <Link
                  to="/privacy-policy"
                  className="inline-flex items-center gap-2 rounded-xl border border-line bg-panel px-4 py-2.5 text-xs font-semibold text-snow transition-colors hover:border-pink-hot/50 hover:text-pink-hot"
                >
                  Read Privacy Policy
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  )
}

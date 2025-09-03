import Image from "next/image";
import logoImg from '@/assets/logo.webp';
import Link from "next/link";
import { getSession } from "@/features/auth";
import { StartPageButton } from "@/shared/ui/buttons/StartPageButtons";
import { cn } from "@/shared/lib/utils";
export default async function ExtensionPrivacy() {
  const { isAuthorized } = await getSession()
  return (
    <>
      <header className="bg-sidebar ">
        <div className="max-w-[1200px] px-6 mx-auto flex items-center justify-between py-3 sm:py-6 gap-12">
          <Link href="/">
            <Image
              src={logoImg}
              alt="RekrutAi logo"
              className="w-40 mix-blend-plus-lighter"
            />
          </Link>
          {
            isAuthorized
            && <div className="flex gap-6 items-center">
              <StartPageButton asChild>
                <Link href={'/dashboard'} >
                  Dashboard
                </Link>
              </StartPageButton>
            </div>
          }
        </div>
      </header>
      <main className="py-10">
        <div className={cn(
          'max-w-[1200px] mx-auto'
        )}>
          <h1 className="text-3xl font-bold mb-6 text-blue-800">Privacy Policy</h1>
          <p className="mb-4"><strong>Effective Date:</strong> September 2, 2025</p>
          <p className="mb-6">Resume REKRU Extension (the &quot;Extension&quot;) is developed and operated by <strong>RekrutAI</strong> (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;). The Extension is intended for authorized users of our system to assist with automated recruitment and candidate management.</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-blue-700">1. Information We Collect</h2>
          <p className="mb-4">When using the Extension, an authorized user may collect the following data from resumes displayed on supported websites:</p>
          <ul className="list-disc list-inside mb-4">
            <li>Full name of the candidate</li>
            <li>Contact information (email, phone)</li>
            <li>Work experience</li>
            <li>Job title / current or desired position</li>
            <li>Desired salary</li>
            <li>Candidate’s city of residence</li>
            <li>Link to the original resume</li>
            <li>Candidate’s biography</li>
            <li>Skills and competencies</li>
          </ul>
          <p className="mb-4 font-semibold">Important:</p>
          <p className="mb-6">The Extension only collects data <strong>when the user actively initiates the collection</strong>. Data is not collected automatically.</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-blue-700">2. How We Use the Information</h2>
          <p className="mb-4">The collected data is used solely for recruitment purposes by authorized users. Specifically:</p>
          <ul className="list-disc list-inside mb-4">
            <li>Data is stored in our secure database via API requests</li>
            <li>Authorized users can view and manage candidate profiles within our system</li>
            <li>Data is <strong>not sold or shared with third parties</strong></li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-blue-700">3. User Consent</h2>
          <p className="mb-4">By using the Extension, the user acknowledges that they are responsible for collecting candidate information. The Extension provides a <strong>warning notice</strong> before any data is collected.</p>
          <blockquote className="border-l-4 border-blue-400 pl-4 italic mb-4 bg-blue-50 p-4 rounded">
            &quot;Warning: You are about to collect personal data (e.g., name, contacts, experience) from a resume. Ensure you have permission from the owner of this data. All collected data will be sent to our secure server.&quot;
          </blockquote>
          <p className="mb-6">Users must <strong>explicitly agree</strong> to this notice before data is sent.</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-blue-700">4. Data Security</h2>
          <ul className="list-disc list-inside mb-6">
            <li>All data is transmitted over <strong>encrypted HTTPS connections</strong></li>
            <li>Only <strong>authorized users</strong> of the REKRU system can send data via the Extension</li>
            <li>Access to the Extension and the system is controlled by login credentials</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-blue-700">5. Data Retention and Deletion</h2>
          <ul className="list-disc list-inside mb-6">
            <li>Collected data is retained in our database for recruitment purposes</li>
            <li>Users may request the <strong>deletion of specific candidate data</strong> by providing:
              <ul className="list-disc list-inside ml-6">
                <li>The resume identifier as shown in the system</li>
                <li>Their email address</li>
              </ul>
            </li>
            <li>Requests should be sent to <strong>
              <a href="mailto:info@rekru.ru" className="text-blue-600 underline">
                info@rekru.ru
              </a>
            </strong></li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-blue-700">6. Transparency and Limitations</h2>
          <ul className="list-disc list-inside mb-6">
            <li>The Extension is intended for internal/restricted use by authorized REKRU system users.</li>
            <li>We do not guarantee the accuracy or completeness of data collected from third-party websites, as this depends on the source.</li>
            <li>Users are responsible for complying with the TOS of accessed websites</li>
            <li>We do <strong>not</strong> attempt to bypass the Terms of Service of any third-party websites</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-blue-700">7. Contact Information</h2>
          <p className="mb-4">For questions about this Privacy Policy or data management, please contact:</p>
          <p className="mb-2"><strong>RekrutAI</strong></p>
          <p className="mb-2">Email: <a href="mailto:info@rekru.ru" className="text-blue-600 underline">
            info@rekru.ru</a></p>
          <p className="mb-2">Website:
            <a href="https://rekrutai.ru/" className="text-blue-600 underline">https://rekrutai.ru/</a>
          </p>
          <p className="mb-6">Country: Russian Federation</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-blue-700">8. Changes to This Privacy Policy</h2>
          <p className="mb-4">We may update this Privacy Policy to reflect changes in our practices or legal requirements. Updates will be posted on <a href="https://admin.rekrutai.ru//privacy/extension" className="text-blue-600 underline">https://admin.rekrutai.ru//privacy/extension</a>, and users will be notified via email or the REKRU system.</p>
        </div>

      </main>
    </>
  );
}
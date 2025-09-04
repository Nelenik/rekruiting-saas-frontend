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
          <h1 className="text-3xl font-bold text-blue-500 mb-6">
            Privacy Policy for Resume REKRU Extension
          </h1>

          <p className="mb-6 text-gray-700">
            The Resume REKRU Extension (the &quot;Extension&quot;) is developed and operated by RekrutAI (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;).
            The Extension is designed for authorized users of our system and serves as a tool for automating
            recruitment processes and candidate database management.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">
              1. Information Collection Principles
            </h2>
            <p className="mb-4">
              The Extension allows authorized users to access information available on supported websites according to the websites’ Terms of Service.
              The Extension provides a <strong>tool for collecting and managing this information for recruitment purposes</strong>.
              Data collection occurs <strong>only when initiated by the user</strong> and is not automatic.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">
              2. Purpose of Information Use
            </h2>
            <p className="mb-4 text-gray-700">
              Collected data is used exclusively within recruitment activities by authorized users for:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
              <li>Secure storage in our database through API requests</li>
              <li>Viewing and managing candidate profiles within our system</li>
              <li>Candidate selection purposes for further employment</li>
            </ul>
            <p className="text-gray-700">
              <strong>We do not sell or transfer data to third parties.</strong>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">
              3. User Consent and Responsibility
            </h2>
            <p className="mb-4 text-gray-700">
              By using the Extension, the user confirms that they have legal grounds to access candidate information
              in accordance with the terms of use of the respective web platforms. We provide only a technical tool
              for convenient collection and structuring of publicly available information.
            </p>
            <p className="mb-4 text-gray-700">
              The data collection form contains the following notice, and the user must check the consent checkbox before submission:
            </p>
            <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 mb-4">
              <p className="text-yellow-800 font-medium mb-3">
                &quot;Вы собираетесь структурировать данные из резюме на поддерживаемых сайтах. Все данные будут переданы на наш защищённый сервер для дальнейшей обработки.&quot;
              </p>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="consent-checkbox"
                  className="w-4 h-4 text-blue-500 border-2 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="consent-checkbox" className="text-yellow-700 font-medium">
                  Я понимаю и согласен продолжить сбор данных
                </label>
              </div>
            </div>
            <p className="text-gray-700">
              Users must check the consent checkbox before data transmission. The form cannot be submitted without explicit consent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">
              4. Data Security
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>All data transmission is conducted over encrypted HTTPS connections</li>
              <li>Only authorized users of the REKRU system can send data through the Extension</li>
              <li>Access to the Extension and system is controlled by user credentials</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">
              5. Data Storage and Deletion
            </h2>
            <p className="mb-4 text-gray-700">
              Collected data is stored in our database for recruitment purposes. Users may request deletion
              of specific candidate data by providing the resume identifier displayed in the system
            </p>
            <p className="text-gray-700">
              Requests should be sent to <a href="mailto:info@rekru.ru" className="text-blue-500 hover:text-blue-700 underline">info@rekru.ru</a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">
              6. Transparency and Limitations
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>The Extension is intended for internal use by authorized REKRU system users</li>
              <li>We do not guarantee the accuracy or completeness of data collected from third-party websites, as this depends on the source</li>
              <li>Users are responsible for complying with the terms of use of accessed websites</li>
              <li>We provide exclusively a technical solution for structuring publicly available information and do not violate the terms of use of third-party web platforms</li>
            </ul>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">
              7. Contact Information
            </h2>
            <p className="mb-4">For questions about this Privacy Policy or data management, please contact:</p>
            <p className="mb-2"><strong>RekrutAI</strong></p>
            <p className="mb-2">Email: <a href="mailto:info@rekru.ru" className="text-blue-600 underline">
              info@rekru.ru</a></p>
            <p className="mb-2">Website:
              <a href="https://rekrutai.ru/" className="text-blue-600 underline">https://rekrutai.ru/</a>
            </p>
            <p className="mb-6">Country: Russian Federation</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">
              8. Changes to This Privacy Policy
            </h2>
            <p className="mb-4">We may update this Privacy Policy to reflect changes in our practices or legal requirements. Updates will be posted on <a href="https://admin.rekrutai.ru//privacy/extension" className="text-blue-600 underline">https://admin.rekrutai.ru//privacy/extension</a>, and users will be notified via email or the REKRU system.</p>
          </section>

        </div>

      </main>
    </>
  );
}
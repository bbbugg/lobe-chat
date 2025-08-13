'use client';

import Head from 'next/head';
import React from 'react';

import { BRANDING_EMAIL } from '@/const/branding';

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>Terms of Service</title>
        {/* FIX: 对 meta 和 link 标签的属性按字母顺序排序 */}
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <link href="/favicon.ico" rel="icon" type="image/x-icon" />
        <link href="/apple-touch-icon.png" rel="apple-touch-icon" />
        <link
          crossOrigin="anonymous"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg=="
          referrerPolicy="no-referrer"
          rel="stylesheet"
        />
      </Head>

      <style global jsx>{`
        body {
          background-color: white;
          color: black;
        }
        a {
          color: #007bff;
        }
        button {
          border: 1px solid black;
          border-radius: 10px;
          color: black;
          cursor: pointer;
        }
        @media (prefers-color-scheme: dark) {
          body {
            background-color: #333;
            color: white;
          }
          button {
            background-color: #555;
            border-color: #eee;
            color: white;
          }
          a {
            color: #4dabf5;
          }
        }
      `}</style>

      <div style={{ padding: '1rem' }}>
        <button
          onClick={() => {
            window.location.href = '/';
          }}
          style={{ fontSize: '24px', padding: '0.5% 1%' }}
          type="button"
        >
          {/* FIX: 使用自闭合标签 */}
          <i className="fas fa-home" /> Back to Home Page
        </button>

        {/* FIX: 对 style 对象内的 key 按字母顺序排序 */}
        <div
          style={{ margin: '0 10%', marginBottom: '5em', marginTop: '5em', textAlign: 'justify' }}
        >
          <div style={{ marginBottom: '3em', textAlign: 'center' }}>
            <h1>Terms of Service</h1>
            <div>
              Last Updated at
              <time aria-label="modified-date" dateTime="2025-03-01T00:00:00.000Z">
                2025-03-01
              </time>
            </div>
          </div>

          <p>
            Welcome to Mithrandir! Please carefully read the following Terms of Use (hereinafter
            referred to as the &quot;Agreement&quot;). This Agreement constitutes a legally binding
            agreement between You and Mithrandir regarding the access and use of the Mithrandir
            website (collectively referred to as the &quot;Services&quot;).
          </p>
          <p>
            By accessing or using the Services in any way, You acknowledge that You have read,
            understood, and agreed to be bound by all the terms of this Agreement. If You do not
            agree to any part of this Agreement, You are not permitted to continue accessing or
            using the Services.
          </p>
          <h2>Definitions</h2>
          <p>
            The words of which the initial letter is capitalized have meanings defined under the
            following conditions. The following definitions shall have the same meaning regardless
            of whether they appear in singular or in plural.
          </p>
          <ul>
            <li>
              <strong>Agreement</strong> means this Terms of Use Agreement.
            </li>
            <li>
              <strong>Company</strong> (referred to as either &quot;the Company&quot;,
              &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to
              Mithrandir.
            </li>
            <li>
              <strong>Service</strong> means the Mithrandir website.
            </li>
            <li>
              <strong>You</strong> means the individual accessing or using the Services, or the
              company, or other legal entity on behalf of which such individual is accessing or
              using the Services, as applicable.
            </li>
          </ul>
          <h2>Our Services</h2>
          <p>
            Mithrandir provides a platform and interface that enables users to interact with
            artificial intelligence technologies, including but not limited to natural language
            processing models or content generation models developed independently or provided by
            third parties such as DeepSeek, Aliyun, and other commercial companies as well as
            open-source communities. The Service facilitates functions such as information
            retrieval, content creation, and automation through user interaction with AI systems.
            Additionally, it utilizes cloud technology to provide capabilities like data
            synchronization, vector data storage, server-side functionalities, etc., to enhance the
            interactive experience with AI models.
          </p>
          <h2>Eligibility</h2>
          <p>
            By accessing or using the Services, You represent and warrant to the Company that You:
            (1)Are of legal age (18 years and above). (2)Have legal capacity and agree to abide by
            these terms. (3)Will use the Services in accordance with this Agreement and all
            applicable laws. (4)Will not use the Services for any illegal, harmful, dangerous, or
            offensive purposes.
          </p>
          <p>Examples of prohibited activities include but are not limited to:</p>
          <ul>
            <li>Illegal activities</li>
            <li>Infringement of intellectual property rights</li>
            <li>Generating harmful, unsafe, deceptive, or illegal content</li>
            <li>Impersonation, fraud</li>
          </ul>
          <p>
            If You do not comply with the usage conditions, We reserve the right to suspend or
            terminate Your account and refuse any and all current or future use of the Services (or
            any part thereof).
          </p>
          <h2>Account Registration</h2>
          <p>
            To access the Services, You must register an account by providing true, accurate,
            up-to-date, and complete information. You are solely responsible for all activities that
            occur under Your account, including maintaining the security of Your account and
            restricting access. You must immediately notify Mithrandir of any unauthorized account
            use or other security breaches.
          </p>
          <p>
            Please ensure to keep Your password secure and take responsibility for all use of Your
            account and password. If We deem the chosen username inappropriate, containing obscene
            content, or otherwise offensive, We reserve the right to delete, revoke, or modify that
            username.
          </p>
          <h2>Content</h2>
          <p>
            Our Services allows You to generate and publish content. You are responsible for the
            legality, reliability, and appropriateness of the content generated using the AI
            ability. We do not assume responsibility for user-generated content on the Services. You
            explicitly understand and agree that You are solely responsible for the content You post
            and all activities conducted under Your account, whether by Yourself or by third parties
            using Your account.
          </p>
          <p>
            By generating and publishing content in the Services, You grant us the rights and
            licenses necessary to use, modify, publicly perform, publicly display, copy, and
            distribute such content within the Services. You retain full ownership of all content
            created, published, or displayed within the Services and are responsible for maintaining
            these rights. You agree that this license includes the permission for us to provide Your
            content to other Service users for their use under these terms. Additionally, You
            declare and warrant that: (1) the content is owned by You or You have the legal right to
            use and authorize it to us under this agreement. (2) posting the shared information in
            the Services will not infringe upon the privacy rights, image rights, copyrights,
            contractual relationships, or other individual rights of others.
          </p>
          <p>
            All content generated by You is by default stored on the server-side, We offer optional
            cloud sync content functionality. By using the Services, You agree that We may retain
            complete and accurate copies of any content in locations independent of the Services in
            our manner. However, We cannot guarantee that data will not be lost or damaged. Data or
            content loss or damage can occur due to various reasons, such as pre-existing damage
            before synchronization or changes during synchronization.
          </p>
          <p>
            We do not assume any responsibility for the security and integrity of content in the
            event of content damage or loss under any circumstances.
          </p>
          <h2>Intellectual Property Rights</h2>
          <p>
            Mithrandir reserves all rights to the technology, software, first-party content, and
            data within the Services, including but not limited to patents, trademarks, trade
            secrets, copyrights, and other intellectual property rights. Your permission to use the
            Services does not grant You any ownership or title. You are not permitted to copy,
            modify, adapt, translate, create derivative works, reverse engineer, disassemble, or
            decompile the Services or any part thereof.
          </p>
          <h2>Privacy and Security</h2>
          <p>
            Mithrandir employs industry-standard technical, managerial, and physical security
            measures to protect the security, confidentiality, and integrity of Your data. However,
            We cannot guarantee that unauthorized access, hacking attacks, data loss, or other
            breaches will never occur. Mithrandir is not liable for any damages or liabilities
            related to security incidents. Please refer to our Privacy Policy for more detailed
            information.
          </p>
          <h2>Termination of Services</h2>
          <p>
            You may close Your account and cease using the Services at any time. In the event of a
            violation of the terms of the agreement, Mithrandir may immediately suspend or terminate
            Your access to the Services. Upon termination, You will immediately lose the right to
            access or use the Services. Mithrandir will not be liable to You or any third party for
            the termination of the Services.
          </p>
          <h2>Disclaimer of Warranties</h2>
          <p>
            The Services provided by Mithrandir are provided on an &quot;as-is&quot; basis, and
            without any form of guarantee. We explicitly disclaim all warranties, whether express,
            implied, statutory, or otherwise, including but not limited to warranties of
            merchantability, fitness for a particular purpose, and non-infringement. Your use of the
            Services is at Your own risk.
          </p>
          <h2>Limitation of Liability</h2>
          <p>
            In no event shall Mithrandir, its Affiliates, directors, employees, or agents be liable
            for any direct, indirect, punitive, incidental, special, or consequential damages
            arising from or related to Your use or inability to use the Services. This limitation
            applies regardless of the basis or form of action.
          </p>
          <h2>Modification of Terms</h2>
          <p>
            We may revise this agreement periodically, and the new version of the agreement will
            replace the previous version. We will indicate the &quot;last updated&quot; date at the
            beginning and provide notice within the Services to inform You of significant changes.
            It is Your responsibility to regularly review these legal terms to stay informed of any
            updates. By continuing to use the Services after the revised legal terms are posted, You
            will be deemed to have understood and accepted any changes to the revised legal terms.
          </p>
          <h2>Governing Law and Jurisdiction</h2>
          <p>
            This Agreement shall be governed by and construed in accordance with the laws of the
            People&apos;s Republic of China (for the purposes of this Agreement, excluding Hong Kong
            Special Administrative Region, Macau Special Administrative Region, and Taiwan). The
            parties agree that any dispute arising out of or in connection with this Agreement or
            the Services shall be submitted to choose one court with competent jurisdiction for
            resolution through litigation. You may also be required to comply with the laws of your
            local jurisdiction, province, country, or international laws when using the Services.
          </p>
          <h2>Conclusion</h2>
          <p>
            This agreement represents the entire agreement between You and Mithrandir regarding the
            use of the Services. It supersedes any prior agreements or understandings. The failure
            of Mithrandir to enforce any provision of this agreement does not constitute a waiver of
            its rights.
          </p>

          <p>
            By accessing or using the Mithrandir Services, You acknowledge that You have read,
            understood, and agreed to be bound by this agreement. If You have any questions
            regarding this agreement, please contact us at{' '}
            <a href={`mailto:${BRANDING_EMAIL.support}`}>{BRANDING_EMAIL.support}</a>.
          </p>
        </div>

        <button
          onClick={() => {
            window.scrollTo({ behavior: 'smooth', top: 0 });
          }}
          style={{
            bottom: '2%',
            fontSize: '24px',
            padding: '0.5% 1%',
            position: 'fixed',
            right: '1%',
          }}
          type="button"
        >
          {/* FIX: 使用自闭合标签 */}
          <i className="fas fa-arrow-up" /> Top
        </button>
      </div>
    </>
  );
}

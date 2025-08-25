'use client';

import {Button} from '@lobehub/ui';
// 尝试使用项目内置的UI组件
import {ArrowUp, Home} from 'lucide-react';
// 使用更现代的图标库
import {useRouter} from 'next/navigation';
// 引入 useRef 钩子，用于获取DOM元素的引用
import React, {useRef} from 'react';
import {Flexbox} from 'react-layout-kit';

import {BRANDING_EMAIL, BRANDING_NAME} from '@/const/branding';

// 使用项目常用的布局组件

export default function PrivacyContent() {
  const router = useRouter();
  // 1. 创建一个 ref 来引用可滚动的容器，以实现 "Top" 按钮功能
  const scrollableContainerRef = useRef<HTMLDivElement>(null);

  return (
    // 使用Flexbox进行布局，并设置其可滚动
    <Flexbox
      gap={16}
      ref={scrollableContainerRef}
      style={{
        boxSizing: 'border-box',
        height: '100%',
        overflowY: 'auto',
        padding: '16px 0',
      }}
    >
      {/* 2. 创建一个容器来模拟HTML中的 `margin: 0 10%` 效果，并居中内容 */}
      <div style={{margin: '0 auto', width: '80%'}}>
        {/* 将 "Back to Home Page" 按钮放置于内容区的左上角 */}
        <Button
          icon={<Home/>}
          onClick={() => router.push('/')}
          style={{
            fontSize: '16px',
            marginBottom: '2em',
          }}
        >
          Back to Home Page
        </Button>

        {/* 3. 为文本内容创建一个容器，并设置字体和对齐方式 */}
        <div style={{fontSize: '16px', textAlign: 'justify'}}>
          <div style={{marginBottom: '3em', textAlign: 'center'}}>
            <h1>Privacy Policy</h1>
            <div>
              Last Updated at&nbsp;
              <time aria-label="modified-date" dateTime="2025-03-01T00:00:00.000Z">
                2025-03-01
              </time>
            </div>
          </div>

          <p>
            Welcome to {BRANDING_NAME}! We are committed to protecting your personal information and
            your right to privacy. This Privacy Policy describes Our policies and procedures on the
            collection, use and disclosure of Your information when You use the Service and tells You
            about Your privacy rights and how the law protects You. By using our Service, you agree
            to the collection and use of information in accordance with this policy.
          </p>
          <h2>Definitions</h2>
          <p>
            The words of which the initial letter is capitalized have meanings defined under the
            following conditions. The following definitions shall have the same meaning regardless of
            whether they appear in singular or in plural.
          </p>
          <ul>
            <li>
              <strong>Company</strong> (referred to as either &quot;the Company&quot;,
              &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to {BRANDING_NAME}.
            </li>
            <li>
              <strong>Cookies</strong> are small files that are placed on Your computer, mobile
              device or any other device by a website, containing the details of Your browsing
              history on that website among its many uses.
            </li>
            <li>
              <strong>Service</strong> refers to {BRANDING_NAME}, an open-source product.
            </li>
            <li>
              <strong>Service Provider</strong> means any natural or legal person who processes the
              data on behalf of the Company. It refers to third-party companies or individuals
              employed by the Company to facilitate the Service, to provide the Service on behalf of
              the Company, to perform services related to the Service or to assist the Company in
              analyzing how the Service is used.
            </li>
            <li>
              <strong>You</strong> means the individual accessing or using the Service, or the
              company, or other legal entity on behalf of which such individual is accessing or using
              the Service, as applicable.
            </li>
          </ul>
          <h2>Collecting of Your Personal Data</h2>
          <h3>Personal Data</h3>
          <p>
            While using Our Service, We may ask You to provide Us with certain personally
            identifiable information that can be used to contact or identify You. Personally
            identifiable information may include, but is not limited to:
          </p>
          <ul>
            <li>
              <strong>Email address</strong>
            </li>
            <li>
              <strong>Name or nickname</strong>
            </li>
            <li>
              <strong>Your location or address</strong>
            </li>
            <li>
              <strong>Other personal profile information voluntarily provided by You</strong>
            </li>
          </ul>
          <h3>Usage Data</h3>
          <p>Usage Data is collected automatically when using the Service.</p>
          <ul>
            <li>
              <strong>Chat Logs:</strong> {BRANDING_NAME} chat data is stored on the server-side by
              default. By cloud synchronization, all commands and chat logs from your interactions
              with the AI agents will automatically sync to cloud servers and be recorded.
            </li>
            <li>
              <strong>Settings Data:</strong> All personalized settings You use for {BRANDING_NAME},
              including but not limited to your account settings, language preferences, theme
              settings, and other customization options.
            </li>
            <li>
              <strong>Behavioral Data:</strong> This encompasses your UI interaction behaviors while
              using our product service, including page navigation, button clicks, mouse scrolling,
              and other user behavioral data.
            </li>
            <li>
              <strong>Device Information.</strong> Such as your device&apos;s Internet Protocol
              address (e.g. IP address), browser type, browser version, the pages of our Service that
              You visit, the time and date of Your visit, the time spent on those pages, unique
              device identifiers and other diagnostic data.
            </li>
            <li>
              <strong>Mobile Device Information.</strong> When You access the Service by or through a
              mobile device, We may collect certain information automatically, including, but not
              limited to, the type of mobile device You use, Your mobile device unique ID, the IP
              address of Your mobile device, Your mobile operating system, the type of mobile
              Internet browser You use, unique device identifiers and other diagnostic data.
            </li>
          </ul>
          <h3>Tracking Technologies and Cookies</h3>
          <p>
            We use Cookies and similar tracking technologies to track the activity on Our Service and
            store certain information. Tracking technologies used are beacons, tags, and scripts to
            collect and track information and to improve and analyze Our Service. The technologies We
            use may include:
          </p>
          <ul>
            <li>
              <strong>Cookies or Browser Cookies.</strong> A cookie is a small file placed on Your
              Device. You can instruct Your browser to refuse all Cookies or to indicate when a
              Cookie is being sent. However, if You do not accept Cookies, You may not be able to use
              some parts of our Service. Unless you have adjusted Your browser setting so that it will
              refuse Cookies, our Service may use Cookies.
            </li>
            <li>
              <strong>Web Beacons.</strong> Certain sections of our Service and our emails may contain
              small electronic files known as web beacons (also referred to as clear gifs, pixel
              tags, and single-pixel gifs) that permit the Company, for example, to count users who
              have visited those pages or opened an email and for other related website statistics
              (e.g., recording the popularity of a certain section and verifying system and server
              integrity).
            </li>
          </ul>
          <p>
            Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies. Persistent Cookies
            remain on Your personal computer or mobile device when You go offline, while Session
            Cookies are deleted as soon as You close Your web browser.
          </p>
          <p>We use both Session and Persistent Cookies for the purposes set out below:</p>
          <ul>
            <li>
              <strong>Necessary / Essential Cookies</strong>
            </li>
          </ul>
          <p>Type: Session Cookies</p>
          <p>Administered by: Us</p>
          <p>
            Purpose: These Cookies are essential to provide You with services available through the
            Website and to enable You to use some of its features. They help to authenticate users
            and prevent fraudulent use of user accounts. Without these Cookies, the services that You
            have asked for cannot be provided, and We only use these Cookies to provide You with those
            services.
          </p>
          <ul>
            <li>
              <strong>Cookies Policy / Notice Acceptance Cookies</strong>
            </li>
          </ul>
          <p>Type: Persistent Cookies</p>
          <p>Administered by: Us</p>
          <p>Purpose: These Cookies identify if users have accepted the use of cookies on the Website.</p>
          <ul>
            <li>
              <strong>Functionality Cookies</strong>
            </li>
          </ul>
          <p>Type: Persistent Cookies</p>
          <p>Administered by: Us</p>
          <p>
            Purpose: These Cookies allow us to remember choices You make when You use the Website,
            such as remembering your login details or language preference. The purpose of these
            Cookies is to provide You with a more personal experience and to avoid You having to
            re-enter your preferences every time You use the Website.
          </p>
          <h2>Use of Your Personal Data</h2>
          <p>We may use your Personal Data for the following purposes:</p>
          <ul>
            <li>
              <strong>To provide and maintain our Service</strong>, including to monitor the usage of
              our Service.
            </li>
            <li>
              <strong>To manage Your Account:</strong> to manage Your registration as a user of the
              Service. The Personal Data You provide can give You access to different functionalities
              of the Service that are available to You as a registered user.
            </li>
            <li>
              <strong>To contact You:</strong> To contact You by email or other equivalent forms of
              electronic communication, such as a mobile application&apos;s push notifications
              regarding updates or informative communications related to the functionalities, products
              or contracted services, including the security updates, when necessary or reasonable for
              their implementation.
            </li>
            <li>
              <strong>To manage Your requests:</strong> To attend and manage Your requests to Us.
            </li>
            <li>
              <strong>For product enhancement:</strong> We collect and analyze your usage data to
              improve user experience, such as optimizing UI interaction and training more advanced
              AI models.
            </li>
            <li>
              <strong>For other purposes</strong>: We may use Your information for other purposes,
              such as data analysis, identifying usage trends, determining the effectiveness of our
              promotional campaigns and to evaluate and improve our Service, products, services,
              marketing and your experience.
            </li>
          </ul>
          <p>We may share Your personal information in the following situations:</p>
          <ul>
            <li>
              <strong>With Service Providers:</strong> We may share Your personal information with out
              AI model Providers and Data Service Providers for the purpose of data analysis and model
              training.
            </li>
            <li>
              <strong>For business transfers:</strong> We may share or transfer Your personal
              information in connection with, or during negotiations of, any merger, sale of Company
              assets, financing, or acquisition of all or a portion of Our business to another
              company.
            </li>
            <li>
              <strong>With Affiliates:</strong> We may share Your information with Our affiliates, in
              which case we will require those affiliates to honor this Privacy Policy. Affiliates
              include Our parent company and any other subsidiaries, joint venture partners or other
              companies that We control or that are under common control with Us.
            </li>
            <li>
              <strong>With business partners:</strong> We may share Your information with Our business
              partners to offer You certain products, services or promotions.
            </li>
            <li>
              <strong>With other users:</strong> when You share personal information or otherwise
              interact in the public areas with other users, such information may be viewed by all
              users and may be publicly distributed outside.
            </li>
            <li>
              <strong>With Your consent</strong>: We may disclose Your personal information for any
              other purpose with Your consent.
            </li>
          </ul>
          <h2>Retention of Your Personal Data</h2>
          <p>
            We will retain Your Personal Data only for as long as is necessary for the purposes set
            out in this Privacy Policy. We will retain and use Your Personal Data to the extent
            necessary to comply with our legal obligations (for example, if we are required to retain
            your data to comply with applicable laws), resolve disputes, and enforce our legal
            agreements and policies.
          </p>
          <p>
            We will also retain Usage Data for internal analysis purposes. Usage Data is generally
            retained for a shorter period of time, except when this data is used to strengthen the
            security or to improve the functionality of Our Service, or We are legally obligated to
            retain this data for longer time periods.
          </p>
          <h2>Transfer of Your Personal Data</h2>
          <p>
            Your information, including Personal Data, is processed at the Company&apos;s operating
            offices and in any other places where the parties involved in the processing are located.
            It means that this information may be transferred to computers located outside of Your
            state, province, country or other governmental jurisdiction where the data protection laws
            may differ than those from Your jurisdiction.
          </p>
          <p>
            Your consent to this Privacy Policy followed by Your submission of such information
            represents Your agreement to that transfer.
          </p>
          <p>
            The Company will take all steps reasonably necessary to ensure that Your data is treated
            securely and in accordance with this Privacy Policy and no transfer of Your Personal Data
            will take place to an organization or a country unless there are adequate controls in
            place including the security of Your data and other personal information.
          </p>
          <h2>Delete Your Personal Data</h2>
          <p>
            You have the right to delete or request that We assist in deleting the Personal Data that
            We have collected about You.
          </p>
          <p>
            Our Service may give You the ability to delete certain information about You from within
            the Service.
          </p>
          <p>
            You may update, amend, or delete Your information at any time by signing in to Your
            Account, if you have one, and visiting the account settings section that allows you to
            manage Your personal information. You may also contact Us to request access to, correct,
            or delete any personal information that You have provided to Us.
          </p>
          <p>
            Please note, however, that We may need to retain certain information when we have a legal
            obligation or lawful basis to do so.
          </p>
          <h2>Disclosure of Your Personal Data</h2>
          <h3>Law enforcement</h3>
          <p>
            Under certain circumstances, the Company may be required to disclose Your Personal Data if
            required to do so by law or in response to valid requests by public authorities (e.g. a
            court or a government agency).
          </p>
          <h3>Other legal requirements</h3>
          <p>
            The Company may disclose Your Personal Data in the good faith belief that such action is
            necessary to:
          </p>
          <ul>
            <li>Comply with a legal obligation</li>
            <li>Protect and defend the rights or property of the Company</li>
            <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
            <li>Protect the personal safety of Users of the Service or the public</li>
            <li>Protect against legal liability</li>
          </ul>
          <h2>Security of Your Personal Data</h2>
          <p>
            The security of Your Personal Data is important to Us, but remember that no method of
            transmission over the Internet, or method of electronic storage is 100% secure. While We
            strive to use commercially acceptable means to protect Your Personal Data, We cannot
            guarantee its absolute security.
          </p>
          <h2>Children&apos;s Privacy</h2>
          <p>
            Our Service does not address anyone under the age of 18. We do not knowingly collect
            personally identifiable information from anyone under the age of 18. If You are a parent
            or guardian and You are aware that Your child has provided Us with Personal Data, please
            contact Us. If We become aware that We have collected Personal Data from anyone under the
            age of 18 without verification of parental consent, We take steps to remove that
            information from Our servers.
          </p>
          <p>
            If We need to rely on consent as a legal basis for processing Your information and Your
            country requires consent from a parent, We may require Your parent&apos;s consent before
            We collect and use that information.
          </p>
          <h2>Links to Other Websites</h2>
          <p>
            Our Service may contain links to other websites that are not operated by Us. If You click
            on a third party link, You will be directed to that third party&apos;s site. We strongly
            advise You to review the Privacy Policy of every site You visit.
          </p>
          <p>
            We have no control over and assume no responsibility for the content, privacy policies or
            practices of any third party sites or services.
          </p>
          <h2>Changes to this Privacy Policy</h2>
          <p>
            We may update Our Privacy Policy from time to time. We will notify You of any changes by
            posting the new Privacy Policy on this page.
          </p>
          <p>
            We will let You know via email and/or a prominent notice on Our Service, prior to the
            change becoming effective and update the &quot;Last updated&quot; date at the top of this
            Privacy Policy.
          </p>
          <p>
            You are advised to review this Privacy Policy periodically for any changes. Changes to
            this Privacy Policy are effective when they are posted on this page.
          </p>
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, You can contact us at{' '}
            <a href={`mailto:${BRANDING_EMAIL.support}`}>{BRANDING_EMAIL.support}</a>.
          </p>
        </div>
      </div>

      {/* “回到顶部”按钮 */}
      <Button
        icon={<ArrowUp/>}
        onClick={() => {
          // 4. 使用 ref 来操作滚动
          // .current 属性指向真实的DOM元素
          if (scrollableContainerRef.current) {
            scrollableContainerRef.current.scrollTo({behavior: 'smooth', top: 0});
          }
        }}
        style={{bottom: '2%', fontSize: '16px', position: 'fixed', right: '1%'}}
      >
        Top
      </Button>
    </Flexbox>
  );
}

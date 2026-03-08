'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useLanguage } from '@/hooks/useLanguage'

export default function PrivacyPage() {
  const { locale } = useLanguage()

  return (
    <>
      <Header />
      <main className="pt-24 section-padding">
        <div className="container-luxury max-w-3xl">
          <h1 className="font-serif text-display-md text-charcoal mb-10">
            {locale === 'he' ? 'מדיניות פרטיות' : 'Privacy Policy'}
          </h1>
          <div className="prose prose-lg text-textSecondary space-y-5">
            {locale === 'he' ? (
              <>
                <p>ג'ולי קארן בריידל מכבדת את פרטיותך. המידע שתמסרי בטופס הפנייה ישמש אך ורק ליצירת קשר לצורך תיאום פגישה.</p>
                <p>אנו לא מוכרים, משכירים או מעבירים את פרטיך לצדדים שלישיים.</p>
                <p>לשאלות: julie@juliekarn.com</p>
              </>
            ) : (
              <>
                <p>Julie Karn Bridal respects your privacy. Information submitted through our inquiry form is used solely to contact you and schedule an appointment.</p>
                <p>We do not sell, rent or share your personal data with third parties.</p>
                <p>For questions: julie@juliekarn.com</p>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

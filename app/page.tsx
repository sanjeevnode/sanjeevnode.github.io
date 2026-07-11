import Contact from '@/components/Contact'
import Education from '@/components/Education'
import Experience from '@/components/Experience'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import SectionSkeleton from '@/components/SectionSkeleton'
import Preloader from '@/components/fx/Preloader'
import SmoothScroll from '@/components/fx/SmoothScroll'
import { Suspense } from 'react'

import { Toaster } from 'react-hot-toast'

// Fully static + CDN-served; admin mutations revalidate on demand via revalidatePath('/')
export const revalidate = 86400

export default function Home() {
  return (
    <div className="min-h-screen bg-pf-bg font-sans">
      <Toaster
        position='bottom-right'
      />
      <Preloader />
      <SmoothScroll />
      <Header />
      <main>
        <Hero />
        <Suspense fallback={<SectionSkeleton title="Work Experience" />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionSkeleton title="Projects" />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionSkeleton title="Education" />}>
          <Education />
        </Suspense>
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

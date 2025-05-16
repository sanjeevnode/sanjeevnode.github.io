import Contact from '@/components/Contact'
import Education from '@/components/Education'
import Experience from '@/components/Experience'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'

import { Toaster } from 'react-hot-toast'

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 font-sans">
      <Toaster
        position='bottom-right'
      />
      <Header />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

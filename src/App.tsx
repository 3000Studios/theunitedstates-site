import { Suspense, lazy, type ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AnimatePresence, motion } from 'framer-motion'
import { ArticleProvider } from '@/context/ArticleContext'
import { MainLayout } from '@/components/layout/MainLayout'

const HomePage = lazy(async () => ({ default: (await import('@/pages/HomePage')).HomePage }))
const StatesPage = lazy(async () => ({ default: (await import('@/pages/StatesPage')).StatesPage }))
const StatePage = lazy(async () => ({ default: (await import('@/pages/StatePage')).StatePage }))
const UpdatesPage = lazy(async () => ({ default: (await import('@/pages/UpdatesPage')).UpdatesPage }))
const KidsPage = lazy(async () => ({ default: (await import('@/pages/KidsPage')).KidsPage }))
const GamePage = lazy(async () => ({ default: (await import('@/pages/GamePage')).GamePage }))
const ConstitutionPage = lazy(async () => ({ default: (await import('@/pages/ConstitutionPage')).ConstitutionPage }))
const GuidesPage = lazy(async () => ({ default: (await import('@/pages/GuidesPage')).GuidesPage }))
const AboutPage = lazy(async () => ({ default: (await import('@/pages/AboutPage')).AboutPage }))
const ContactPage = lazy(async () => ({ default: (await import('@/pages/ContactPage')).ContactPage }))
const PrivacyPage = lazy(async () => ({ default: (await import('@/pages/PrivacyPage')).PrivacyPage }))
const TermsPage = lazy(async () => ({ default: (await import('@/pages/TermsPage')).TermsPage }))
const DisclaimerPage = lazy(async () => ({ default: (await import('@/pages/DisclaimerPage')).DisclaimerPage }))
const SearchPage = lazy(async () => ({ default: (await import('@/pages/SearchPage')).SearchPage }))
const StoryPage = lazy(async () => ({ default: (await import('@/pages/StoryPage')).StoryPage }))
const NotFoundPage = lazy(async () => ({ default: (await import('@/pages/NotFoundPage')).NotFoundPage }))
const ExplorePage = lazy(async () => ({ default: (await import('@/pages/ExplorePage')).ExplorePage }))
const ItineraryPage = lazy(async () => ({ default: (await import('@/pages/ItineraryPage')).ItineraryPage }))
const PassportPage = lazy(async () => ({ default: (await import('@/pages/PassportPage')).PassportPage }))
const MarketPage = lazy(async () => ({ default: (await import('@/pages/MarketPage')).MarketPage }))

function PageFade({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.22 }}
    >
      {children}
    </motion.div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageFade>
              <HomePage />
            </PageFade>
          }
        />
        <Route
          path="/states"
          element={
            <PageFade>
              <StatesPage />
            </PageFade>
          }
        />
        <Route
          path="/states/:slug"
          element={
            <PageFade>
              <StatePage />
            </PageFade>
          }
        />
        <Route
          path="/updates"
          element={
            <PageFade>
              <UpdatesPage />
            </PageFade>
          }
        />
        <Route
          path="/kids"
          element={
            <PageFade>
              <KidsPage />
            </PageFade>
          }
        />
        <Route
          path="/kids/games/:id"
          element={
            <PageFade>
              <GamePage />
            </PageFade>
          }
        />
        <Route
          path="/constitution"
          element={
            <PageFade>
              <ConstitutionPage />
            </PageFade>
          }
        />
        <Route
          path="/guides"
          element={
            <PageFade>
              <GuidesPage />
            </PageFade>
          }
        />
        <Route
          path="/about"
          element={
            <PageFade>
              <AboutPage />
            </PageFade>
          }
        />
        <Route
          path="/contact"
          element={
            <PageFade>
              <ContactPage />
            </PageFade>
          }
        />
        <Route
          path="/privacy"
          element={
            <PageFade>
              <PrivacyPage />
            </PageFade>
          }
        />
        <Route
          path="/terms"
          element={
            <PageFade>
              <TermsPage />
            </PageFade>
          }
        />
        <Route
          path="/disclaimer"
          element={
            <PageFade>
              <DisclaimerPage />
            </PageFade>
          }
        />
        <Route
          path="/search"
          element={
            <PageFade>
              <SearchPage />
            </PageFade>
          }
        />
        <Route
          path="/story/:slug"
          element={
            <PageFade>
              <StoryPage />
            </PageFade>
          }
        />
        <Route
          path="/explore"
          element={
            <PageFade>
              <ExplorePage />
            </PageFade>
          }
        />
        <Route
          path="/itinerary"
          element={
            <PageFade>
              <ItineraryPage />
            </PageFade>
          }
        />
        <Route
          path="/passport"
          element={
            <PageFade>
              <PassportPage />
            </PageFade>
          }
        />
        <Route
          path="/market"
          element={
            <PageFade>
              <MarketPage />
            </PageFade>
          }
        />

        {/* Back-compat redirects */}
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/blog" element={<Navigate to="/updates" replace />} />
        <Route path="/news" element={<Navigate to="/updates" replace />} />
        <Route path="/trending" element={<Navigate to="/updates" replace />} />
        <Route path="/money" element={<Navigate to="/guides" replace />} />
        <Route path="/tech" element={<Navigate to="/guides" replace />} />
        <Route path="/store" element={<Navigate to="/about" replace />} />
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/register" element={<Navigate to="/" replace />} />
        <Route path="/profile" element={<Navigate to="/" replace />} />
        <Route
          path="/article/:slug"
          element={
            <PageFade>
              <StoryPage />
            </PageFade>
          }
        />

        <Route
          path="*"
          element={
            <PageFade>
              <NotFoundPage />
            </PageFade>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ArticleProvider>
          <MainLayout>
            <Suspense
              fallback={
                <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-sm text-slate-300">
                  Loading…
                </div>
              }
            >
              <AnimatedRoutes />
            </Suspense>
          </MainLayout>
        </ArticleProvider>
      </BrowserRouter>
    </HelmetProvider>
  )
}

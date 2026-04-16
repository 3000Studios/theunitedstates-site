import { Suspense, lazy, type ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AnimatePresence, motion } from 'framer-motion'
import { ArticleProvider } from '@/context/ArticleContext'
import { MainLayout } from '@/components/layout/MainLayout'

const HomePage = lazy(async () => ({ default: (await import('@/pages/HomePage')).HomePage }))
const NewsPage = lazy(async () => ({ default: (await import('@/pages/NewsPage')).NewsPage }))
const TrendingPage = lazy(async () => ({ default: (await import('@/pages/TrendingPage')).TrendingPage }))
const StatesPage = lazy(async () => ({ default: (await import('@/pages/StatesPage')).StatesPage }))
const MoneyPage = lazy(async () => ({ default: (await import('@/pages/MoneyPage')).MoneyPage }))
const TechPage = lazy(async () => ({ default: (await import('@/pages/TechPage')).TechPage }))
const GuidesPage = lazy(async () => ({ default: (await import('@/pages/GuidesPage')).GuidesPage }))
const BlogPage = lazy(async () => ({ default: (await import('@/pages/BlogPage')).BlogPage }))
const StorePage = lazy(async () => ({ default: (await import('@/pages/StorePage')).StorePage }))
const AboutPage = lazy(async () => ({ default: (await import('@/pages/AboutPage')).AboutPage }))
const ContactPage = lazy(async () => ({ default: (await import('@/pages/ContactPage')).ContactPage }))
const PrivacyPage = lazy(async () => ({ default: (await import('@/pages/PrivacyPage')).PrivacyPage }))
const TermsPage = lazy(async () => ({ default: (await import('@/pages/TermsPage')).TermsPage }))
const DisclaimerPage = lazy(async () => ({ default: (await import('@/pages/DisclaimerPage')).DisclaimerPage }))
const SearchPage = lazy(async () => ({ default: (await import('@/pages/SearchPage')).SearchPage }))
const ArticlePage = lazy(async () => ({ default: (await import('@/pages/ArticlePage')).ArticlePage }))
const NotFoundPage = lazy(async () => ({ default: (await import('@/pages/NotFoundPage')).NotFoundPage }))
const LoginPage = lazy(async () => ({ default: (await import('@/pages/LoginPage')).LoginPage }))
const RegisterPage = lazy(async () => ({ default: (await import('@/pages/RegisterPage')).RegisterPage }))
const ProfilePage = lazy(async () => ({ default: (await import('@/pages/ProfilePage')).ProfilePage }))

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
          path="/news"
          element={
            <PageFade>
              <NewsPage />
            </PageFade>
          }
        />
        <Route
          path="/trending"
          element={
            <PageFade>
              <TrendingPage />
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
          path="/money"
          element={
            <PageFade>
              <MoneyPage />
            </PageFade>
          }
        />
        <Route
          path="/tech"
          element={
            <PageFade>
              <TechPage />
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
          path="/blog"
          element={
            <PageFade>
              <BlogPage />
            </PageFade>
          }
        />
        <Route
          path="/store"
          element={
            <PageFade>
              <StorePage />
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
          path="/article/:slug"
          element={
            <PageFade>
              <ArticlePage />
            </PageFade>
          }
        />
        <Route
          path="/login"
          element={
            <PageFade>
              <LoginPage />
            </PageFade>
          }
        />
        <Route
          path="/register"
          element={
            <PageFade>
              <RegisterPage />
            </PageFade>
          }
        />
        <Route
          path="/profile"
          element={
            <PageFade>
              <ProfilePage />
            </PageFade>
          }
        />
        <Route path="/home" element={<Navigate to="/" replace />} />
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

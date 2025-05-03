import { BrowserRouter as Router } from "react-router-dom"
import Header from "./widgets/ui/Header.tsx"
import Footer from "./widgets/ui/Footer.tsx"
import PostsManagerPage from "./pages/PostsManagerPage.tsx"
import { AppQueryClientProvider } from "./app/model/providers/QueryClientProvider"
import { OverlayProvider } from "./shared/lib/overlay/OverlayProvider.tsx"

const App = () => {
  return (
    <AppQueryClientProvider>
      <Router basename={import.meta.env.VITE_BASE_PATH}>
        <OverlayProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              <PostsManagerPage />
            </main>
            <Footer />
          </div>
        </OverlayProvider>
      </Router>
    </AppQueryClientProvider>
  )
}

export default App

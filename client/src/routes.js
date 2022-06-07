import { Routes, Route, Navigate } from 'react-router-dom'
import AuthPage from './pages/AuthPage/AuthPage'
import CreatePage from './pages/CreatePage'
import DetailPage from './pages/DetailPage'
import LinksPage from './pages/LinksPage'
export const useRoutes = (isAuth) => {
  if (isAuth) {
    return (
      <Routes>
        <Route path="/links" exact element={<LinksPage />} />
        <Route path="/create" exact element={<CreatePage />} />
        <Route path="/detail/:id" exact element={<DetailPage />} />
        <Route path="*" element={<Navigate to="/create" replace />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/" exact element={<AuthPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { RoleProvider } from './context/role-context'
import DashboardLayout from './layouts/DashboardLayout'
import Dashboard from './pages/Dashboard'

const Transactions = React.lazy(() => import('./pages/Transactions'))
const FinancialInsights = React.lazy(() => import('./pages/FinancialInsights'))

const App = () => {
  return (
      <RoleProvider>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/financialInsights" element={<FinancialInsights />} />
          </Route>
        </Routes>
      </RoleProvider>
  )
}

export default App

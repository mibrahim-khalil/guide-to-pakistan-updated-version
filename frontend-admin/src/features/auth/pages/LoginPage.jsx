import LoginForm from '../components/LoginForm'

export default function LoginPage() {
  return (
    <div className="w-full max-w-md admin-card p-8">
      <div className="mb-6 text-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold text-lg mb-3">
          GTP
        </div>
        <h1 className="text-2xl font-semibold text-gray-900">Admin Panel</h1>
        <p className="text-sm text-gray-500 mt-1">Guide to Pakistan — management console</p>
      </div>
      <LoginForm />
    </div>
  )
}

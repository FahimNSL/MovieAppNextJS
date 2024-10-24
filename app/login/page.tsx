import { LoginForm } from '@/components/LoginForm';
import { getUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { from?: string };
}) {
  const user = await getUser();
  if (user) {
    redirect(searchParams.from || '/');
  }

  return (
    <main className="container mx-auto flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-sm text-muted-foreground">
            Sign in to access your watchlist
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
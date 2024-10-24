'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Film, Heart } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { UserMenu } from '@/components/UserMenu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { User } from '@/lib/auth';

export function Navbar({ user }: { user: User | null }) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Film className="h-5 w-5" />
          <span>MovieDB</span>
        </Link>
        <nav className="flex flex-1 items-center justify-end space-x-2">
          {user ? (
            <>
              <Link
                href="/watchlist"
                className={cn(
                  'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent',
                  pathname === '/watchlist' && 'bg-accent'
                )}
              >
                <Heart className="h-4 w-4" />
                <span>Watchlist</span>
              </Link>
              <UserMenu user={user} />
            </>
          ) : (
            <Button asChild variant="ghost" size="sm">
              <Link href="/login">Sign In</Link>
            </Button>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
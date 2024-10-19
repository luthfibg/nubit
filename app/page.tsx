import NubitLogo from './ui/nubit-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-magnetic-500 p-4 md:h-52">
        <NubitLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-magnetic-100 px-6 py-10 md:w-2/5 md:px-20">
        <div
          className={styles.shape}        />
          <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal ${lusitana.className} antialiased`}>
            <strong>Welcome to Nubit.</strong> An Integrated Internal {' '}
            <a href="https://nextjs.org/learn/" className="text-magnetic-500">
              Marketing Management
            </a>
            , present for the new chapter of your business.
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-magnetic-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Get Started</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Add Hero Images Here */}
          <Image
            src={'/hero-desktop.png'}
            width={1000}
            height={760}
            className='hidden md:block'
            alt={'Screenshot of the dashboard project showing the desktop version'}
          />

          <Image
            src={'/hero-mobile.png'}
            width={560}
            height={760}
            className='block md:hidden'
            alt={'Screenshot of the dashboard project showing the mobile version'}
          />
        </div>
      </div>
    </main>
  );
}

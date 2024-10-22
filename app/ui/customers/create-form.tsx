'use client';

import Link from 'next/link';
import {
  UserCircleIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createContact, StateContact } from '@/app/lib/actions';
import { useActionState } from 'react';
import { useState } from 'react'; // Import useState for managing phone input state
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Import styles for react-phone-input-2
import "flag-icons/css/flag-icons.min.css"; // Import flag icon styles

export default function Form() {
  const initialState: StateContact = { message: null, errors: {} };
  const [state, formAction] = useActionState(createContact, initialState);
  const [phone, setPhone] = useState(''); // State to manage phone number

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Type customer name
          </label>
          <div className="relative">
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Type customer name"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="name-error"
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Customer Institution */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Type customer institution
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="institution"
                name="institution"
                type="text"
                placeholder="Type institution"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="institution-error"
              />
              <BuildingOfficeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="institution-error" aria-live="polite" aria-atomic="true">
            {state.errors?.institution &&
              state.errors.institution.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Customer Email */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Type customer email
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Type email"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="email-error"
              />
              <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="email-error" aria-live="polite" aria-atomic="true">
            {state.errors?.email &&
              state.errors.email.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Customer Phone */}
        <div className="mb-4">
          <label htmlFor="phone" className="mb-2 block text-sm font-medium">
            Type customer phone number
          </label>
          <div className="relative mt-2 rounded-md">
            <PhoneInput
              country={'us'} // You can change the default country code here
              value={phone}
              onChange={(phone) => setPhone(phone)}
              inputProps={{
                name: 'phone',
                required: true,
                autoFocus: true,
              }}
              containerClass="block w-full"
              inputClass="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <DevicePhoneMobileIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          <div id="phone-error" aria-live="polite" aria-atomic="true">
            {state.errors?.phone &&
              state.errors.phone.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/invoices"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit">Add Customer</Button>
        </div>
      </div>
    </form>
  );
}

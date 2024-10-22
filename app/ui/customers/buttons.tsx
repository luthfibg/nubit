import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
// import { deleteCustomer } from '@/app/lib/actions';

export function CreateContact() {
  return (
    <Link
      href="/dashboard/customers/new"
      className="flex h-10 items-center rounded-lg bg-magnetic-500 px-4 text-sm font-medium text-white transition-colors hover:bg-magnetic-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Add Customer</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

// export function UpdateCustomer({ id }: { id: string }) {
//   return (
//     <Link
//       href={`/dashboard/customer/${id}/edit`}
//       className="rounded-md border p-2 hover:bg-gray-100"
//     >
//       <PencilIcon className="w-5" />
//     </Link>
//   );
// }

// export function DeleteCustomer({ id }: { id: string }) {
//   const deleteCustomerWIthId = deleteCustomer.bind(null, id);

//   return (
//     <form action={deleteCustomerWIthId}>
//       <button className="rounded-md border p-2 hover:bg-gray-100">
//         <span className="sr-only">Delete</span>
//         <TrashIcon className="w-5" />
//       </button>
//     </form>
//   );
// }

import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
 
export default async function Page() {
  const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Customers', href: '/dashboard/contact' },
          {
            label: 'Create Contact',
            href: '/dashboard/contact/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}
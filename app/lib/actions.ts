'use server';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
      invalid_type_error: 'Please select a customer.',
    }),
    amount: z.coerce
      .number()
      .gt(0, { message: 'Amount must be greater than $0.' }),
    status: z.enum(['pending', 'paid'], {
      invalid_type_error: 'Please select an invoice status.',
    }),
    date: z.string(),
});

const CreateInvoice = FormSchema.omit({'id': true, date: true});
export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
}
export async function createInvoice(prevState: State, formData: FormData) {
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Invoice.',
      };
    }
    // Prepare data for insertion into the database
    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    try {
      await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
      `;
    } catch (error) {
      return {
        message: `Database Error: Failed to Create Invoice. ${error}`,
      }
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });
 
// ...
 
export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return {
      message: `Database Error: Failed to Update Invoice. ${error}`,
    }
  }
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

// To Delete Invoice
export async function deleteInvoice(id: string) {
  // throw new Error('Not Implemented');
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Invoice Deleted.' }
  } catch (error) {
    return {
      message: `Database Error: Failed to Delete Invoice. ${error}`,
    }
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

const FormSchemaCustomer = z.object({
  id: z.string(),
  name: z.string({
    required_error: 'Name is required.',
    invalid_type_error: 'Name must be a string.',
  }),
  institution: z.string({
    required_error: 'Institution is required.',
  }),
  email: z.string({
    required_error: 'Email is required.',
  }).email(),
  phone: z.string({
    required_error: 'Phone is required.',
  }).min(10),
  image_url: z.string(),
});

const CreateContact = FormSchemaCustomer.omit({'id': true, image_url: true});
export type StateContact = {
errors?: {
  name?: string[];
  institution?: string[];
  email?: string[];
  phone?: string[];
};
message?: string | null;
}

export async function createContact(prevState: StateContact, formData: FormData) {
  const validatedFields = CreateContact.safeParse({
      name: formData.get('name'),
      institution: formData.get('institution'),
      email: formData.get('email'),
      phone: formData.get('phone'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Contact.',
    };
  }
  // Prepare data for insertion into the database
  const { name, institution, email, phone } = validatedFields.data;

  try {
    await sql `
      INSERT INTO customers (name, insitution, email, phone)
      VALUES (${name}, ${institution}, ${email}, ${phone})
    `;
  } catch (error) {
    return {
      message: `Database Error: Failed to Create Contact. ${error}`,
    }
  }

  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}

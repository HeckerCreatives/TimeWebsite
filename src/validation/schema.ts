import {z} from 'zod';

export const registeruser = z.object({
    username: z.string().nonempty('Username is empty'),
    phonenumber: z.string().max(11).nonempty('Phone is empty'),
    password: z.string().max(20).nonempty('Password is empty'),
    confirm: z.string().max(20).nonempty('Confirm your password').optional(),
    // referral: z.string()
})
 .refine((data) => data.password === data.confirm , {
      message:"Passwords don't match",
      path: ['confirm'],
    })

export const payout = z.object({
  paymentmethod: z.string().nonempty('Please select a payment method'),
  accountname: z.string().nonempty('Please enter your account name') .regex(/^[A-Za-z]+$/, 'Account name should not have numbers & special characters'),
  accountnumber: z.string().nonempty('Please enter your account number'),
  payoutvalue: z.number().min(0,'Please enter an amount')

})


export const createAdmin = z.object({
  username: z.string().max(20).nonempty('Please enter a username'),
  password: z.string().max(20).nonempty('Please enter a password')
})

export const changepasswordadmin = z
  .object({
    newpassword: z.string().max(20).nonempty('Please enter a new password'),
    confirmpassword: z.string().max(20)
  })
  .refine((data) => data.newpassword === data.confirmpassword, {
    message: "Passwords don't match",
    path: ['confirmpassword'], // Error will appear under confirmpassword field
  });


export const payin = z.object({
  username: z.string().max(20).nonempty('Please enter an username'),
  amount: z.number().min(0,'Please enter an amount')
})


export const changepasswordsuperadmin = z.object({
  newpasswordsuperadmin: z.string().max(20).nonempty('Please enter a new password'),
  confirmpasswordsuperadmin: z.string().max(20).nonempty('Please confirm your password')
})
.refine((data) => data.newpasswordsuperadmin === data.confirmpasswordsuperadmin, {
    message: "Passwords don't match",
    path: ['confirmpasswordsuperadmin'], // Error will appear under confirmpassword field
  });

export type Register = z.infer<typeof registeruser>;
export type RequestPayout = z.infer<typeof payout>
export type CreateAdmin = z.infer<typeof createAdmin>
export type ChangePasswordAdmin = z.infer<typeof changepasswordadmin>
export type Payin = z.infer<typeof payin>
export type ChangePasswordSuperadmin = z.infer<typeof changepasswordsuperadmin>

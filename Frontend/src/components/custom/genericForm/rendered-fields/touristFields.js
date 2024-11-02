export const tourist = {
    fields: [
    {
      name: 'email',
      type: 'text',
      label: 'Email Address',
      required: true,
    },
    {
      name: 'mobileNumber',
      type: 'text',
      label: 'Mobile Number',
      required: true,
    },
    {
      name: 'nationality',
      type: 'text',
      label: 'Nationality',
      required: true,
    },
    {
      name: 'job',
      type: 'text',
      label: 'Job',
      required: true,
    }
  ],
  defaultValues: {
    email: '',
    mobileNumber: '',
    nationality: '',
    job: ''
  },
}
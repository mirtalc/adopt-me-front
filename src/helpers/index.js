export const bgChooser = status => ({
  'bg-featured': status == 'AVAIL',
  'bg-secondary': status == 'ADOP',
  'bg-lesser': status == 'RIP'
})

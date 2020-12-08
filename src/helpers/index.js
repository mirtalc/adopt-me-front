export const bgChooser = status => ({
  'bg-featured': status.uid == 'AVAIL',
  'bg-stable': status.uid == 'ADOP',
  'bg-secondary': status.uid == 'PROC' || status.uid == 'TRANS',
  'bg-lesser': status.uid == 'RIP'
})

import { FC } from 'react'
import { Toaster } from 'react-hot-toast'

export const HotToastConfig: FC = () => {
  return (
    <Toaster
      toastOptions={{
        position: 'bottom-center',
        style: {
          marginBottom: '2rem',
          wordBreak: 'break-all',
          maxWidth: '30rem',
          background: 'white',
          color: 'black',
          borderRadius: '12px',
        },
        success: {
          duration: 5000,
        },
      }}
    />
  )
}

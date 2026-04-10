import { Toaster } from 'sonner';

export default function () {
  return (
    <Toaster
      richColors
      position="top-center"
      toastOptions={{
        style: {
          background: 'bg-secondary text-secondary-content',
        },
        classNames: {
          toast: 'bg-base-100 border shadow-lg',
          title: 'font-semibold',
          description: 'text-sm opacity-80',
          success: 'bg-green-600 text-white',
          error: '!bg-error !text-error-content',
          warning: 'bg-yellow-500 text-black',
          info: 'bg-blue-600 text-white',
        },
      }}
    />
  );
}

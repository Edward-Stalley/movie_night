// lib/utils/toastActionResult.ts
import { messages } from '@/lib/config/messages';
import { toast } from 'sonner';

export function handleActionToast(
  result: { success: boolean; message?: string },
  successMessage?: string,
) {
  if (!result.success) {
    toast.error(result.message ?? messages.errors.generic.general);
    return false;
  }

  if (successMessage) {
    toast.success(successMessage);
  }

  return true;
}

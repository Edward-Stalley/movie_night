import { ActionResult } from '@/lib/types/actions';

export function actionSuccess<T>(data?: T, message?: string): ActionResult<T> {
  return { success: true, data, message };
}

export function actionError(message: string): ActionResult {
  return { success: false, message };
}

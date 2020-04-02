import { callMain } from './base';

export async function selectDir() {
  return callMain<string[]>('select-dirs');
}

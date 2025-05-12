// Custom implementation to replace nanoid/non-secure

// Simple implementation of a non-secure ID generator
export function nanoid(size: number = 21): string {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < size; i++) {
    id += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return id;
}

export default nanoid;

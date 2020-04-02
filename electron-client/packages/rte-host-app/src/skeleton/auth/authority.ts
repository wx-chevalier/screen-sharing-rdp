let currentAuthority: string[] | null = null;

const key = 'ufo-authority';

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str?: string): string[] {
  if (currentAuthority) {
    return currentAuthority;
  }

  const authorityString =
    typeof str === 'undefined' ? localStorage.getItem(key) : str;

  // authorityString could be admin, "admin", ["admin"]
  let authority;

  try {
    if (authorityString) {
      authority = JSON.parse(authorityString);
    }
  } catch (e) {
    authority = authorityString;
  }

  if (typeof authority === 'string') {
    authority = [authority];
  }

  if (!authority) {
    authority = ['anonymous'];
  }

  currentAuthority = authority;

  return authority;
}

export function setAuthority(authority: string | string[]): void {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;

  currentAuthority = proAuthority;

  return localStorage.setItem(key, JSON.stringify(proAuthority));
}

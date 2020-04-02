import { createContext } from 'react';

import { IAuthorityType } from '@/skeleton/auth/permissions';

export interface NavContextProps {
  authority?: IAuthorityType;
  onAuthorityChange?: (authority: IAuthorityType) => void;
  tabUtil?: {
    addTab: (id: string) => void;
    removeTab: (id: string) => void;
  };
  updateActive?: (activeItem: { [key: string]: string } | string) => void;
}

export const NavContext: React.Context<NavContextProps> = createContext({});

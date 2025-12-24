export type Role = 'ADMIN' | 'MEMBER';

export interface AuthUser {
  id: string;
  organizationId: string;
  role: Role;
}

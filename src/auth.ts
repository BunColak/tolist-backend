import { AuthChecker } from 'type-graphql'
import { Context } from './context'

export type RoleType = 'owner' | 'admin'

export const customAuthChecker: AuthChecker<Context, RoleType> = (
  { root, args, context, info },
  roles
) => {
  if (!context.user) {
    return false
  }

  if (roles.includes('admin')) {
    return true // TODO
  }

  if (roles.includes('owner')) {
    return root.user.id === context.user.id
  }

  return true
}

import { AuthenticatedUser} from '@/common/types/jwt.type';

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}


import { JwtPayload } from '@/common/types/jwt.type';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

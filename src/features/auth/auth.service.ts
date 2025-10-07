import { pool } from '../../config/database';
import argon2 from 'argon2';
import { Jwt } from 'jsonwebtoken';
import { User } from '../users/user.model';
import { z } from 'zod';

// export class AuthService{

//     static async register(email: string, password: string, full_name: string): Promise<User>{

//     }
// }

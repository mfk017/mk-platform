import { NextAuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { db } from './db';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await db.user.findUnique({
          where: { email: credentials.email },
          include: { center: true },
        });

        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password_hash);
        if (!isValid) return null;

        if (user.role === 'center_admin' && user.center?.status !== 'active') {
          throw new Error('Your account is currently pending approval or inactive.');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          centerId: user.center_id ?? undefined,
          centerSlug: user.center?.slug ?? undefined,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.centerId = (user as any).centerId;
        token.centerSlug = (user as any).centerSlug;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.centerId = token.centerId as string | undefined;
        session.user.centerSlug = token.centerSlug as string | undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || 'canter-dev-secret-key-change-in-production',
};

export const getAuth = () => getServerSession(authOptions);

// Type augmentation
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      centerId?: string;
      centerSlug?: string;
    };
  }
}

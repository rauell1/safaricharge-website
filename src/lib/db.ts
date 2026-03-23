import { PrismaClient } from '@prisma/client'
import path from 'path'

// Prisma's SQLite query engine resolves relative paths from the binary
// location rather than the process working directory. Convert relative
// SQLite URLs (e.g. "file:./db/custom.db") to absolute paths so the
// database file is always found regardless of the runtime CWD.
function resolveDatabaseUrl(): string | undefined {
  const url = process.env.DATABASE_URL
  if (url?.startsWith('file:./') || url?.startsWith('file:../')) {
    return 'file:' + path.resolve(process.cwd(), url.slice('file:'.length))
  }
  return url
}

// Database client with connection pooling
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: { db: { url: resolveDatabaseUrl() } },
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
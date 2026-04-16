const SESSION_KEY = 'tus_auth_session_v1'
const USERS_KEY = 'tus_local_users_v1'

export interface UserProfile {
  id: string
  email: string
  displayName: string
  createdAt: string
}

export interface AuthSession {
  user: UserProfile
  token: string
}

interface StoredUser {
  id: string
  email: string
  displayName: string
  passwordEnc: string
  createdAt: string
}

function loadUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    if (!raw) return []
    const arr = JSON.parse(raw) as StoredUser[]
    return Array.isArray(arr) ? arr : []
  } catch {
    return []
  }
}

function saveUsers(users: StoredUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function enc(pw: string): string {
  return btoa(unescape(encodeURIComponent(pw)))
}

function safeParseSession(json: string | null): AuthSession | null {
  if (!json) return null
  try {
    const v = JSON.parse(json) as AuthSession
    if (v?.user?.email && v?.token) return v
    return null
  } catch {
    return null
  }
}

export function getSession(): AuthSession | null {
  if (typeof localStorage === 'undefined') return null
  return safeParseSession(localStorage.getItem(SESSION_KEY))
}

export function setSession(session: AuthSession): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY)
}

export function registerLocal(email: string, password: string, displayName: string): AuthSession {
  const users = loadUsers()
  const em = email.trim().toLowerCase()
  if (users.some((u) => u.email === em)) {
    throw new Error('An account with this email already exists.')
  }
  const user: UserProfile = {
    id: crypto.randomUUID(),
    email: em,
    displayName: displayName.trim() || em.split('@')[0] || 'Reader',
    createdAt: new Date().toISOString(),
  }
  users.push({
    id: user.id,
    email: em,
    displayName: user.displayName,
    passwordEnc: enc(password),
    createdAt: user.createdAt,
  })
  saveUsers(users)
  const token = crypto.randomUUID()
  const session: AuthSession = { user, token }
  setSession(session)
  return session
}

export function loginLocal(email: string, password: string): AuthSession {
  const users = loadUsers()
  const em = email.trim().toLowerCase()
  const found = users.find((u) => u.email === em)
  if (!found || found.passwordEnc !== enc(password)) {
    throw new Error('Invalid email or password.')
  }
  const user: UserProfile = {
    id: found.id,
    email: found.email,
    displayName: found.displayName,
    createdAt: found.createdAt,
  }
  const token = crypto.randomUUID()
  const session: AuthSession = { user, token }
  setSession(session)
  return session
}

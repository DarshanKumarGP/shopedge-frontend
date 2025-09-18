// Path: src/services/authService.ts

export class AuthService {
  private baseUrl = 'http://localhost:9090/api/auth';

  /**
   * Call backend logout endpoint to invalidate the user session.
   */
  async logout(): Promise<void> {
    const response = await fetch(`${this.baseUrl}/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(err.message || 'Logout failed');
    }
  }
}

export const authService = new AuthService();

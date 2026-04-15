// Supabase Configuration
const SUPABASE_URL = 'https://ozsgwukldmqbfhxdpdzx.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_GRRhBtzNw0Ipo9blIp-Dvw_JGyHk9wA';

class SupabaseClient {
  constructor(url, key) {
    this.url = url;
    this.key = key;
    this.session = null;
    this.user = null;
  }

  /**
   * Initialize Supabase client
   */
  async init() {
    // Check if user is already logged in
    const token = localStorage.getItem('sb_access_token');
    if (token) {
      this.session = { access_token: token };
      await this.getUser();
    }
  }

  /**
   * Sign up new user with email and password
   */
  async signUp(email, password, username) {
    try {
      const response = await fetch(`${this.url}/auth/v1/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: this.key,
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        this.session = data.session;
        this.user = data.user;
        localStorage.setItem('sb_access_token', data.session.access_token);

        // Create profile
        await this.query('profiles', 'POST', {
          id: data.user.id,
          username,
          elo: 1000,
          matches_played: 0,
          wins: 0,
          losses: 0,
        });

        return { success: true, user: data.user };
      } else {
        return { success: false, error: data.error_description || 'Sign up failed' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Sign in with email and password
   */
  async signIn(email, password) {
    try {
      const response = await fetch(`${this.url}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: this.key,
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        this.session = data;
        this.user = data.user;
        localStorage.setItem('sb_access_token', data.access_token);
        return { success: true, user: data.user };
      } else {
        return { success: false, error: data.error_description || 'Sign in failed' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Get current user
   */
  async getUser() {
    try {
      const response = await fetch(`${this.url}/auth/v1/user`, {
        headers: {
          apikey: this.key,
          Authorization: `Bearer ${this.session.access_token}`,
        },
      });

      if (response.ok) {
        this.user = await response.json();
        return this.user;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  }

  /**
   * Sign out
   */
  async signOut() {
    localStorage.removeItem('sb_access_token');
    this.session = null;
    this.user = null;
  }

  /**
   * Generic query method for REST API
   */
  async query(table, method = 'GET', data = null, filter = null) {
    try {
      let url = `${this.url}/rest/v1/${table}`;

      const headers = {
        'Content-Type': 'application/json',
        apikey: this.key,
      };

      // Add auth header if logged in
      if (this.session) {
        headers.Authorization = `Bearer ${this.session.access_token}`;
      }

      // Add filters
      if (filter) {
        const filterParams = new URLSearchParams();
        for (const [key, value] of Object.entries(filter)) {
          filterParams.append(key, `eq.${value}`);
        }
        url += `?${filterParams.toString()}`;
      }

      const options = {
        method,
        headers,
      };

      if (data) {
        options.body = JSON.stringify(data);
      }

      const response = await fetch(url, options);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Query failed');
      }

      return result;
    } catch (error) {
      console.error(`Error querying ${table}:`, error);
      throw error;
    }
  }

  /**
   * Get all questions by difficulty
   */
  async getQuestionsByDifficulty(difficulty) {
    try {
      const response = await fetch(
        `${this.url}/rest/v1/questions?difficulty=eq.${difficulty}`,
        {
          headers: {
            apikey: this.key,
          },
        }
      );

      const questions = await response.json();
      
      // Remove 'correct' field from client (security)
      return questions.map(q => ({
        id: q.id,
        difficulty: q.difficulty,
        question_text: q.question_text,
        options: q.options,
        island: q.island,
        // 'correct' is intentionally omitted
      }));
    } catch (error) {
      console.error('Error fetching questions:', error);
      return [];
    }
  }

  /**
   * Get user profile
   */
  async getProfile(userId) {
    try {
      const profiles = await this.query('profiles', 'GET', null, { id: userId });
      return profiles[0] || null;
    } catch (error) {
      console.error('Error getting profile:', error);
      return null;
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(userId, updates) {
    try {
      const response = await fetch(`${this.url}/rest/v1/profiles?id=eq.${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          apikey: this.key,
          Authorization: `Bearer ${this.session.access_token}`,
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Update failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }

  /**
   * Create a new match
   */
  async createMatch(playerAId, playerBId) {
    try {
      const matchData = {
        player_a_id: playerAId,
        player_b_id: playerBId,
        player_a_badges: 0,
        player_b_badges: 0,
        current_turn: 'player_a',
        status: 'active',
      };

      const response = await fetch(`${this.url}/rest/v1/matches`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: this.key,
          Authorization: `Bearer ${this.session.access_token}`,
        },
        body: JSON.stringify(matchData),
      });

      if (!response.ok) {
        throw new Error('Failed to create match');
      }

      const match = await response.json();

      // Create match state
      await fetch(`${this.url}/rest/v1/match_state`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: this.key,
          Authorization: `Bearer ${this.session.access_token}`,
        },
        body: JSON.stringify({
          match_id: match[0].id,
          answers_submitted: { player_a: null, player_b: null },
        }),
      });

      return match[0];
    } catch (error) {
      console.error('Error creating match:', error);
      throw error;
    }
  }

  /**
   * Get match by ID
   */
  async getMatch(matchId) {
    try {
      const matches = await this.query('matches', 'GET', null, { id: matchId });
      return matches[0] || null;
    } catch (error) {
      console.error('Error getting match:', error);
      return null;
    }
  }

  /**
   * Update match
   */
  async updateMatch(matchId, updates) {
    try {
      const response = await fetch(`${this.url}/rest/v1/matches?id=eq.${matchId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          apikey: this.key,
          Authorization: `Bearer ${this.session.access_token}`,
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Update failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating match:', error);
      throw error;
    }
  }

  /**
   * Join matchmaking queue
   */
  async joinQueue() {
    try {
      const response = await fetch(`${this.url}/rest/v1/matchmaking_queue`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: this.key,
          Authorization: `Bearer ${this.session.access_token}`,
        },
        body: JSON.stringify({
          player_id: this.user.id,
          queue_type: 'ranked',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to join queue');
      }

      return await response.json();
    } catch (error) {
      console.error('Error joining queue:', error);
      throw error;
    }
  }

  /**
   * Leave matchmaking queue
   */
  async leaveQueue() {
    try {
      const response = await fetch(
        `${this.url}/rest/v1/matchmaking_queue?player_id=eq.${this.user.id}`,
        {
          method: 'DELETE',
          headers: {
            apikey: this.key,
            Authorization: `Bearer ${this.session.access_token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to leave queue');
      }
    } catch (error) {
      console.error('Error leaving queue:', error);
      throw error;
    }
  }

  /**
   * Get leaderboard
   */
  async getLeaderboard(limit = 50) {
    try {
      const response = await fetch(
        `${this.url}/rest/v1/profiles?order=elo.desc&limit=${limit}`,
        {
          headers: {
            apikey: this.key,
          },
        }
      );

      return await response.json();
    } catch (error) {
      console.error('Error getting leaderboard:', error);
      return [];
    }
  }
}

// Initialize global Supabase client
const supabase = new SupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
  supabase.init();
});

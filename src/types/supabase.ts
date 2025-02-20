export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      volunteer_hours: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          date: string;
          description: string;
          hours: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          date: string;
          description: string;
          hours: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          date?: string;
          description?: string;
          hours?: number;
        };
      };
    };
  };
}
